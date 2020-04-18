/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Tag from '../components/tagText';
import OutletList from '../components/outletList';
import { outlets as listOutlet } from '../../sample_data.json';
import product from './product';

const { height } = Dimensions.get('window');
const Page = ({ navigation }) => {

    const [keyword, setKeyword] = useState('');
    const [row, setRow] = useState([]);
    const [init, setInit] = useState(true);
    const [hint, setHint] = useState(['Ayam geprek', 'Sego sambel', 'Tahu Campur']);

    useEffect(() => {
    }, []);

    function doSearch(text) {
        // TODO : ini adalah dummy data
        let listMode = listOutlet.map(outlet => {
            let listOutlet = { ...outlet };
            listOutlet.products = [];
            outlet.products.map(category => {
                return category.items.map(product => {
                    listOutlet.products.push(product);
                });
            });
            return listOutlet;
        });
        // TODO : search to database using keyword;
        setRow(text || keyword ? listMode : []);
        setInit(false);
        return;
    }

    const updateHint = (key, index, text) => {
        doSearch(text);
        setKeyword(text);
    };
    const doDetail = (key, index, item) => {
        navigation.navigate('Product', { key, index, item });
    };

    return (
        <SafeAreaView>
            <View style={styles.searchBarContainer}>
                <MaterialCommunityIcons name="arrow-left" style={styles.searchIcon} onPress={() => navigation.goBack()} />
                <View style={styles.searchSection}>
                    <TextInput
                        placeholder="Restoran, Outlet, Makanang, Minuman ..."
                        style={styles.searchText}
                        onBlur={doSearch}
                        value={keyword}
                        onChangeText={v => setKeyword(v)}
                    />
                    <MaterialCommunityIcons name="cloud-search-outline" style={styles.searchIcon} onPress={doSearch} />
                </View>
            </View>
            <View style={styles.body}>
                {init ? (
                    <View>
                        <Tag
                            items={hint}
                            onClick={updateHint} />
                    </View>
                ) : row.length ? (
                    <OutletList items={row} onClick={doDetail} />
                ) : (
                            <View style={styles.noData}>
                                <Text>Search : {keyword}</Text>
                                <Text>Tidak ada data ditemukan</Text>
                            </View>
                        )}
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    searchBarContainer: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        fontSize: 14,
        // position: 'absolute',
        // zIndex: 0,
    },
    searchSection: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
    },
    searchText: {
        fontSize: 14,
    },
    searchIcon: {
        fontSize: 18,
        paddingHorizontal: 10,
        color: 'gray',
    },
    body: {
        // padding: 5,
        // marginTop: 10,
        // flexDirection: 'column',
        paddingBottom: 60,
    },
    noData: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height - 40,
    },
});

export default Page;
