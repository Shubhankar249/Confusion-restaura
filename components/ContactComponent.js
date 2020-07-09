import React, { Component } from 'react';
import {Card, Button, Icon} from "react-native-elements";   // Button from react-native-elements is more enhanced than from react-native
import {Text} from "react-native";
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';


function Contact(props) {

    const sendMail = ()=> {
        MailComposer.composeAsync({
            recipients:['hota@hoga.com'],
            subject: 'Kya hai',
            body: '25 din mai paisa double'
        })
    };

    return(
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card title="Contact Information">
                <Text>121, Clear Water Bay Road</Text>
                <Text>Clear Water Bay, Kowloon</Text>
                <Text>HONG KONG</Text>
                <Text>Tel: +852 1234 5678</Text>
                <Text>Fax: +852 8765 4321</Text>
                <Text>Email:confusion@food.net</Text>

                <Button onPress={sendMail} title={'Send Email'} buttonStyle={{backgroundColor:'#512DA8', marginTop:20}}
                        icon={<Icon name={'envelope-o'} type={'font-awesome'} color={'white'}/>}/>
            </Card>
        </Animatable.View>
    );
}
export default Contact;
