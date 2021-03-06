import React, {Component} from "react";
import {ScrollView, Text, FlatList, View, SafeAreaView} from "react-native";
import {Card, ListItem} from "react-native-elements";
import {Loading} from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

// For redux
import {connect} from 'react-redux';
import {baseUrl} from "../shared/baseUrl";

const mapStateToProps= state => {
    return { leaders: state.leaders}
};


function OurHistory() {
    return(
        <Card title="Our History">
            <Text>{`Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                
The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.`}</Text>
        </Card>
    )
}

class AboutUs extends Component{

    render() {
        const renderLeaders= ({item, index}) => {
          return(
              <ListItem key={index} title={item.name} subtitle={item.description} leftAvatar={{source: {uri:baseUrl+item.image} }}/>
          );
        };

        if (this.props.leaders.isLoading) {
            return (
                <ScrollView>
                    <OurHistory/>
                    <Card  title="Corporate Leadership">
                        <Loading/>
                    </Card>
                </ScrollView>
            )
        }

        if (this.props.leaders.errMess) {
            return (
                <ScrollView>
                    <OurHistory/>
                    <Card  title="Corporate Leadership">
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                </ScrollView>
            )
        }

        return(
            <ScrollView>
                <Animatable.View animation={'fadeInDown'} duration={2000} delay={1000}>
                    <OurHistory/>
                    <Card  title="Corporate Leadership">
                        <FlatList nestedScrollEnabled={false} data={this.props.leaders.leaders} renderItem={renderLeaders} keyExtractor={item => item.id.toString()}/>
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }

}
export default connect(mapStateToProps)(AboutUs);
