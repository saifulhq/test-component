/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, SectionList, Button, Modal, StyleSheet, Dimensions } from 'react-native';
import { SearchBar, Overlay, Icon } from 'react-native-elements';
import ProductMediun from '../components/productList_m';
import ProductSmall from '../components/productList_s';

import s from '../styles';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import CartIcon from '../components/cartIcon';


const Page = ({ navigation, cartItems, addItemToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [selected, setSelected] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [search, updateSearch] = useState('');
    const [item, setItem] = useState({
        id: 1,
        name: 'Ayam Gondanglegi Nanda',
        market_id: 1,
        market_name: 'AA Group',
        img: '../images/nanda 1.png',
        category: 'Chicken Delight',
        star: 5,
        delivery_amount: 20000,
        distance: 11,
        close: false,
        open: '08.00 - 22.00',
        products: [
            {
                id: 1,
                category: 'Chicken Delight',
                active: true,
                items: [
                    {
                        id: 1,
                        name: 'Ayam Goreng Ungkep',
                        description: 'Ayam + lalapan + nasi + sambal',
                        net_amount: 46000,
                        gross_amount: 50000,
                        discounts: 4000,
                        img: '../images/nanda 2.png',
                        active: true,
                    },
                    {
                        id: 2,
                        name: 'Ayam Kampung bumbu',
                        description: 'Ayam + lalapan + nasi + sambal',
                        net_amount: 50000,
                        gross_amount: 50000,
                        discounts: 0,
                        img: '../images/nanda 3.png',
                        active: true,
                    },
                ],
            },
            {
                id: 2,
                category: 'Noodles',
                active: true,
                items: [
                    {
                        id: 3,
                        name: 'Mie Ayam Jakarta',
                        description: 'Mie + ayam + pangsit',
                        net_amount: 46000,
                        gross_amount: 50000,
                        discounts: 4000,
                        img: '../images/nanda 2.png',
                        active: false,
                    },
                    {
                        id: 4,
                        name: 'Mie Pangsit Original',
                        description: 'Mie + ayam + pangsit',
                        net_amount: 50000,
                        gross_amount: 50000,
                        discounts: 0,
                        img: '../images/nanda 3.png',
                        active: true,
                    },
                ],
            },
            {
                id: 3,
                category: 'Drinks',
                active: true,
                items: [
                    {
                        id: 5,
                        name: 'Susu Jahe',
                        description: 'Susu dan Jahe',
                        net_amount: 46000,
                        gross_amount: 50000,
                        discounts: 4000,
                        img: '../images/nanda 2.png',
                        active: true,
                    },
                    {
                        id: 6,
                        name: 'STMJ Premium',
                        description: 'Susu + Telkor + Madu + Jahe kualitas super, ukuran 1 gelas / 600ml',
                        net_amount: 50000,
                        gross_amount: 50000,
                        discounts: 0,
                        img: '../images/nanda 3.png',
                        active: true,
                    },
                ],
            },
            {
                id: 3,
                category: 'Camilan',
                active: false,
                items: [
                    {
                        id: 5,
                        name: 'Susu Jahe',
                        description: 'Susu dan Jahe',
                        net_amount: 46000,
                        gross_amount: 50000,
                        discounts: 4000,
                        img: '../images/nanda 2.png',
                        active: true,
                    },
                    {
                        id: 6,
                        name: 'STMJ Premium',
                        description: 'Susu + Telkor + Madu + Jahe kualitas super, ukuran 1 gelas / 600ml',
                        net_amount: 50000,
                        gross_amount: 50000,
                        discounts: 0,
                        img: '../images/nanda 3.png',
                        active: true,
                    },
                ],
            },
        ],
        bestOffer: [
            {
                id: 1,
                name: 'Ayam Goreng Ungkep',
                net_amount: 46000,
                gross_amount: 50000,
                discounts: 4000,
                img: '../images/nanda 2.png',
                active: true,
            },
            {
                id: 2,
                name: 'Ayam Kampung bumbu manis sekali seperti yang jual dan yang beli',
                net_amount: 50000,
                gross_amount: 50000,
                discounts: 0,
                img: '../images/nanda 3.png',
                active: true,
            },
            {
                id: 3,
                name: 'Ayam Goreng Ungkep',
                net_amount: 46000,
                gross_amount: 50000,
                discounts: 4000,
                img: '../images/nanda 2.png',
                active: true,
            },
            {
                id: 4,
                name: 'Ayam Kampung bumbu manis',
                net_amount: 50000,
                gross_amount: 50000,
                discounts: 0,
                img: '../images/nanda 3.png',
                active: true,
            },
        ],
    });
    const bestOfferClick = (key, index, _item) => {
        setSelected(_item);
        setShowModal(true);
    };
    const changeQuantity = (add) => {
        let change = quantity + add;
        if (change < 1) change = 1;
        setQuantity(change);
    };
    const checkQuantity = () => {
        let q = parseInt(quantity);
        if (isNaN(q) || q < 1) setQuantity(1);
    };
    const addItem = () => {
        addItemToCart(Object.assign({}, selected, { quantity }));
        setQuantity(1);
        setShowModal(false);
    };
    return (
        <SafeAreaView>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={updateSearch}
                value={search}
                showLoading={true}
            />
            <CartIcon navigation={navigation} cartItems={cartItems} />
            <ScrollView>
                <View>
                    <Text>Header Outlet Info</Text>
                </View>
                <View style={[]}>
                    <Text style={[s.font16, s.bold]}>Best Offer</Text>
                    <ProductMediun items={item.bestOffer} onClick={bestOfferClick} />
                </View>
                <View style={[]}>
                    <Text style={[s.font16, s.bold]}>Products</Text>
                    {/* <SectionList
                        sections={item.products}
                        keyExtractor={(_item, index) => _item + index}
                        renderItem={({ _item }) => <Text>asdas</Text>}
                        renderSectionHeader={({ section: { category } }) => (
                            <Text>{category}</Text>
                        )}
                    /> */}
                    <ProductSmall items={item.products} onClick={bestOfferClick} />
                    <Text style={{ margin: 20 }}></Text>
                </View>
                <Text style={{ margin: 20 }}></Text>
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
                    <TextInput placeholder="note" />
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
                    <Button
                        title="Add to Shopping Cart"
                        onPress={() => addItem()}
                    />
                </View>
            </Overlay>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    modal: {
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
});

const mapStateToProps = (state) => {
    return {
        cartItems: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product }),
        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
