import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet,Text, Modal,View ,TextInput,Button,FlatList,TouchableOpacity,Alert,LogBox } from 'react-native';
import { NavigationContainer,DrawerActions,DrawerItems, DrawerNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import HabitScreen from "./screens/myHabits.js"
import LoginScreen from "./screens/LoginScreen"
import StreakScreen from "./screens/streaks"
import { auth } from './firebase'
import { Feather } from '@expo/vector-icons'
import {SafeAreaView} from 'react-native-elements'
import SettingScreens from './screens/settings.js';
import RegisterScreen from './screens/RegisterScreen.js';


LogBox.ignoreLogs(['Setting a timer']);

const NavigationDrawerStructure = (props)=> {
  //Structure for the navigatin Drawer
  
  
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };
  return (
    <View style={{ flexDirection: 'row' }}>
    <Feather
      onPress={()=> toggleDrawer()}
      name="menu"
      color="white"
      size={30}
      style={{marginLeft:10}}
    />
    </View>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const firstScreenStack =({ navigation }) => {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Habit Tracker', //Set Header Title
          headerStyle: { backgroundColor:'#5c37ff'},
          headerTitleStyle: { color:'white'},
          headerTintColor: "white",
        }}
        />
        <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Sign Up', //Set Header Title
          headerStyle: { backgroundColor:'#5c37ff'},
          headerTitleStyle: { color:'white'},
          headerTintColor: "white",
        }}
        />
         <Stack.Screen name="Habits" component={HabitScreen} options={{
          title: 'Habits', //Set Header Title
          headerLeft: ()=>
            <NavigationDrawerStructure
              navigationProps={navigation}
            />,
          headerStyle: { backgroundColor:'#5c37ff'},
          headerTitleStyle: { color:'white'},
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}

const secondScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: ()=>
          <NavigationDrawerStructure
            navigationProps={navigation}
          />,
          headerStyle: { backgroundColor:'#5c37ff'},
          headerTitleStyle: { color:'white'},
          headerTintColor: "white",
      }}>
      <Stack.Screen
        name="Streaks"
        component={StreakScreen}
        />
    </Stack.Navigator>
  );
}   
const thirdScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: ()=>
          <NavigationDrawerStructure
            navigationProps={navigation}
          />,
          headerStyle: { backgroundColor:'#5c37ff'},
          headerTitleStyle: { color:'white'},
          headerTintColor: "white",
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingScreens}
        />
    </Stack.Navigator>
  );
}   


export default function App() 
{
  return (      
                   //drawerContent={props => <CustomDrawerContent {...props} />}
    <NavigationContainer>
    <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#5c37ff',
        }}>
        <Drawer.Screen
          name="My Habits"
          component={firstScreenStack} />
        <Drawer.Screen
          name="Streaks"
          component={secondScreenStack} />
        <Drawer.Screen
          name="Settings"
          component={thirdScreenStack} />
      </Drawer.Navigator>
      </NavigationContainer>
  );
}

