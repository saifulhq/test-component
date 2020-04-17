/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import s from '../styles';

const { width } = Dimensions.get('window');

const Elm = ({ navigation, cartItems }) => {
    return (
        <View style={[s.row, styles.container]}>
            <Icon name="arrow-left" type="material-community" reverse color='#000' size={15}
                onPress={() => navigation.goBack()}
            />
            <View>
                <Badge status="primary" value={cartItems.length} containerStyle={{ position: 'absolute', top: -2, right: -2 }} />
                <Icon name="cart" type="material-community" raised color='gray' size={20}
                    onPress={() => navigation.navigate('Cart')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        position: 'absolute',
        top: 60,
        left: 0,
        width,
        zIndex: 100,
    },
});

export default Elm;
