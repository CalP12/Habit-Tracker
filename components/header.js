import React,{useState} from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Header() {
    return(
        
        <View style={styles.header}>
        <StatusBar style="light" />
            <Text style={styles.title}>Habit Tracker</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height: 80,
        paddingTop: 38,
        backgroundColor: 'blue'
    },
    title:{
        textAlign:'center',
        color:'#fff',
        fontSize: 20,
        fontWeight: 'bold',
    }
});