/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Page = ({ navigation, route }) => {
    const [token] = useState(route.params?.token ? route.params?.token : 'null');
    return (
        <View style={styles.container}>
            <Text>Splash Screen</Text>
            <Text style={{ marginBottom: 50 }}>please wait ...</Text>
            <Text>Your Token : {token}</Text>
            <Text>Tunggu proses check selesai</Text>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Page;
