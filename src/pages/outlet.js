/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, SafeAreaView, Button, StatusBar, StyleSheet } from 'react-native';
import Ads from '../components/ads';

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
    return (
        <SafeAreaView style={styles.container}>
            <Button
                title="Search"
                onPress={() => navigation.navigate('Search')}
            />
            <StatusBar barStyle="light-content" backgroundColor="#6a51ae">
                <Text>Iki opo sih</Text>
            </StatusBar>
            <Ads items={getNews()} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        color: '#000',
    },
});

export default Page;
