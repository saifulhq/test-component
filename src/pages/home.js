/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert, Text } from 'react-native';
import { getLocation } from '../utils/position'

const Home = ({ navigation }) => {
    const [position, setPosition] = useState(null);

    // console.log({ geolocation: navigator.geolocation });
    useEffect(() => {
        if (position == null) {
            // find location from gps
            getLocation(geoSuccess);
        }
    });

    const geoSuccess = (position) => {
        setPosition(position.coords);
    };
    return (
        <View style={styles.container}>
            <Text>Your Position : {position?.latitude}, {position?.longitude}</Text>
            <Button
                title="Start to Food library"
                onPress={() => navigation.navigate('Outlet')}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
});

export default Home;
