/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Page = ({ navigation }) => {
    const [num, setNum] = useState(0);
    return (
        <View>
            <Text>Create Post Number</Text>
            <TextInput
                keyboardType='number-pad'
                value={num.toString()}
                onChangeText={v => setNum(parseInt(v))}
            />
            <Button
                title="Done"
                onPress={() => {
                    navigation.navigate('Detail', { postId: num });
                }}
            />
        </View>
    );
}

export default Page;