import React, {Component} from "react";
import {FlatList, View, Text} from "react-native";
import {Tile} from "react-native-elements";
import {Loading} from "./LoadingComponent";
import * as Animatable from 'react-native-animatable';


import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
};

class Menu extends Component{
    render() {
        const renderMenuItem = ({item, index}) => {
            return (
                <Animatable.View animation="fadeInRightBig" duration={2000}>
                    <Tile
                        key={index}
                        title={item.name}
                        caption={item.description} featured
                        onPress={() => this.props.navigation.navigate('DishDetail', {dishId: item.id})}
                        imageSrc={{uri: baseUrl+item.image}}
                    />
                </Animatable.View>
            );
        };


        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        if (this.props.dishes.errMess) {
            return(
                <View>
                    <Text>{props.dishes.errMess}</Text>
                </View>
            );
        }

        return (
            <FlatList data={this.props.dishes.dishes} renderItem={renderMenuItem} keyExtractor={item => item.id.toString()}/>
        );
    }
}

export default connect(mapStateToProps)(Menu);
