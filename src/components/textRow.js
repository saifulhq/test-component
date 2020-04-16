/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Elm = ({ texts, textStyle }) => {
    return (
        <View style={styles.container}>
            {
                texts.forEach((elm, idx) => (
                    <Text key={idx} style={textStyle ? textStyle[idx] : {}}>{elm}</Text>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});

export default Elm;
