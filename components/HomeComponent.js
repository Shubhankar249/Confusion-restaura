import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import {Card} from "react-native-elements";

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

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
    if (item) {
        return (
            <Card featuredTitle={item.name} featuredSubtitle={item.designation} image={{uri: baseUrl + item.image}}>
                <Text style={{margin:10}}>{item.description}</Text>
            </Card>
        );
    }else return(<View/>);
}

class Home extends Component {

    render() {
        return (
            <ScrollView>
                <RenderItem item={this.props.dishes.dishes.filter(dish => dish.featured)[0]} />
                <RenderItem item={this.props.promotions.promotions.filter(dish => dish.featured)[0]} />
                <RenderItem item={this.props.leaders.leaders.filter(dish => dish.featured)[0]} />
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps)(Home);
