import React,{useState,useEffect}from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { db } from "../firebase"
import {ListItem, Avatar} from 'react-native-elements'
import Emoji from 'react-native-emoji'

const CustomListItem = ({id,HabitTitle,HabitStreak}) => {
    return (
        <ListItem key={id} containerStyle={styles.item} >
        <ListItem.Content>
                <ListItem.Title>
                    {HabitTitle}
                </ListItem.Title>
            </ListItem.Content>
            <Text style={{fontSize:17,fontWeight:"bold"}}>{HabitStreak}</Text>
            <Emoji name="fire"/>
        </ListItem>
    )
}
export default CustomListItem

const styles = StyleSheet.create({
    item: {
        backgroundColor:"white",
        borderRadius:10,
          marginTop: 16,
      },
})