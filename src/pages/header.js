/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        },
    }
    componentDidMount() {
        console.log('call componentDidMount');
    }
    componentDidUpdate(){
        console.log('call componentDidUpdate');
    }
    render() {
        return (
            <View>
                <Text>Test Custom Header Navigation</Text>
                <Text>Count : {this.state.count}</Text>
            </View>
        );
    }
}
