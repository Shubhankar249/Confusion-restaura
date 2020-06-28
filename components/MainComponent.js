import React, {Component} from "react";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import AboutUs from "./AboutComponent";
import {View, Platform, Image, StyleSheet, ScrollView, Text} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';

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
                headerLeft: ()=> <Icon name='menu' size={24} color='white' onPress={()=> navigation.toggleDrawer()}/>,
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
                headerLeft: ()=> <Icon name='menu' size={24} color='white' onPress={()=> navigation.toggleDrawer()}/>,
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
                headerLeft: ()=> <Icon name='menu' size={24} color='white' onPress={()=> navigation.toggleDrawer()}/>,
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
                headerLeft: ()=> <Icon name='menu' size={24} color='white' onPress={()=> navigation.toggleDrawer()}/>,
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

        </Drawer.Navigator>
    )
}



class Main extends Component{

    componentDidMount() {
        this.props.fetchComments();
        this.props.fetchLeaders();
        this.props.fetchPromos();
        this.props.fetchDishes();
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
