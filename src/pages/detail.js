/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Page = ({ navigation, route }) => {
    let { itemId, otherParam } = route.params;
    if (route.params?.postId) {
        itemId = route.params.postId;
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>Item Id : {itemId}</Text>
            <Text>other params : {otherParam}</Text>
            <TextInput placeholder="itemId"
                value={itemId.toString()}
                onChangeText={v => itemId = v}
            />
            <TextInput placeholder="otherParam" value={otherParam} />
            <Button
                title="Go to Details... again"
                onPress={() => navigation.push('Detail', {
                    itemId: Math.floor(Math.random() * 100)
                })}
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
            <Button
                title="Go back to first screen in stack"
                onPress={() => navigation.popToTop()}
            />
            <Button
                title="Post Number"
                onPress={() => navigation.navigate('Post')}
            />
        </View>
    );
}

export default Page;