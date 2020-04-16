// @ts-nocheck
/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React, { useReducer, useEffect, useMemo, createContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// own component
import SplashScreen from './src/pages/splash';
import LoginScreen from './src/pages/login';
import RegisterScreen from './src/pages/register';
import HomeScreen from './src/pages/home';
import DetailScreen from './src/pages/detail';
import PostScreen from './src/pages/post';
import ProfileScreen from './src/pages/profile';
import OutletScreen from './src/pages/outlet';
import SearchScreen from './src/pages/search';

export const AuthContext = createContext();


const App = ({ navigation }) => {
  console.log('init use reducer');
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      console.log('use reducer called');
      console.log({ prevState, action });
      let result = {};
      switch (action.type) {
        case 'RESTORE_TOKEN':
          result = {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
          console.log('kudune mrene pertama kali');
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
      console.log('hasilnya', { result });
      return result;
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  console.log('init Effect');
  useEffect(() => {
    console.log('useEffect called');
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.error(e);
      }
      // TODO : authentication to server
      console.log('koen=', userToken);
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
        console.log({ status });
        dispatch({ type: 'SIGN_IN', token });
      },
      signOut: async () => {
        // TODO : call backend to remove token
        let status = await AsyncStorage.removeItem('userToken');
        console.log({ status });
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
      <Tab.Navigator initialRouteName="Home"
        headerMode="none"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home': {
                iconName = focused ? 'home' : 'home-outline';
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
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home Page' }} />
        <Tab.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail Page' }} initialParams={{ itemId: 42 }} />
        <Tab.Screen name="Post" component={PostScreen} options={{ title: 'Post Page' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile Page' }} />
      </Tab.Navigator>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
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
                  <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
                </>
              )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider >
  );
};

export default App;
