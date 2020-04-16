/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const Elm = ({ items, onClick }) => {
    function createItem(index, text) {
        return (
            <View style={styles.textContainer} key={index}>
                <Text style={styles.text} onPress={() => onClick('add', index, text)}>{text}</Text>
                <Icon size={12} iconStyle={styles.close} name="close" onPress={() => onClick('remove', index, text)} />
            </View>
        );
    }
    function createItems() {
        let viewItems = [];
        items.forEach((text, index) => {
            viewItems.push(createItem(index, text));
        });
        return viewItems;
    }

    return (
        <View style={styles.container}>
            {createItems()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    textContainer: {
        flexDirection: 'row',
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 15,
    },
    text: {
        marginRight: 10,
    },
    close: {
    },
});

export default Elm;
