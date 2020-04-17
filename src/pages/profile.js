/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { AuthContext } from '../../App';
import { connect } from 'react-redux';

const Page = ({ navigation, route, cartItems, store, addItemToCart }) => {
    const { signOut } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            {/* <Text>{store}</Text> */}
            <Button
                title="Log Out Now"
                onPress={() => signOut()}
            />
            <Button
                title="add item to cart"
                onPress={() => addItemToCart(
                    {
                        id: 1,
                        description: 'barang',
                        name: 'barang',
                        outlet_id: 1,
                        outlet_name: 'Toko AA',
                        markte_id: 1,
                        market_name: 'AA Group',
                        quantity: 1,
                        gross_amount: 10000,
                        net_amount: 8000,
                        discounts: 2000,
                    }
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
