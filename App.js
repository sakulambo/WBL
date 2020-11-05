import React from 'react';
import Warscrolls from './app/warscrolls';
import Detail from './app/detail';

import Contacts from './app/screens/drawer/Contacts';
import Dices from './app/screens/drawer/Dices';
import Settings from './app/screens/drawer/Settings';

import Tab1 from './app/screens/tabs/Tab1';
import Tab2 from './app/screens/tabs/Tab2';
import Tab3 from './app/screens/tabs/Tab3';

import {
  NavigationContainer,
  DarkTheme,
  DrawerActions
} from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useColorScheme, AppearanceProvider } from 'react-native-appearance';
import { Image } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();


const App = () => {

  const colorScheme = useColorScheme();

  const MyTheme = {
    dark: false,
    colors: {
      primary: 'white',
      background: 'white',
      card: '#65509f',
      text: 'white',
      border: 'green',
    },
  }

  const linking = {
    prefixes: ['recipes://'],
    config: {
      screens: {
        Warscrolls: 'warscrolls/:title',
        Detail: 'detail/:foodName',
        BottomTabs: {
          path: 'bottom_tabs',
          screens: {
            Tab1: {
              path: 'bTab1',
              exact: true
            },
            Tab2: {
              path: 'bTab2',
              exact: true
            },
            Tab3: {
              path: 'bTab3',
              exact: true
            }
          }
        },
        TopTabs: {
          path: 'top_tabs',
          screens: {
            Tab1: {
              path: 'tTab1',
              exact: true
            },
            Tab2: {
              path: 'tTab2',
              exact: true
            },
            Tab3: {
              path: 'tTab3',
              exact: true
            }
          }
        },
        Dices: 'dices/:user/:id',
        Contacts: 'contacts/:user?',
        Settings: {
          path: 'settings/:color/:age/:isVerified',
          parse: {
            age: Number,
            isVerified: Boolean,
            color: (color) => `color-${color}`
          }
        }
      }
    }
  }

  const createHomeStack = () =>
    <Stack.Navigator>
      <Stack.Screen
        name="Warscrolls"
        children={createDrawer}
        options={({ navigation }) => ({
          title: "React Navigation",
          headerLeft: () =>
            <Icon
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={[{ color: 'white', marginLeft: 8 }]}
              size={24}
              name={'menu'}
            />
        })
        }
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: "Detail Screen"
        }}
      />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="TopTabs" children={createTopTabs} />
    </Stack.Navigator>

  const createDrawer = () =>
    <Drawer.Navigator>
      <Drawer.Screen name="Warscrolls" component={Warscrolls} options={{
        drawerIcon: config =>
         <Image style={{ width: 30, height: 30 }} source={require('./app/assets/main_logo.jpeg')} />
      }} />
      <Drawer.Screen name="List" component={Contacts} options={{
        drawerIcon: config =>
         <Image style={{ width: 30, height: 30 }} source={require('./app/assets/main_logo.jpeg')} />
      }} />
      <Drawer.Screen name="Dices" component={Dices} options={{
        drawerIcon: config =>
         <Image style={{ width: 30, height: 30 }} source={require('./app/assets/main_logo.jpeg')} />
      }} />
      <Drawer.Screen name="Settings" component={Settings} options={{
        drawerIcon: config =>
         <Image style={{ width: 30, height: 30 }} source={require('./app/assets/main_logo.jpeg')} />
      }} />
    </Drawer.Navigator>

  const createTopTabs = (props) => {
    return <MaterialTopTabs.Navigator>
      <MaterialTopTabs.Screen
        name="Tab1"
        component={Tab1}
        options={{ title: props.route.params.name }}
      />
      <MaterialTopTabs.Screen name="Tab2" component={Tab2} />
      <MaterialTopTabs.Screen name="Tab3" component={Tab3} />
    </MaterialTopTabs.Navigator>
  }

  const BottomTabs = () => {
    return <MaterialBottomTabs.Navigator>
      <MaterialBottomTabs.Screen
        name="Tab1"
        style={{ marginBottom: 16 }}
        component={Tab1}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Icon style={[{ color: 'white' }]} size={25} name={'home'} />
          ),
        }}
      />
      <MaterialBottomTabs.Screen name="Tab2" component={Tab2}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Icon style={[{ color: 'white' }]} size={25} name={'human'} />
          )
        }}
      />
      <MaterialBottomTabs.Screen name="Tab3" component={Tab3}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: () => (
            <Icon style={[{ color: 'white' }]} size={25} name={'map'} />
          ),
        }}
      />
    </MaterialBottomTabs.Navigator>
  }

  return (
    <AppearanceProvider>
      <NavigationContainer theme={colorScheme == 'dark' ? DarkTheme : MyTheme}
        linking={linking}
      >
        {createHomeStack()}
      </NavigationContainer>
    </AppearanceProvider>
  );
}

export default App;
