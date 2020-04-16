/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AuthContext } from '../../App.js';

const Page = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const { signIn } = React.useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text>This is Login Page</Text>
            <Text>Username :</Text>
            <TextInput
                placeholder="Username"
                value={form.username}
                onChangeText={v => setForm({ ...form, username: v })}
            />
            <TextInput
                secureTextEntry
                placeholder="Password"
                value={form.password}
                onChangeText={v => setForm({ ...form, password: v })}
            />
            <Button
                title="Login"
                onPress={() => signIn(form)}
            />
        </View>
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
