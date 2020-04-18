/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, SafeAreaView, Button, StatusBar, StyleSheet, View } from 'react-native';
import Ads from '../components/ads';
import ProductMediun from '../components/productList_m';

import { bestOffer } from '../../sample_data.json';
import s from '../styles';
import { ScrollView } from 'react-native-gesture-handler';

const Page = ({ navigation }) => {
    const getNews = () => {
        // await call ajax
        let items = [
            {
                id: 1,
                name: 'Test 1',
                img: 'https://unsplash.it/300/?random',
            },
            {
                id: 2,
                name: 'Test 2',
                img: 'https://unsplash.it/350/?random',
            },
            {
                id: 3,
                name: 'Test 3',
                img: 'https://unsplash.it/400/?random',
            },
            {
                id: 4,
                name: 'Test 4',
                img: 'https://unsplash.it/450/?random',
            },
            {
                id: 4,
                name: 'Test 4',
                img: 'https://unsplash.it/500/?random',
            },
            {
                id: 5,
                name: 'Test 4',
                img: 'https://unsplash.it/550/?random',
            },
        ];
        return items;
    };
    const [_bestOffer] = useState(bestOffer);
    const bestOfferClick = (key, index, _item) => {
    };
    return (
        <SafeAreaView style={styles.container}>
            {/* <StatusBar barStyle="light-content" backgroundColor="#6a51ae">
                <Text>Iki opo sih</Text>
            </StatusBar> */}
            <Button
                title="Search"
                onPress={() => navigation.navigate('Search')}
            />
            <ScrollView>
                <Ads items={getNews()} />
                {_bestOffer.length ? (
                    <>
                        <View style={[{ paddingHorizontal: 5 }]}>
                            <Text style={[s.font16, s.bold]}>Best Offer</Text>
                            <ProductMediun items={_bestOffer} onClick={bestOfferClick} />
                        </View>
                        <View style={[{ paddingHorizontal: 5 }]}>
                            <Text style={[s.font16, s.bold]}>Your Favorite Transaction</Text>
                            <ProductMediun items={_bestOffer} onClick={bestOfferClick} />
                        </View>
                    </>
                ) : (
                        <></>
                    )}
                <Text style={{ height: 50 }}></Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        color: '#000',
        padding: 10,
    },
});

export default Page;
