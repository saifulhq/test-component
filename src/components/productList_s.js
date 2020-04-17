/* eslint-disable prettier/prettier */
import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet, SectionList } from 'react-native';
import { Image } from 'react-native-elements';
import s from '../styles';
import { create, act } from 'react-test-renderer';

const Elm = ({ items, onClick }) => {
    const createItem = (product, index, active) => {
        let viewItems = [];
        product.forEach(elm => {
            let enable = active ? elm.active ? true : false : false;
            let blurClass = enable ? s.none : styles.blur;
            viewItems.push(
                <TouchableOpacity key={'product_list_m_' + index + elm.id} style={[s.row, styles.box, blurClass]} disabled={!enable}>
                    <View style={[s.row, blurClass]}>
                        <Image style={styles.img} source={{ uri: '../images/noimage.png' }}
                            PlaceholderContent={imageText(enable, 'out stock')}
                        />
                        <View>
                            <Text style={[s.bold, styles.textItemContainer]}>{elm.name}</Text>
                            <Text style={[s.font12, styles.textItemContainer]}>{elm.description}</Text>
                        </View>
                    </View>
                    <View style={[styles.priceContainer, blurClass]}>
                        <Text style={[s.bold, styles.netAmount]}>{elm.net_amount}</Text>
                        <Text style={styles.grossAmount}>{elm.discounts > 0 ? elm.gross_amount : ''}</Text>
                    </View>
                </TouchableOpacity>
            );
        });
        return viewItems;
    };
    const createCategory = () => {
        let viewList = [];
        items.forEach((item, index) => {
            viewList.push(
                <View key={'category_' + index + item.id}>
                    <Text style={[s.bold, s.font12]}>{item.category}</Text>
                    {createItem(item.items, index, item.active)}
                </View>
            );
        })
        return viewList;
    };
    const imageText = (active, text) => {
        return (
            <Text>{active ? '' : text}</Text>
        );
    };
    return (
        // <SectionList
        //     sections={items}
        //     keyExtractor={(item, index) => index + item.id}
        //     renderItem={({item}) => <Text>asd</Text>}
        //     renderSectionHeader={({section:{category}}) => (
        //         <Text>qwe</Text>
        //     )}
        // />
        <View>
            {/* <FlatList
                data={items}
                renderItem={({ item, index }) => createCategory(item, index)}
                keyExtractor={item => item.id}
            /> */}
            {createCategory()}
        </View>
    );
};

const styles = StyleSheet.create({
    blur: {
        opacity: 0.5,
    },
    box: {
        alignContent: 'stretch',
        justifyContent: 'space-between',
    },
    img: {
        width: 80,
        height: 60,
    },
    grossAmount: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    netAmount: {
        color: 'orange',
    },
    priceContainer: {
        maxWidth: 80,
        marginRight: 5,
    },
    textItemContainer: {
        flexDirection: 'row',
        marginLeft: 8,
        flexWrap: 'wrap',
        maxWidth: 200,
    },
});

export default Elm;
