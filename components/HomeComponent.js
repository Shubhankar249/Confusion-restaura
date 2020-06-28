import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import {Card} from "react-native-elements";
import {Loading} from "./LoadingComponent";

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

    render() {
        return (
            <ScrollView>
                <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                            isLoading={this.props.dishes.isLoading}
                            erreMess={this.props.dishes.errMess}
                />
                <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                            isLoading={this.props.promotions.isLoading}
                            erreMess={this.props.promotions.errMess}
                />
                <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                            isLoading={this.props.leaders.isLoading}
                            erreMess={this.props.leaders.errMess}
                />
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps)(Home);
