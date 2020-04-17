/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Dimensions, ScrollView, ListView } from 'react-native';
import { connect } from 'react-redux';
import s from '../styles';
import { duit } from '../utils/number';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const { width, height } = Dimensions.get("screen");
const Page = ({ navigation, cartItems, total }) => {
    // const [total, setTotal] = useState(accumulate);
    const [num, setNum] = useState(0);
    const [delivery, setDelivery] = useState(10000);
    useEffect(() => {
    });
    return (
        <SafeAreaView>
            <View style={[styles.header, s.row]}>
                <MaterialCommunityIcons name="close" size={25} />
            </View>
            <ScrollView style={{ backgroundColor: 'white' }}>
                <Text style={[styles.sectionHeader]}>Deliver To</Text>
                <View style={[s.panel]}>
                    <Text>YOUR LOCATION</Text>
                    <View style={[s.leftRight]}>
                        <Text>Order Time (Now)</Text>
                        <Text style={[s.link]}>change order time</Text>
                    </View>
                </View>
                <Text style={[styles.sectionHeader]}>Summary Order</Text>
                <View>
                    {cartItems.map((val, key) => (
                        <View key={'order_item_' + key} style={[s.leftRight, s.panel, { alignItems: 'flex-start' }]}>
                            <View style={[s.row]}>
                                <Text style={[styles.quantity, s.link]}>{val.quantity ? val.quantity : 0}x</Text>
                                <Text style={[s.bold, styles.productName]}>{val.name}</Text>
                            </View>
                            <View style={[s.right]}>
                                <Text style={[s.font14]}>{duit(val.net_amount)}</Text>
                                {val.discounts ? (
                                    <Text style={[s.right, s.through, s.font12]}>{duit(val.discounts)}</Text>
                                ) : (
                                        <></>
                                    )}
                            </View>
                        </View>
                    ))}
                    <View style={[styles.subTotal]}>
                        <View style={[s.leftRight]}>
                            <Text>Sub Total</Text>
                            <Text style={[]}>{duit(total.net_amount)}</Text>
                        </View>
                        <View style={[s.leftRight]}>
                            <Text>Delivery Fee</Text>
                            <Text style={[]}>{duit(delivery)}</Text>
                        </View>
                    </View>
                </View>
                <Text style={[styles.sectionHeader]}>Payment Method</Text>
                <View>
                    <Text>Change payment method</Text>
                </View>
                <View style={[styles.footer]}>
                    <View style={[s.row, styles.grandTotal, s.leftRight]}>
                        <Text style={[s.font16, s.bold]}>Total</Text>
                        <View style={[s.right]}>
                            <Text style={[s.font16, s.bold]}>Rp {duit(total.net_amount + delivery)}</Text>
                            {/* <Text>38.500</Text> */}
                        </View>
                    </View>
                    <Button
                        title="Order Now"
                        onPress={() => { }}
                    />
                </View>
                <Text style={{ height: 50 }}> </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {

    },
    sectionHeader: {
        backgroundColor: '#E1E0FF',
        padding: 10,
    },
    footer: {
        backgroundColor: '#EEE',
        borderRadius: 10,
        borderColor: '#DDD',
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
    },
    grandTotal: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    quantity: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 3,
        padding: 5,
    },
    productName: {
        marginLeft: 10,
    },
    subTotal: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: '#DDD',
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 5,

    },
});

const accumulate = { gross_amount: 0, net_amount: 0, discounts: 0, taxs: 0, vouchers: 0, promos: 0 };
const calculateTotal = (items) => {
    let total = items.reduce((acc, d) => {
        return {
            gross_amount: acc.gross_amount + d.gross_amount,
            net_amount: acc.net_amount + d.net_amount,
            vouchers: acc.vouchers + d.vouchers,
            discounts: acc.discounts + d.discounts,
            taxs: acc.taxs + d.taxs,
            promos: acc.promos + d.promos,
        };
    }, accumulate);
    return total;
}
const mapStateToProps = (state) => {
    return {
        cartItems: state,
        total: calculateTotal(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product }),
        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
