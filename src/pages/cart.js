/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, TextInput } from 'react-native';
import { connect } from 'react-redux';
import s from '../styles';
import { duit } from '../utils/number';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Overlay, Icon, Button } from 'react-native-elements';

// const { width, height } = Dimensions.get("screen");
const Page = ({ navigation, cartItems, total, cancelOrder, updateCartItem, removeItem }) => {
    const [note, setNote] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selected, setSelected] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [delivery, setDelivery] = useState(10000);
    useEffect(() => {
    });
    const clearCart = () => {
        Alert.alert(
            'Cancel Order',
            'Are you sure to cancel all order?',
            [
                { text: 'NO', onPress: () => { }, style: 'cancel' },
                { text: 'YES', onPress: () => cancelOrder() },
            ]
        );
    };
    const showEdit = (data) => {
        setSelected(data);
        setNote(data.customer_note);
        setQuantity(data.quantity);
        setShowModal(true);
    }
    const updateCart = () => {
        let updateItem = Object.assign({}, selected, { customer_note: note, quantity: quantity < 1 ? 1 : quantity });
        updateCartItem(updateItem);
        setShowModal(false);
    };
    const changeQuantity = (add) => {
        let change = quantity + add;
        if (change < 1) change = 1;
        setQuantity(change);
    };
    const checkQuantity = () => {
        let q = parseInt(quantity);
        if (isNaN(q) || q < 1) { setQuantity(1); }
    };
    const removeCart = () => {
        Alert.alert(
            'Remove Item',
            'Are you sure to remove this item?',
            [
                { text: 'NO', onPress: () => { }, style: 'cancel' },
                {
                    text: 'YES', onPress: () => {
                        removeItem(selected);
                        setShowModal(false);
                        setSelected({});
                    },
                },
            ]
        );
    };
    const postOrder = () => {
        // TODO : Save to server
        Alert.alert('Your order already submitted, please check your order status at history page');
        cancelOrder();
    };
    return (
        <SafeAreaView>
            <View style={[styles.header, s.row]}>
                <MaterialCommunityIcons name="close" size={25} onPress={() => clearCart()} />
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
                                <Text style={[styles.quantity, s.link]}
                                    onPress={() => showEdit(val)}
                                >
                                    {val.quantity ? val.quantity : 0}x
                                </Text>
                                <Text style={[s.bold, styles.productName]}>{val.name}</Text>
                            </View>
                            <View style={[s.right]}>
                                <Text style={[s.font14]}>{duit(val.net_amount)}</Text>
                                {val.discounts ? (
                                    <Text style={[s.right, s.through, s.font12]}>{duit(val.gross_amount)}</Text>
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
                        onPress={() => postOrder()}
                    />
                </View>
                <Text style={{ height: 50 }}> </Text>
            </ScrollView>
            <Overlay
                isVisible={showModal}
                overlayBackgroundColor="#FFF"
                onBackdropPress={() => setShowModal(false)}
                borderRadius={10}
                height={300}
                width="90%"
            >
                <View style={styles.modal}>
                    <Text style={[s.bold, s.font16]}>{selected.name}</Text>
                    <TextInput
                        placeholder="note for this item"
                        value={note}
                        onChangeText={(v) => setNote(v)}
                    />
                    <View style={[s.row, s.center, { paddingVertical: 20 }]}>
                        <Icon name="minus" type="material-community" reverse color='blue'
                            onPress={() => changeQuantity(-1)}
                        />
                        <TextInput
                            maxLength={2}
                            style={[s.font16, s.bold, s.center, { paddingHorizontal: 20, }]}
                            value={quantity.toString()}
                            onChangeText={v => setQuantity(v)}
                            keyboardType="decimal-pad"
                            onBlur={() => checkQuantity()}
                        />
                        <Icon name="plus" type="material-community" reverse color='blue'
                            onPress={() => changeQuantity(1)}
                        />
                    </View>
                    <View style={[s.row, { width: 200, justifyContent: 'space-around' }]}>
                        <Button
                            title="Remove"
                            onPress={() => removeCart()}
                        />
                        <Button
                            title="Update"
                            onPress={() => updateCart()}
                        />
                    </View>
                </View>
            </Overlay>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    modal: {
        paddingLeft: 20,
        paddingVertical: 30,
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        bottom: 0,
        height: 300,
        width: '100%',
        borderRadius: 10,
    },
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
        flexWrap: 'wrap',
        maxWidth: 275,
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
};
const mapStateToProps = (state) => {
    return {
        cartItems: state,
        total: calculateTotal(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product }),
        cancelOrder: () => dispatch({ type: 'CANCEL_ORDER', payload: [] }),
        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
        updateCartItem: (product) => dispatch({ type: 'UPDATE_ITEM', payload: product }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
