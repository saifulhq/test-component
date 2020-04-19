/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, StyleSheet, Button, Platform, PermissionsAndroid, useWindowDimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import s from '../styles';
import { TextInput } from 'react-native-gesture-handler';

async function requestPermissions() {
    if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization();
        Geolocation.setRNConfiguration({
            skipPermissionRequests: false,
            authorizationLevel: 'whenInUse',
        });
    }

    if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
    }
}
class Page extends Component {
    constructor(props) {
        super(props);
        let marker = props.route?.marker;
        this.state = {
            state: false,
            where: { lat: null, long: null },
            ready: false,
            marker: {
                latitude: -8.17792954861222,
                latitudeDelta: 0.005183426562252791,
                longitude: 112.64227660372853,
                longitudeDelta: 0.00279989093542099,
            },
            place: '',
            button: {
                confirm: true,
            },
        };
    }

    componentDidMount() {
        if (!this.state.ready) {
            this.findLocation();
        }
    }

    findLocation() {
        requestPermissions();
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    ready: true,
                    where: {
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    },
                    marker: {
                        latitude: position.coords.latitude,
                        latitudeDelta: 0.0028,
                        longitude: position.coords.longitude,
                        longitudeDelta: 0.0028,
                    }
                });
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    onRegionChange(region) {
        this.setState({
            marker: region,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.ready && (
                    <>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            zoomEnabled={true}
                            showsMyLocationButton={true}
                            showsUserLocation={true}
                            showsCompass={true}
                            showsScale={true}
                            showsPointsOfInterest={true}
                            showsBuildings={true}
                            initialRegion={{
                                latitude: this.state.where.lat,
                                longitude: this.state.where.long,
                                latitudeDelta: 0.0028,
                                longitudeDelta: 0.0028,
                            }}
                            onRegionChange={v => {
                                this.onRegionChange(v);
                                this.setState({ button: { confirm: false } });
                            }}
                            onRegionChangeComplete={() => {
                                this.setState({ button: { confirm: true } });
                            }}
                        >
                            <Marker
                                coordinate={this.state.marker}
                                title={''}
                                description={''}
                            />
                        </MapView>
                        <View style={[{ position: 'absolute', top: 10, right: 10, backgroundColor: '#FFF' }, s.row]}>
                            <TextInput
                                style={[{ maxWidth: 300 }]}
                                value={
                                    this.state.place + ', ' +
                                    this.state.marker.latitude + ', ' +
                                    this.state.marker.longitude
                                }
                            />
                            <Button
                                title="Confirm"
                                onPress={() => {
                                    // this.props.navigation.state.params.setMarket(this.state.marker);
                                    // this.props.navigation.goBack();
                                    this.props.navigation.navigate('Cart', { marker: this.state.marker });
                                }}
                                disabled={!this.state.button.confirm}
                            />
                        </View>
                    </>
                )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        backgroundColor: '#000',
        height: '100%',
        width: '100%',
    },
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
});

export default Page;
