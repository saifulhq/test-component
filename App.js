// @ts-nocheck
/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React, { useReducer, useEffect, useMemo, createContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// shopping cart
import { Provider } from 'react-redux';
import store from './src/store';

// own component
import SplashScreen from './src/pages/splash';
import LoginScreen from './src/pages/login';
import RegisterScreen from './src/pages/register';
import HomeScreen from './src/pages/home';
import DetailScreen from './src/pages/detail';
import CartScreen from './src/pages/cart';
import ProfileScreen from './src/pages/profile';
import OutletScreen from './src/pages/outlet';
import SearchScreen from './src/pages/search';
import ProductScreen from './src/pages/product';
import ModalScreen from './src/components/orderModal';

export const AuthContext = createContext();

const App = ({ navigation }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      let result = {};
      switch (action.type) {
        case 'RESTORE_TOKEN':
          result = {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
          break;
        case 'SIGN_IN':
          result = {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
          break;
        case 'SIGN_OUT':
          result = {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
          break;
      }
      return result;
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.error(e);
      }

      // TODO : authentication to server
      setTimeout(() => {
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      }, 3000);
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // TODO : check to server username and password, then save the token
        let token = JSON.stringify(data);
        let status = await AsyncStorage.setItem('userToken', token);
        dispatch({ type: 'SIGN_IN', token });
      },
      signOut: async () => {
        // TODO : call backend to remove token
        let status = await AsyncStorage.removeItem('userToken');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async data => {
        dispatch({ type: 'RESTORE_TOKEN' });
      },
    }), []
  );

  // if (state.isLoading) {
  //   return (<SplashScreen />);
  // }

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  function HomeTab() {
    return (
      <Tab.Navigator
        // initialRouteName="Home"
        headerMode="none"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home': {
                iconName = focused ? 'home' : 'home-outline';
                break;
              }
              case 'Detail': {
                iconName = focused ? 'history' : 'history';
                break;
              }
              case 'Cart': {
                iconName = focused ? 'cart' : 'cart-outline';
                break;
              }
              case 'Profile': {
                iconName = focused ? 'account' : 'account-outline';
                break;
              }
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          showIcon: true,
          showLabel: true,
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          labelStyle: {},
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Tab.Screen name="Detail" component={DetailScreen} options={{ title: 'Histories' }} initialParams={{ itemId: 42 }} />
        <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        {/* <Tab.Screen name="Modal" component={ModalScreen} options={{ title: 'Profile' }} /> */}
      </Tab.Navigator>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {state.isLoading ? (
              <Stack.Screen name="Splash" component={SplashScreen} initialParams={{ token: state.token }} headerMode="none" />
            ) : state.userToken == null ? (
              <>
                <Stack.Screen name="SignIn" component={LoginScreen} headerMode="none" />
                <Stack.Screen name="SignUp" component={RegisterScreen} headerMode="none" />
              </>
            ) : (
                  <>
                    <Stack.Screen name="Home" component={HomeTab} />
                    <Stack.Screen name="Outlet" component={OutletScreen} />
                    <Stack.Screen name="Product" component={ProductScreen} />
                    <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
                  </>
                )}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </AuthContext.Provider >
  );
};

export default App;
