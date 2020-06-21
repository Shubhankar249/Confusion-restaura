import React, {Component} from "react";
import {View, Text} from "react-native";
import {Card} from "react-native-elements";
import {DISHES} from "../shared/dishes";

function RenderDish(props) {
    const dish=props.dish;
    if (dish) {
        return (
            <Card featuredTitle={dish.name} image={require('../assets/images/vadonut.png')}>
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
            </Card>
        );
    }
    else {
        return(<View/>)
    }
}

class DishDetail extends Component{
    constructor(props) {
        super(props);
        this.state={
            dishes: DISHES
        }
    }

    render() {
        const dishId=this.props.route.params.dishId;

        return(<RenderDish dish={this.state.dishes[+dishId]}/>);
    }


}
export default DishDetail;
