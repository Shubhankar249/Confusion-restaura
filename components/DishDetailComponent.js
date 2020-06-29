import React, {Component} from "react";
import {View, Text, ScrollView, FlatList, Modal, StyleSheet, Button} from "react-native";
import {Card, Icon, Rating, Input} from "react-native-elements";

import {postFavourite, postComment} from "../redux/ActionCreators";

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
   postFavourite: (dishId) => dispatch(postFavourite(dishId)),
   postComment:  (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});


function RenderDish(props) {
    const dish=props.dish;
    if (dish) {
        return (
            <Card featuredTitle={dish.name} image={{uri: baseUrl+ dish.image}}>
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <View style={styles.icons}>
                    <Icon style={{flex:1}} name={props.favourite ? 'heart' : 'heart-o'} raised reverse type='font-awesome' color='#f50'
                        onPress={()=> props.favourite ? console.log('Already Favourite') : props.onPress()}
                    />
                    <Icon style={{flex:1}} name={'pencil'} raised reverse type='font-awesome' color='#512DA8'
                        onPress={()=> props.toggleModal()}
                    />
                </View>
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
                <Rating imageSize={12} readonly startingValue={item.rating} style={{marginLeft:-250}}/>
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
    constructor(props) {
        super(props);

        this.state={
            author:'',
            comment:'',
            isModalOpen:false,
            rating:''
        }
    }
    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    addComment(dishId) {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
    }

    markFavourite(dishId) {
        this.props.postFavourite(dishId);
    }

    render() {
        const dishId=this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} favourite={this.props.favourites.some(el=> el===dishId)} onPress={()=> this.markFavourite(dishId)} toggleModal={()=> this.toggleModal()}/>
                <RenderComments comments={this.props.comments.comments.filter(comment=> comment.dishId===dishId)}/>
                <Modal animationType={'slide'} transparent={false} visible={this.state.isModalOpen} onDismiss={()=> this.toggleModal()} onRequestClose={()=> this.toggleModal()}>
                    <View style={{justifyContent:'center',margin: 20}}>
                        <Rating showRating onFinishRating={(rating)=> this.setState({rating: rating})}/>
                        <Input
                            placeholder='Author' onChangeText={text => this.setState({author:text})}
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        />
                        <Input
                            placeholder='Comment' onChangeText={text => this.setState({comment:text})}
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        />

                        <Button title={'Submit'} color={'#512DA8'} onPress={()=> this.addComment(dishId)}/>
                        <Button title={'Cancel'} color={'grey'} onPress={()=> this.toggleModal()}/>
                    </View>
                </Modal>
            </ScrollView>
            );
    }

}
const styles= StyleSheet.create({
    icons:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
