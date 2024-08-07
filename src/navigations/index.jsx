import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import SavedScreen from '../screens/SavedScreen';
import SearchScreen from '../screens/SearchScreen';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import NewsDetailsScreen from '../screens/NewsDetailsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/Colors';
import {useColorScheme} from 'nativewind';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const {colorScheme} = useColorScheme();

  // const isDark = colorScheme.colorScheme === 'dark';

  // console.log('Color Scheme in dark---', isDark);
  console.log('Color Scheme in Navigation', colorScheme);

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let iconName = '';
            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Discover') {
              iconName = 'compass-outline';
            } else if (route.name === 'Saved') {
              iconName = 'bookmark-outline';
            } else if (route.name === 'Search') {
              iconName = 'search-outline';
            }
            const iconSize = 25;
            return (
              <Ionicons
                name={iconName}
                size={iconSize}
                color={focused ? colors.primary_blue : colors.secondary_blue}
              />
            );
          },

          tabBarStyle: {
            backgroundColor:
              colorScheme === 'dark' ? colors.bg_black : colors.bg_white,
            height: 60,
            paddingTop: 10,
            paddingBottom: 5,
          },
          tabBarActiveTintColor: colors.primary_blue,
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: 13,
            fontFamily: 'Roboto-Bold',
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="HomeTabs" component={TabNavigator} />
        <Stack.Screen
          name="NewsDetails"
          component={NewsDetailsScreen}
          options={{animation: 'slide_from_left'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
