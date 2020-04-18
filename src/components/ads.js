/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { StyleSheet, View, Text, Dimensions, SafeAreaView, Image } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');
const itemWidth = viewportWidth + 40;
const Elm = ({ items }) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [entries] = useState(items.length ? items : []);

    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.containerItem}>
                <Image source={{ uri: item.img }} style={styles.itemImg} />
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemText}>{item.img}</Text>
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <Carousel
                data={entries}
                renderItem={_renderItem}
                onSnapToItem={(index) => setActiveSlide(index)}
                // slideStyle={{ flex: 1 }}
                sliderWidth={viewportWidth}
                itemWidth={itemWidth}
                itemHeight={50}
                loop={true}
                autoplay={true}
                autoplayInterval={3000}
            />
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.containerPaging}
                dotStyle={styles.dotStyle}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerPaging: {
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: '#000',
    },
    containerItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemImg: {
        height: 160,
        backgroundColor: '#000',
    },
    itemText: {
        alignItems: 'center',
    },
});

export default Elm;
