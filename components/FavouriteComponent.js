import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favourites: state.favourites
    }
};


class Favourites extends Component{
    render() {
        const {navigate}=this.props.navigation;

        const RenderMenuItem=({item, index}) => {
            return (
                <ListItem key={index} title={item.name} subtitle={item.description} onPress={()=> navigate('DishDetail', {dishId:item.id})} leftAvatar={{source: {uri: baseUrl+item.image}}} />
            )
        };

        if (this.props.dishes.isLoading) {
            return(
                <Loading/>
            )
        }

        if (this.props.dishes.errMess) {
            return (<View><Text>{this.props.dishes.errMess}</Text></View>)
        }

        return (
            <FlatList data={this.props.dishes.dishes.filter(dish=> this.props.favourites.some(el=> el===dish.id))} renderItem={RenderMenuItem} keyExtractor={item => item.id.toString()}/>
        )
    }
}

export default connect(mapStateToProps)(Favourites);
