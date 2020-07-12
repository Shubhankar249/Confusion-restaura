import React, {Component} from "react";

import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import AboutUs from "./AboutComponent";
import Reservation from "./ReservationComponent";
import Favourites from "./FavouriteComponent";
import Login from "./LoginComponent";

import {View, Platform, Image, StyleSheet, ScrollView, Text, ToastAndroid} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import NetInfo from "@react-native-community/netinfo";

import {connect} from 'react-redux';
import {fetchLeaders, fetchDishes, fetchComments, fetchPromos}  from "../redux/ActionCreators";

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => ({
   fetchDishes: ()=> dispatch(fetchDishes()),
   fetchComments: ()=> dispatch(fetchComments()),
   fetchPromos: ()=> dispatch(fetchPromos()),
   fetchLeaders: ()=> dispatch(fetchLeaders()),
});


const Stack = createStackNavigator();
const Drawer= createDrawerNavigator();

function MenuNavigator() {
    return (
        <Stack.Navigator initialRouteName={'Menu'} screenOptions={{
            headerTintColor:'#fff',
            headerStyle: {backgroundColor: '#512DA8'},
            headerTitleStyle: {color: "#fff"}
        }}>
            <Stack.Screen name="Menu" component={Menu}  options={({ navigation}) => ({
                headerLeft: ()=> <Icon iconStyle={{marginLeft: 10}} name='menu' size={24} color='white' onPress={()=> navigation.toggleDrawer()}/>,
            })}/>
            <Stack.Screen name="DishDetail" component={DishDetail} />
        </Stack.Navigator>
    );
}

function HomeNavigator() {
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor:'#fff',
            headerStyle: {backgroundColor: '#512DA8'},
            headerTitleStyle: {color: "#fff"}
        }}>
            <Stack.Screen name={'Home'} component={Home} options={({ navigation}) => ({
                headerLeft: ()=> <Icon iconStyle={{marginLeft: 10}} name='menu' size={24} color='white' onPress={()=> navigation.toggleDrawer()}/>,
            })}/>
        </Stack.Navigator>
    )
}

function AboutNavigator() {
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor:'#fff',
            headerStyle: {backgroundColor: '#512DA8'},
            headerTitleStyle: {color: "#fff"}
        }}>
            <Stack.Screen name={'About Us'} component={AboutUs} options={({ navigation}) => ({
                headerLeft: ()=> <Icon iconStyle={{marginLeft: 10}} name='menu' size={24} color='white' onPress={()=> navigation.toggleDrawer()}/>,
            })}/>
        </Stack.Navigator>
    )
}

function ContactNavigator() {
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor:'#fff',
            headerStyle: {backgroundColor: '#512DA8'},
            headerTitleStyle: {color: "#fff"}
        }}>
            <Stack.Screen name={'Contact Us'} component={Contact} options={({ navigation}) => ({
                headerLeft: ()=> <Icon iconStyle={{marginLeft: 10}} name='menu' size={24} color='white' onPress={()=> navigation.toggleDrawer()}/>,
            })}/>
        </Stack.Navigator>
    )
}

function ReservationNavigator() {
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor:'#fff',
            headerStyle: {backgroundColor: '#512DA8'},
            headerTitleStyle: {color: "#fff"}
        }}>
            <Stack.Screen name={'Reserve a Table'} component={Reservation} options={({ navigation}) => ({
                headerLeft: ()=> <Icon iconStyle={{marginLeft: 10}} name='menu' size={24} color='white' onPress={()=> navigation.toggleDrawer()}/>,
            })}/>
        </Stack.Navigator>
    )
}

function FavouriteNavigator() {
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor:'#fff',
            headerStyle: {backgroundColor: '#512DA8'},
            headerTitleStyle: {color: "#fff"}
        }}>
            <Stack.Screen name={'Favourites'} component={Favourites} options={({ navigation}) => ({
                headerLeft: ()=> <Icon iconStyle={{marginLeft: 10}} name='menu' size={24} color='white' onPress={()=> navigation.toggleDrawer()}/>,
            })}/>
        </Stack.Navigator>
    )
}

function LoginNavigator() {
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor:'#fff',
            headerStyle: {backgroundColor: '#512DA8'},
            headerTitleStyle: {color: "#fff"}
        }}>
            <Stack.Screen name={'Login'} component={Login} options={({ navigation}) => ({
                headerLeft: ()=> <Icon iconStyle={{marginLeft: 10}} name='menu' size={24} color='white' onPress={()=> navigation.toggleDrawer()}/>,
            })}/>
        </Stack.Navigator>
    )
}


const CustomDrawerContentComponent= (props) => (
    <ScrollView>
        <View style={styles.drawerHeader}>
            <View style={{flex: 1}}>
                <Image source={require('../assets/images/logo.png')} style={styles.drawerImage}/>
            </View>
            <View style={{flex:2}}>
                <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
            </View>
        </View>
        <DrawerItemList {...props}/>
    </ScrollView>
);

function MainNavigator() {
    return(
        <Drawer.Navigator initialRouteName="Home" drawerStyle={{backgroundColor:'#D1C4E9'}}
                          drawerContent={props => <CustomDrawerContentComponent {...props}/>}>

            <Drawer.Screen name="Login" component={LoginNavigator} options={{
                drawerIcon: ({color})=> <Icon name={'sign-in'} size={24} type='font-awesome' color={color}/>
            }}/>
            <Drawer.Screen name="Home" component={HomeNavigator} options={{
                drawerIcon: ({color})=> <Icon name={'home'} size={24} type='font-awesome' color={color}/>
            }}/>
            <Drawer.Screen name="About Us" component={AboutNavigator} options={{
                drawerIcon: ({color})=> <Icon name={'info-circle'} size={24} type='font-awesome' color={color}/>
            }}/>
            <Drawer.Screen name="Menu" component={MenuNavigator} options={{
                drawerIcon: ({color})=> <Icon name={'list'} size={24} type='font-awesome' color={color}/>
            }}/>
            <Drawer.Screen name="Contact Us" component={ContactNavigator} options={{
                drawerIcon: ({color})=> <Icon name={'address-card'} size={22} type='font-awesome' color={color}/>
            }}/>
            <Drawer.Screen name="Reserve a Table" component={ReservationNavigator} options={{
                drawerIcon: ({color})=> <Icon name={'cutlery'} size={24} type='font-awesome' color={color}/>
            }}/>
            <Drawer.Screen name="Favourites" component={FavouriteNavigator} options={{
                drawerIcon: ({color})=> <Icon name={'heart'} size={24} type='font-awesome' color={color}/>
            }}/>

        </Drawer.Navigator>
    )
}


class Main extends Component{
    constructor(props) {
        super(props);
        this.state={subscribe:''}
    }

    componentDidMount() {
        this.props.fetchComments();
        this.props.fetchLeaders();
        this.props.fetchPromos();
        this.props.fetchDishes();

        this.state.subscribe=NetInfo.addEventListener(connectionChange=> this.handleConnectionChange(connectionChange));
    }

    componentWillUnmount() {
        this.state.subscribe();
    }

    handleConnectionChange(connectionInfo) {
        switch (connectionInfo.type) {
            case 'none':
                ToastAndroid.show('You are now offline', ToastAndroid.LONG);
                break;

            case 'wifi':
                ToastAndroid.show('You are now on Wifi', ToastAndroid.LONG);
                break;

            case 'cellular':
                ToastAndroid.show ('You are now on Cellular', ToastAndroid.LONG);
                break;

            case 'unknown' :
                ToastAndroid.show ('You are now have an Unknown connection', ToastAndroid.LONG);
                break;
        }
    }

    render() {
        return (
            <NavigationContainer>
                <View style={{flex:1}}>
                    <MainNavigator/>
                </View>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    container: {flex:1},
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent:'center',
        flex:1,
        flexDirection:'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 70,
        height: 55
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
