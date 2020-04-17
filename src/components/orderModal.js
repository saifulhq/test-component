/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet, Alert, Button } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Overlay } from 'react-native-elements';

const Elm = ({ item, success }) => {
    const [show, setShow] = useState(false);
    return (
        <View style={styles.container}>
            <Overlay
                isVisible={show}
                windowBackgroundColor="#DDD"
                overlayBackgroundColor="#FFF"
                onBackdropPress={() => setShow(false)}
                borderRadius={10}
                height={300}
                width="90%"
                containerStyle={{ bottom: 1 }}
            >
                <View style={styles.modal}>
                    <Text>Hello from Overlay!</Text>
                    <TouchableHighlight onPress={() => { setShow(false); }}>
                        <Text style={styles.text}>Close Modal</Text>
                    </TouchableHighlight>
                    <Button
                        title="test"
                        onPress={() => setShow(false)}
                    />
                </View>
            </Overlay>
            <TouchableHighlight onPress={() => { setShow(true); }}>
                <Text style={styles.text}>Open Modal</Text>
            </TouchableHighlight>
        </View >
    );
}

const styles = StyleSheet.create({
    modal: {
        padding: 10,
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#FFF',
        bottom: 0,
        height: 300,
        width: '100%',
        borderRadius: 10,
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#ede3f2',
        padding: 10,
    },
    text: {
        color: '#3f2949',
        marginTop: 10,
    },
});

export default Elm;
