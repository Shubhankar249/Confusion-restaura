import React, { Component } from 'react';
import { View, Text, Animated, Easing} from 'react-native';
import {Card} from "react-native-elements";
import {Loading} from "./LoadingComponent";

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';


//Remove Animations

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
};


function RenderItem(props) {
    const item=props.item;
    if (props.isLoading) {
        return(
            <Loading />
        );
    }

    if (props.errMess) {
        return(
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }

    if (item) {
        return (
            <Card featuredTitle={item.name} featuredSubtitle={item.designation} image={{uri: baseUrl + item.image}}>
                <Text style={{margin:10}}>{item.description}</Text>
            </Card>
        );
    }else return(<View/>);
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0); //Remove
    }

    componentDidMount () {  //R
        this.animate()
    }

    animate () {    //R
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 8,
                duration: 8000,
                easing: Easing.linear
            }
        ).start(() => this.animate())
    }

    render() {
        const xpos1 = this.animatedValue.interpolate({  //R
            inputRange: [0, 1, 3, 5, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });
        const xpos2 = this.animatedValue.interpolate({
            inputRange: [0, 2, 4, 6, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });
        const xpos3 = this.animatedValue.interpolate({
            inputRange: [0, 3, 5, 7, 8],
            outputRange: [1200, 600, 0, -600, -1200 ]
        });

        return (    // Change View to ScrollView, remove style and remove all Animated.View
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <Animated.View style={{ width: '100%', transform: [{translateX: xpos1}]}}>
                    <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                                isLoading={this.props.dishes.isLoading}
                                erreMess={this.props.dishes.errMess}
                    />
                </Animated.View>
                <Animated.View style={{ width: '100%',  transform: [{translateX: xpos2}]}}>
                    <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                                isLoading={this.props.promotions.isLoading}
                                erreMess={this.props.promotions.errMess}
                    />
                </Animated.View>
                <Animated.View style={{ width: '100%',  transform: [{translateX: xpos3}]}}>
                    <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                                isLoading={this.props.leaders.isLoading}
                                erreMess={this.props.leaders.errMess}
                    />
                </Animated.View>
            </View>
        );
    }
}
export default connect(mapStateToProps)(Home);
