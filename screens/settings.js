import React,{useState} from 'react';
import {
    Button,
    View,
    Text,
    SafeAreaView
  } from 'react-native';
  
  const SettingScreens = ({ navigation }) => {
    return (
        <View style={{ flex: 1,padding:25 }}>

            <Text
              style={{
                  fontWeight:"bold",
                  fontSize:35,
                  marginBottom:15
              }}>
              Settings
            </Text>

        </View>
    );
  }
  
  export default SettingScreens;