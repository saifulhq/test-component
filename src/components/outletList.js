/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import s from '../styles';

const imageWidht = 50;
const Elm = ({ items, onClick }) => {
    function renderOutlet(item, index) {
        let enable = item.close ? false : true;
        let blur = enable ? s.none : s.blur;
        return (
            <View key={'outlet_list_' + index} style={[blur]}>
                <TouchableOpacity style={styles.outletContainer} disabled={!enable}
                    onPress={() => onClick('outlet', index, item)}
                >
                    <Image
                        style={styles.smallLogo}
                        source={{ uri: item.img }}
                        PlaceholderContent={<Text style={styles.closed}>{item.close ? 'closed' : ''} </Text>}
                    />
                    <View style={styles.outletText}>
                        <Text style={[styles.bold, styles.font16]}>{item.name}</Text>
                        <Text style={[styles.gray, styles.small]}>{item.category}</Text>
                        <View style={[s.row]}>
                            <Text style={[styles.font12]}> {item.star} </Text>
                            <Text style={[styles.font12]}> {item.distance}km </Text>
                            <Text style={[styles.font12]}> {item.delivery_amount}</Text>
                        </View>
                        <View style={[s.row]}>
                            <Text style={[styles.font12]}>Open : {item.open} </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    item.products.map((l, i) => (
                        <TouchableOpacity key={'product_outlet_' + i} style={[styles.productContainer, styles.borderTop]} disabled={item.close}
                            onPress={() => onClick('product', index, l)}
                        >
                            <Image
                                style={styles.tinyLogo}
                                source={{ uri: l.img }}
                            />
                            <View style={[styles.outletText]}>
                                <Text>{l.name}</Text>
                                <View style={[s.row]}>
                                    <Text style={[styles.bold, l.discounts ? styles.netAmount : styles.none]}>{l.net_amount}</Text>
                                    <Text style={styles.grossAmount}>{l.discounts > 0 ? l.gross_amount : ''}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({ item, index }) => renderOutlet(item, index)}
                keyExtractor={item => 'outlet_list_p_' + item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginBottom: 50,
    },
    none: {

    },
    tinyLogo: {
        width: imageWidht,
        height: imageWidht,
        borderRadius: 5,
    },
    smallLogo: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    outletContainer: {
        flexDirection: 'row',
    },
    productContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
        marginLeft: 80,
    },
    outletText: {
        paddingLeft: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
    small: {
        fontSize: 12,
    },
    gray: {
        color: 'gray',
    },
    font16: {
        fontSize: 16,
    },
    font14: {
        fontSize: 14,
    },
    font12: {
        fontSize: 12,
    },
    borderTop: {
        borderTopColor: '#ddd',
        borderTopWidth: 1,
    },
    netAmount: {
        color: 'orange',
    },
    grossAmount: {
        textDecorationLine: 'line-through',
        marginLeft: 8,
        color: 'gray',
    },
    closed: {
        // color: 'orange',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Elm;
