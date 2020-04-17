/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Tag from '../components/tagText';
import OutletList from '../components/outletList';

const { height } = Dimensions.get('window');
const Page = ({ navigation }) => {

    const [keyword, setKeyword] = useState('');
    const [row, setRow] = useState([]);
    const [init, setInit] = useState(true);
    const [hint, setHint] = useState(['Ayam geprek', 'Sego sambel', 'Tahu Campur']);


    useEffect(() => {
    }, []);

    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerTitle: (props) => (
    //             < View style={styles.searchBarContainer} >
    //                 <TextInput placeholder="Restoran, outlet, product" value={keyword} onChangeText={v => setKeyword(v)} />
    //                 <MaterialCommunityIcons name="home" onPress={() => doSearch} />
    //             </View >
    //         ),
    //     });
    // }, [navigation, keyword, setKeyword, doSearch]);
    function doSearch(text) {
        // TODO : search to database using keyword
        setRow(text ? keyword ? [
            {
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
                        name: 'Ayam Goreng Ungkep',
                        net_amount: 46000,
                        gross_amount: 50000,
                        discounts: 4000,
                        img: '../images/nanda 2.png',
                        active: true,
                    },
                    {
                        id: 2,
                        name: 'Ayam Kampung bumbu manis',
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
                name: 'Aflah Bakery',
                market_id: 1,
                market_name: 'AA Group',
                img: '../images/nanda 1.png',
                category: 'Bakery',
                star: 4,
                delivery_amount: 16000,
                distance: 9,
                close: true,
                open: '08.00 - 22.00',
                products: [
                    {
                        id: 1,
                        name: 'Roti kukus lapis legit',
                        net_amount: 46000,
                        gross_amount: 50000,
                        discounts: 4000,
                        img: '../images/nanda 4.png',
                        active: true,
                    },
                ],
            },
            {
                id: 3,
                name: 'Azka Cell',
                market_id: 1,
                market_name: 'AA Group',
                img: '../images/nanda 1.png',
                category: 'Pulsa & HP',
                star: 3,
                delivery_amount: 9000,
                distance: 5,
                close: false,
                open: '08.00 - 22.00',
                products: [
                    {
                        id: 1,
                        name: 'Telkomsel Internet 20Giga',
                        net_amount: 46000,
                        gross_amount: 50000,
                        discounts: 4000,
                        img: '../images/nanda 1.png',
                        active: true,
                    },
                    {
                        id: 2,
                        name: 'Telkomsel Pulsa 100ribu',
                        net_amount: 46000,
                        gross_amount: 50000,
                        discounts: 4000,
                        img: '../images/nanda 2.png',
                        active: true,
                    },
                ],
            },
            {
                id: 4,
                name: 'Warung AA ',
                market_id: 1,
                market_name: 'AA Group',
                img: '../images/nanda 1.png',
                category: 'mini restoran',
                star: 2,
                delivery_amount: 40000,
                distance: 25,
                close: false,
                open: '08.00 - 22.00',
                products: [
                    {
                        id: 1,
                        name: 'Sego Campur Sarapan',
                        net_amount: 46000,
                        gross_amount: 50000,
                        discounts: 4000,
                        img: '../images/nanda 3.png',
                        active: true,
                    },
                    {
                        id: 2,
                        name: 'Sego Jagung Empok',
                        net_amount: 46000,
                        gross_amount: 50000,
                        discounts: 4000,
                        img: '../images/nanda 3.png',
                        active: true,
                    },
                    {
                        id: 2,
                        name: 'Nasi Pecek Gondanglegi',
                        net_amount: 46000,
                        gross_amount: 50000,
                        discounts: 4000,
                        img: '../images/nanda 3.png',
                        active: true,
                    },
                ],
            },
            {
                id: 5,
                name: 'Toko AA',
                market_id: 1,
                market_name: 'AA Group',
                img: '../images/nanda 1.png',
                category: 'Toko Klontong',
                star: 1,
                delivery_amount: 28000,
                distance: 17,
                products: [
                    {
                        id: 1,
                        name: 'AQUA Galon',
                        net_amount: 46000,
                        gross_amount: 50000,
                        discounts: 4000,
                        img: '../images/nanda 3.png',
                        active: true,
                    },
                    {
                        id: 2,
                        name: 'Gas 3Kg',
                        net_amount: 46000,
                        gross_amount: 50000,
                        discounts: 4000,
                        img: '../images/nanda 3.png',
                        active: true,
                    },
                    {
                        id: 2,
                        name: 'Blue Gas 5Kg',
                        net_amount: 46000,
                        gross_amount: 50000,
                        discounts: 4000,
                        img: '../images/nanda 3.png',
                        active: true,
                    },
                ],
            },
        ] : [] : []);
        setInit(false);
        return;
    }

    const updateHint = (key, index, text) => {
        doSearch(text);
        if (key === 'add') {
            setKeyword(text);
        }
        // setHint(hint.filter((d, i) => i !== index));
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
