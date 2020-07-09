import React, {Component, useRef} from "react";
import {View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder, Share} from "react-native";
import {Card, Icon, Rating, Input} from "react-native-elements";
import * as Animatable from 'react-native-animatable';

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

    const handleViewRef= useRef(null);

    const recognizeDrag = ({moveX, moveY, dx, dy})=>{
        // Right to left drag
        return dx<-200;
    };

    const recognizeComment=({dx})=> {
        return dx>200;
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder:(e, gestureState) => {
            return true;
        },
        onPanResponderGrant: ()=> {
            handleViewRef.current.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add to favourites?',
                    'Are you sure you want to add' + dish.name + 'to favourites ?',
                    [
                        {
                            text:'Cancel',
                            onPress: ()=> console.log('Cancel Pressed'),
                            style: "cancel"
                        },
                        {
                            text: 'OK',
                            onPress: ()=> props.favourite ? console.log('Already Favourite') : props.onPress()
                        }
                    ],
                    {cancelable:false}
                )
            }
            else if (recognizeComment(gestureState))   props.toggleModal();

            return true;
        }
    });

    const shareDish= (title, msg, url)=> {
        Share.share({
            title: title,
            message: msg + 'Kaala Kauaa' + url,
            url: url
        }, {
            dialogTitle: 'Faila Do' + title
        })
    };

    if (dish) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} {...panResponder.panHandlers} ref={handleViewRef}>
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
                        <Icon style={{flex:1}} name={'share'} raised reverse type='font-awesome' color='#51D2A8'
                            onPress={() => shareDish(dish.name, dish.description, baseUrl+ dish.image)}
                        />
                    </View>
                </Card>
            </Animatable.View>
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
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList data={comments} renderItem={RenderCommentItem} keyExtractor={item => item.id.toString()}/>
            </Card>
        </Animatable.View>
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
