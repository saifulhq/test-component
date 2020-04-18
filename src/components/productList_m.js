/* eslint-disable prettier/prettier */
import React from 'react';
import { FlatList, View, StyleSheet, Text, useWindowDimensions } from 'react-native';
import s from '../styles';
import { Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { duit } from '../utils/number';

const Elm = ({ items, onClick }) => {
    const width = useWindowDimensions().width;
    const createItem = (item, index) => {
        return (
            <TouchableOpacity key={'product_list_m_' + index} style={[s.row, s.column, styles.box]}
                onPress={() => onClick('product', index, item)}
            >
                <Image style={styles.img} source={{ uri: '../images/noimage.png' }}
                    PlaceholderContent={imageText(item.offer)}
                />
                <Text style={[s.bold, s.center]}>{item.name}</Text>
                <View style={[s.row]}>
                    <Text style={[s.bold, styles.netAmount]}>Rp. {duit(item.net_amount)}</Text>
                    <Text style={styles.grossAmount}>{duit(item.price)}</Text>
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
    };
    const imageText = (text) => {
        if (text) { return (<Text>{text}</Text>); }
        else { return (<></>); }
    };
    return (
        <FlatList
            horizontal
            // contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
            data={items}
            renderItem={({ item, index }) => createItem(item, index)}
            keyExtractor={item => 'bestoffer_' + item.id}
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
