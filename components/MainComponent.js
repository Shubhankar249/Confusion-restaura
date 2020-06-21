import React, {Component} from "react";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import {View, Platform} from "react-native";
import Home from "./HomeComponent";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer= createDrawerNavigator();

function MenuNavigator() {
    return (
        <Stack.Navigator initialRouteName={'Menu'} screenOptions={{
            headerTintColor:'#fff',
            headerStyle: {backgroundColor: '#512DA8'},
            headerTitleStyle: {color: "#fff"}
        }}>
            <Stack.Screen name="Menu" component={Menu}/>
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
            <Stack.Screen name={'Home'} component={Home}/>
        </Stack.Navigator>
    )
}

function MainNavigator() {
    return(
        <Drawer.Navigator initialRouteName="Home" drawerStyle={{backgroundColor:'#D1C4E9'}}>
            <Drawer.Screen name="Home" component={HomeNavigator}/>
            <Drawer.Screen name="Menu" component={MenuNavigator}/>
        </Drawer.Navigator>
    )
}

class Main extends Component{
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

export default Main;
