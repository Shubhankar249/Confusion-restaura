import * as SecureStore from 'expo-secure-store';
import React, {Component} from "react";
import {View, StyleSheet, Text, Image, ScrollView, PanResponder} from "react-native";
import {Input, CheckBox, Icon, Button} from "react-native-elements";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {baseUrl} from "../shared/baseUrl";
import * as ImageManipulator from 'expo-image-manipulator';
import * as Animatable from 'react-native-animatable';



class LoginTab extends Component{
    constructor(props) {
        super(props);

        const panResponder= PanResponder.create({
            onStartShouldSetPanResponder:(e, gestureState)=>{return true;},
            onPanResponderGrant:()=> {console.log('Started')},
            onPanResponderEnd: (e, gestureState)=>{
                if (gestureState.dx<-60) {
                    props.navigation.navigate('Register');
                }
            }
        }) ;

        this.state={
            username:'',
            password:'',
            remember:false,
            panResponder:panResponder
        }
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userInfo',
                JSON.stringify({username:this.state.username, password:this.state.password}))
                .catch(err=>console.log('Could not save user info', err));
        }
        else {
            SecureStore.deleteItemAsync('userInfo')
                .catch(err=> console.log('HAla', err));
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userInfo')
            .then((userData)=> {
                let userInfo= JSON.parse(userData);
                if (userInfo) {
                    this.setState({username:userInfo.username, password:userInfo.password, remember:true});
                }
            })
    }

    render() {
        return (
            <Animatable.View animation={'slideInRight'} delay={100} duration={1500} style={styles.container} {...this.state.panResponder.panHandlers}>
                <Input placeholder={'Username'} leftIcon={{type:'font-awesome', name:'user-o'}}
                       onChangeText={(username)=> this.setState({username})} value={this.state.username}
                />
                <Input placeholder={'Password'} leftIcon={{type:'font-awesome', name:'key'}}
                       onChangeText={(password)=> this.setState({password})} value={this.state.password}
                />

                <CheckBox checked={this.state.remember} title={'Remember Me'} center
                          onPress={()=> this.setState({remember: !this.state.remember})} containerStyle={styles.formCheckbox} />

                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
                    />
                </View>

                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title="Register"
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                size={24}
                                color= 'blue'
                            />
                        }
                        titleStyle={{
                            color: "blue"
                        }}
                        buttonStyle={{
                        backgroundColor: null
                    }}
                    /></View>
            </Animatable.View>
        )
    }
}

class RegisterTab extends Component{
    constructor(props) {
        super(props);

        const panResponder= PanResponder.create({
            onStartShouldSetPanResponder:(e, gestureState)=>{return true;},
            onPanResponderGrant:()=> {console.log('Started')},
            onPanResponderEnd: (e, gestureState)=>{
                if (gestureState.dx>60) {
                    props.navigation.navigate('Login');
                }
            }
        }) ;

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png',
            panResponder:panResponder
        }
    }
    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
    }

    processImage= async (imageUri)=> {
        let processedImg = await ImageManipulator.manipulateAsync(
            imageUri,
            [{resize:{width: 400}}],
            {format:ImageManipulator.SaveFormat.PNG});
        console.log(processedImg);
        this.setState({imageUrl:processedImg.uri});
    };

    getImageFromCamera= async () => {
        const cameraPermission= await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission= await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {

            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage( capturedImage.uri);
            }
        }
    };

    render() {
        return(
            <ScrollView >
                <Animatable.View animation={'slideInLeft'} style={styles.container} {...this.state.panResponder.panHandlers}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri:this.state.imageUrl}} loadingIndicatorSource={require('../assets/images/logo.png')} style={styles.image}/>
                        <Button title={'Camera'} onPress={this.getImageFromCamera} />
                    </View>

                    <Input
                        placeholder="Username"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Password"
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="First Name"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(firstname) => this.setState({firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Last Name"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(lastname) => this.setState({lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Email"
                        leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                    />
                    <CheckBox title="Remember Me"
                              center
                              checked={this.state.remember}
                              onPress={() => this.setState({remember: !this.state.remember})}
                              containerStyle={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => this.handleRegister()}
                            title="Register"
                            icon={
                                <Icon
                                    name='user-plus'
                                    type='font-awesome'
                                    size={24}
                                    color= 'white'
                                />
                            }
                            buttonStyle={{
                                backgroundColor: "#512DA8"
                            }}
                        />
                    </View>
                </Animatable.View>
            </ScrollView>
        )
    }
}


const styles= StyleSheet.create({
    container: {
        justifyContent:'center',
        margin:20
    },
    formInput: {
        margin: 10
    },
    formCheckbox: {
        margin:20,
        backgroundColor:null
    },
    formButton:{
        margin:45
    },
    imageContainer:{
        flex:1,
        flexDirection:'row',
        margin:15
    },
    image:{
        margin:10,
        width:80,
        height:60
    }
});


const Tab= createBottomTabNavigator();
const  Login= ()=> {
    return(
        <Tab.Navigator tabBarOptions={{
            activeTintColor:'white',
            labelStyle:{fontWeight:'bold', fontSize:16 },
            labelPosition:'beside-icon',
            activeBackgroundColor: '#9575CD',
            inactiveBackgroundColor: '#D1C4E9',
            inactiveTintColor:'gray'
        }}>
            <Tab.Screen name={'Login'} component={LoginTab} options={{
                tabBarIcon: ({ color }) => (
                    <Icon
                        name='sign-in'
                        type='font-awesome'
                        size={24}
                        iconStyle={{ color: color }}
                    />
                )
            }}/>
            <Tab.Screen name={'Register'} component={RegisterTab} options={{
                tabBarIcon: ({ color }) => (
                    <Icon
                        name='user-plus'
                        type='font-awesome'
                        size={24}
                        iconStyle={{ color: color }}
                    />
                )
            }}/>
        </Tab.Navigator>
    )
};
export default Login;
