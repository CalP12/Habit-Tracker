import React,{useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View,Text,StyleSheet,ScrollView} from 'react-native';
import { Button, Input } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Icon from 'react-native-vector-icons/FontAwesome'
import { auth, db } from "../firebase"

import CustomListItem from '../components/streakitem';

  const StreakScreen = ({navigation}) => {   
    const [Habits, setHabits] = useState([]);
    useEffect(() =>{
      const unsubscribe = db.collection('Habits').onSnapshot(snapshots => (
          setHabits(snapshots.docs.map(doc => ({
              id: doc.id,
              data: doc.data()
          })))
      ))
      return unsubscribe;
  }, [])

    const [input,setInput] = useState("")
    return ( 
        <View style={{ flex: 1, padding:30}}>
        <StatusBar style="light" />  
        <Text style={styles.streakTitle}>    
        Streaks
        </Text>
        <ScrollView style={styles.container}>
            {Habits.map(({id,data: { HabitTitle,HabitStreak }}) => (
                <CustomListItem key={id} id={id} HabitTitle={HabitTitle} HabitStreak={HabitStreak} />
            ))}
            </ScrollView>
          </View>   
    )
  }
  
  export default StreakScreen;
  const styles = StyleSheet.create({
    streakTitle: {
      fontWeight:"bold",
     fontSize:35,
     marginBottom:15
    },
    item: {
      backgroundColor:"white",
       padding: 16,
        marginTop: 16,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        flexDirection:'row', flexWrap:'wrap',
    },
  })