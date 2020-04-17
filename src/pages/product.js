/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, SectionList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import ProductMediun from '../components/productList_m';
import ProductSmall from '../components/productList_s';

import s from '../styles';
import { ScrollView } from 'react-native-gesture-handler';

const Page = () => {
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
    const bestOfferClick = (key, index, item) => {
        console.log('best offer click', { key, index, item });
    };
    const addToChart = () => {

    };
    return (
        <SafeAreaView>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={updateSearch}
                value={search}
            />
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
        </SafeAreaView>
    );
};

export default Page;
