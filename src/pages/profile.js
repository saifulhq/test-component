/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { AuthContext } from '../../App';

const Page = () => {
    const { signOut } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Button
                title="Log Out Now"
                onPress={() => signOut()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Page;
