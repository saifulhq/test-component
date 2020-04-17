/* eslint-disable prettier/prettier */
import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import s from '../styles';
import { Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Elm = ({ items, onClick }) => {

    const createItem = (item, index) => {
        return (
            <TouchableOpacity key={'product_list_m_' + index} style={[s.row, s.column, styles.box]}>
                <Image style={styles.img} source={{ uri: '../images/noimage.png' }}
                    PlaceholderContent={imageText('discount 10%')}
                />
                <Text style={[s.bold, s.center]}>{item.name}</Text>
                <View style={[s.row]}>
                    <Text style={[s.bold, styles.netAmount]}>Rp. 35.000</Text>
                    <Text style={styles.grossAmount}>50.000</Text>
                </View>
            </TouchableOpacity>
        );
    };
    const generate = () => {
        let viewList = [];
        items.forEach((elm, idx) => {
            viewList.push(createItem(elm, idx));
        });
        return viewList;
    }
    const imageText = (text) => {
        return (
            <Text>text</Text>
        );
    };
    return (
        <FlatList numColumns={2}
            data={items}
            renderItem={({ item, index }) => createItem(item, index)}
            keyExtractor={item => item.id}
        />
        // <View>
        //     {generate()}
        // </View>
    );
};

const styles = StyleSheet.create({
    box: {
        borderRadius: 8,
        borderColor: 'gray',
        // borderWidth: 1,
        width: 170,
        margin: 5,
    },
    img: {
        width: 160,
        height: 180,
    },
    grossAmount: {
        textDecorationLine: 'line-through',
        marginLeft: 8,
        color: 'gray',
    },
    netAmount: {
        color: 'orange',
    },
});

export default Elm;
