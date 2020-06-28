import React, {Component} from "react";
import {Text, View, StyleSheet, ScrollView, Switch, Button, Picker, Modal} from "react-native";
import DatePicker from "react-native-datepicker";


class Reservation extends Component {
    constructor(props) {
        super(props);

        this.state= {
            guest: 1,
            smoking: false,
            date:'',
            isModalOpen: false
        };

    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    resetForm() {
        this.setState({
            guest:1,
            smoking: false,
            date:''
        })
    }

    handleReservation () {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    render() {
        return (
            <ScrollView>
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
                    <Button title={'Reserve'} color={'#512DA8'} onPress={()=> this.handleReservation()} accessibilityLabel={'Ghangor PAAP'}/>
                </View>

                <Modal animationType={'slide'} transparent={false} visible={this.state.isModalOpen} onDismiss={()=> {this.toggleModal();this.resetForm()}} onRequestClose={()=> {this.toggleModal();this.resetForm()}} >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number Of Guests: {this.state.guest}</Text>
                        <Text style={styles.modalText}>{this.state.smoking? 'Smoking area': 'Non-Smoking'}</Text>
                        <Text style={styles.modalText}>When: {this.state.date}</Text>
                        <Button title={'Close'} onPress={()=> {this.toggleModal();this.resetForm()}} color={'#512DA8'}/>
                    </View>
                </Modal>
            </ScrollView>
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
   },

   modal: {
       justifyContent: 'center',
       margin: 20
   },

   modalTitle: {
       fontSize: 24,
       fontWeight: 'bold',
       backgroundColor: '#512DA8',
       textAlign: 'center',
       color: 'white',
       marginBottom: 20
   },

    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;
