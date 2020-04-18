/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';

const Page = ({ navigation, route }) => {
    let { itemId, otherParam } = route.params;
    if (route.params?.postId) {
        itemId = route.params.postId;
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Transaction History</Text>
        </View>
    );
};

export default Page;