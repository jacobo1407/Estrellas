import React from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Home from './src/screens/Home';
import Rooms from './src/screens/Rooms';
import Profile from './src/screens/Profile';
import LogIn from './src/screens/LogIn';
import SignUp from './src/screens/SignUp';
import Filters from './src/screens/Filters';
import Payment from './src/screens/Payment';
import ActiveFilters from './src/screens/ActiveFilters';
import { ScreensProvider } from './src/screens/ScreenContextId';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'lightblue',
      },
    }}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="LogIn" component={LogIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);
const RoomsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: '',
      headerStyle: {
        backgroundColor: 'lightblue',
      },
    }}>
    <Stack.Screen
      name="Filters"
      component={Filters}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Rooms" component={Rooms} />
    <Stack.Screen name="ActiveFilters" component={ActiveFilters} />
    <Stack.Screen name="Payment" component={Payment} />
  </Stack.Navigator>
);
const App = () => (
  <ScreensProvider>
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Rooms') {
            iconName = focused ? 'bed' : 'bed-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} color={color} size={size} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'black',
      }}
      tabBarStyle={{
        borderTopWidth: 1,
        borderTopColor: 'black',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => (
            <Image
              source={require('./src/img/estrellas.png')}
              style={{ width: 120, height: 40, alignSelf: 'center' }}
            />
          ),
          headerStyle: {
            backgroundColor: 'lightblue',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Rooms"
        component={RoomsStack}
        options={{
          headerTitle: () => (
            <Image
              source={require('./src/img/estrellas.png')}
              style={{ width: 120, height: 40, alignSelf: 'center' }}
            />
          ),
          headerStyle: {
            backgroundColor: 'lightblue',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerTitle: () => (
            <Image
              source={require('./src/img/estrellas.png')}
              style={{ width: 120, height: 40, alignSelf: 'center' }}
            />
          ),
          headerStyle: {
            backgroundColor: 'lightblue',
          },
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
  </ScreensProvider>
);
export default App;
