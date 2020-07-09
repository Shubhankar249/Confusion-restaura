import * as SecureStore from 'expo-secure-store';
import React, {Component} from "react";
import {View, StyleSheet, Button, Alert} from "react-native";
import {Card, Icon, Input, CheckBox} from "react-native-elements";


class Login extends Component{
    constructor(props) {
        super(props);

        this.state={
            username:'',
            password:'',
            remember:false
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
            <View style={styles.container}>
                <Input placeholder={'Username'} leftIcon={{type:'font-awesome', name:'user-o'}}
                       onChangeText={(username)=> this.setState({username})} value={this.state.username}
                />
                <Input placeholder={'Password'} leftIcon={{type:'font-awesome', name:'key'}}
                       onChangeText={(password)=> this.setState({password})} value={this.state.password}
                />

                <CheckBox checked={this.state.remember} title={'Remember Me'} center
                          onPress={()=> this.setState({remember: !this.state.remember})} containerStyle={styles.formCheckbox} />

                <View style={styles.formButton}>
                    <Button title={'Login'} onPress={()=> this.handleLogin()} color={'#512DA8'}/>
                </View>
            </View>
        )
    }

}

const styles= StyleSheet.create({
    container: {
        justifyContent:'center',
        margin:20
    },
    formInput: {
        margin: 40
    },
    formCheckbox: {
        margin:40,
        backgroundColor:null
    },
    formButton:{
        margin:60
    }
});

export default Login;
