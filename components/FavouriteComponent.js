import React, { Component } from 'react';
import { FlatList, View, Text, Alert} from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from "react-native-swipeout";
import {deleteFavourite} from "../redux/ActionCreators";


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favourites: state.favourites
    }
};

const mapDispatchToProps = dispatch => ({
  deleteFavourite: (dishId) => dispatch(deleteFavourite(dishId))
});

class Favourites extends Component{
    render() {
        const {navigate}=this.props.navigation;


        const RenderMenuItem=({item, index}) => {
            const rightButton= [{
                text:'Delete',
                type:'delete',
                onPress: ()=> {
                    Alert.alert(
                        'Delete Favourite?',
                        'Are you sure you want to delete favourite dish '+item.name+'?',
                        [
                            {text: 'Cancel', onPress: ()=> console.log(item.name + "NOT deleted"), style: "cancel"},
                            {text: 'OK', onPress: () => this.props.deleteFavourite(item.id)}
                        ],
                        {cancelable: false}
                    );
                }
            }];


            return (
                <Swipeout right={rightButton} autoClose={true} >
                    <ListItem key={index} title={item.name} subtitle={item.description} onPress={()=> navigate('DishDetail', {dishId:item.id})} leftAvatar={{source: {uri: baseUrl+item.image}}} />
                </Swipeout>
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

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
