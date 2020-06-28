import React, {Component} from "react";
import {View, Text, ScrollView, FlatList} from "react-native";
import {Card, Icon} from "react-native-elements";

import {postFavourite} from "../redux/ActionCreators";

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favourites: state.favourites
    }
};

const mapDispatchToProps= (dispatch) =>({
   postFavourite: (dishId) => dispatch(postFavourite(dishId))
});

function RenderDish(props) {
    const dish=props.dish;
    if (dish) {
        return (
            <Card featuredTitle={dish.name} image={{uri: baseUrl+ dish.image}}>
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <Icon name={props.favourite ? 'heart' : 'heart-o'} raised reverse type='font-awesome' color='#f50'
                    onPress={()=> props.favourite ? console.log('Already Favourite') : props.onPress()}
                />
            </Card>
        );
    }
    else {
        return(<View/>)
    }
}

function RenderComments(props) {
    const comments=props.comments;

    const RenderCommentItem= ({item, index}) => {
        return(
            <View key={index} style={{margin:10}} >
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };


    return (
        <Card title="Comments">
            <FlatList data={comments} renderItem={RenderCommentItem} keyExtractor={item => item.id.toString()}/>
        </Card>
    )
}


class DishDetail extends Component{


    markFavourite(dishId) {
        this.props.postFavourite(dishId);
    }

    render() {
        const dishId=this.props.route.params.dishId;

        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} favourite={this.props.favourites.some(el=> el===dishId)} onPress={()=> this.markFavourite(dishId)}/>
                <RenderComments comments={this.props.comments.comments.filter(comment=> comment.dishId===dishId)}/>
            </ScrollView>
            );
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
