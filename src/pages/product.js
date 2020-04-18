/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button, StyleSheet, Alert } from 'react-native';
import { SearchBar, Overlay, Icon, Image } from 'react-native-elements';
import ProductMediun from '../components/productList_m';
import ProductSmall from '../components/productList_s';

import s from '../styles';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import CartIcon from '../components/cartIcon';

import { outlets as listOutlet, bestOffer } from '../../sample_data.json';

const Page = ({ navigation, route, cartItems, addItemToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [selected, setSelected] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [search, updateSearch] = useState('');
    const [note, setNote] = useState('');
    const [item] = useState({
        outlet: listOutlet[0],
        bestOffer,
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
        if (isNaN(q) || q < 1) { setQuantity(1); }
    };
    const addItem = () => {
        let itemOrder = Object.assign({}, selected, {
            quantity,
            customer_note: note,
            product_id: selected.id,
            product_name: selected.name,
        });
        addItemToCart(itemOrder);
        setQuantity(1);
        setNote('');
        setShowModal(false);
    };
    return (
        <SafeAreaView>
            {/* <SearchBar
                placeholder="Type Here..."
                onChangeText={updateSearch}
                value={search}
                showLoading={true}
            /> */}
            <CartIcon navigation={navigation} cartItems={cartItems} />
            <ScrollView>
                <View style={styles.outletInfo}>
                    <Image
                        style={styles.outletImg}
                        source={{ uri: '../images/nanda 1.png' }}
                        PlaceholderContent={<Text>Image</Text>}
                    />
                    <View style={[s.row, s.leftRight]}>
                        <View>
                            <Text style={[s.font16, s.bold, { fontSize: 18 }]}>{item.outlet.name}</Text>
                            <Text style={[s.font12, s.gray]}>{item.outlet.category}</Text>
                        </View>
                        <Icon name="info-outline" 
                            onPress={() => Alert.alert('Outlet Info')}
                        />
                    </View>
                    <View style={[{ paddingHorizontal: 10 }]}>
                        <Text style={[s.font12]}>bintanga, jarak: 12km, delivery: 22.000</Text>
                        <Text style={[s.font12]}>Open : 08.00 - 22.00</Text>
                    </View>
                </View>
                {item.bestOffer.length ? (
                    <View style={[{ paddingHorizontal: 5 }]}>
                        <Text style={[s.font16, s.bold]}>Best Offer</Text>
                        <ProductMediun items={item.bestOffer} onClick={bestOfferClick} />
                    </View>
                ) : (
                        <></>
                    )}
                <View style={[{ paddingHorizontal: 5 }]}>
                    <Text style={[s.font16, s.bold]}>Products</Text>
                    {/* <SectionList
                        sections={item.products}
                        keyExtractor={(_item, index) => _item + index}
                        renderItem={({ _item }) => <Text>asdas</Text>}
                        renderSectionHeader={({ section: { category } }) => (
                            <Text>{category}</Text>
                        )}
                    /> */}
                    <ProductSmall items={item.outlet.products} onClick={bestOfferClick} />
                </View>
                <Text style={{ margin: 10 }}></Text>
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
    outletInfo: {
        flex: 1,
        minHeight: 200,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
    },
    outletImg: {
        height: 120,
    },
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
