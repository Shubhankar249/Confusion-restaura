import React, {Component} from "react";
import {Text, View, StyleSheet, Switch, Button, Picker, Modal, Alert, Platform} from "react-native";
import DatePicker from "react-native-datepicker";
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import {Notifications} from "expo";
import {max, min} from "react-native-reanimated";
import * as Calendar from 'expo-calendar';
import {getDefaultCalendarAsync} from "expo-calendar";


class Reservation extends Component {
    constructor(props) {
        super(props);

        this.state= {
            guest: 1,
            smoking: false,
            date:''
        };

    }

    resetForm() {
        this.setState({
            guest:1,
            smoking: false,
            date:''
        })
    }

    async obtainNotificationPermission() {
        let permission= await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);

            if (permission.status !== 'granted') Alert.alert('Permission not granted for notifications!');
        }
        return permission;
    }


    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();

        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: `Reservation for ${date} requested`,
            ios: {
                sound:true,
            },
            android: {
                channelId:'hello',
                color:'#512DA8'
            }
        });
        if (Platform.OS==='android') {
            Notifications.createChannelAndroidAsync('hello', {
                name: 'hello',
                sound: true,
                vibrate: [0, 250, 250, 250],
                priority:max
            });
        }
    }

    async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);

            if (permission.status !== 'granted') Alert.alert('Permission not granted for Calendar usage');
        }
        return permission;
    }

    async createCalendar() {
        const defaultCalendarSource =
            Platform.OS === 'ios'
                ? await this.getDefaultCalendar()
                : { isLocalAccount: true, name: 'Expo Calendar' };
        const newCalendarID = await Calendar.createCalendarAsync({
            title: 'Expo Calendar',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });
        console.log(`Your new calendar ID is: ${newCalendarID}`);
        return newCalendarID;
    }

    async getDefaultCalendar() {
        const cal=await Calendar.getCalendarsAsync();
        const defaultCal=cal.filter(each => each.source.name === 'Default');
        return defaultCal[0].source;
    }

    async addReservationToCalendar(date) {
        await this.obtainCalendarPermission();
        const calId=await this.createCalendar();

        let eDate=new Date(Date.parse(date));
        eDate.setHours(eDate.getHours()+2);

        console.log(eDate);
        await Calendar.createEventAsync(calId, {
            title:'Con Fusion Reservation',
            startDate: new Date(Date.parse(date)),
            endDate: eDate,
            allDay: false,
            timeZone:'Asia/Kolkata',
            location: 'Awesome Street in a cool block'
        })
    }

    render() {
        return (
            <Animatable.View animation="zoomIn" duration={1500} delay={500}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number Of Guests</Text>
                    <Picker style={styles.formItem} selectedValue={this.state.guest} onValueChange={(itemValue, itemIndex) => this.setState({guest: itemValue})}>
                        <Picker.Item label={'1'} value={'1'}/>
                        <Picker.Item label={'2'} value={'2'}/>
                        <Picker.Item label={'3'} value={'3'}/>
                        <Picker.Item label={'4'} value={'4'}/>
                        <Picker.Item label={'5'} value={'5'}/>
                        <Picker.Item label={'6'} value={'6'}/>
                    </Picker>
                </View >

                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch style={styles.formItem} value={this.state.smoking} trackColor={'#512DA8'} onValueChange={value => this.setState({smoking:value})} />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DatePicker style={{flex:2, marginRight:20}} date={this.state.date} format={''} mode={"datetime"} placeholder={'select date and time'}
                                minDate={'2020-07-10'} confirmBtnText={'Confirm'} cancelBtnText={'Cancel'}
                                customStyles={{dateIcon: {position: 'absolute', left:0, top:4, marginLeft: 0},
                                               dateInput: {marginLeft: 36}}}
                                onDateChange={date=> this.setState({date: date})}
                    />
                </View>

                <View style={styles.formRow}>
                    <Button title={'Reserve'} color={'#512DA8'} onPress={()=> Alert.alert(
                        'Confirm Reservation',
                        `Number Of Guests: ${this.state.guest}\n${this.state.smoking? 'Smoking area': 'Non-Smoking'}\nWhen: ${this.state.date}`,
                        [
                            {
                                text:'Cancel',
                                onPress: ()=> this.resetForm(),
                                style: "cancel"
                            },
                            {
                                text:'OK',
                                onPress: ()=>{
                                    this.presentLocalNotification(this.state.date);
                                    this.addReservationToCalendar(this.state.date);
                                    this.resetForm()}
                            }
                        ],
                        {cancelable:false}
                    )}
                            accessibilityLabel={'Ghangor PAAP'}/>
                </View>
            </Animatable.View>
        )
    }
}

const styles= StyleSheet.create({
   formRow: {
       alignItems: 'center',
       justifyContent: 'center',
       flex: 1,
       flexDirection: 'row',
       margin: 20
   },

   formLabel: {
       fontSize: 18,
       flex: 2
   },

   formItem: {
     flex:1
   }
});

export default Reservation;
