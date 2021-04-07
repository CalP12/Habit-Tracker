import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Animated,TextInput,Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Checkbox } from 'react-native-paper';
import { auth, db } from "../firebase"

const TodoItem = (props) => {
  const [streak,setStreak] = useState(0);
  const [checked, setChecked] = useState(false);


  const checkHandler = async () => {
    setChecked(!checked);
    if(checked==false)
    {
    setStreak(() => {
      setStreak(streak + 1);
    }, 1000);
    }
  }

  const [text, setText] = useState(props.title);
  const [isEditing, setEdit] = useState(false);
  const handleEdit = () => {
    props.editHandler(props.todoKey, text);
    setEdit(false);
  };
  
  const leftSwipe = (progress, dragX) => {
      
       const scale = dragX.interpolate({
         inputRange: [0, 70],                      // {() => props.pressHandler(props.todoKey)}
          outputRange: [0, 1],                      
          extrapolate: 'clamp',
        });
        
        return (
            <View style={styles.deleteBox} >
            <TouchableOpacity onPress={() => props.pressHandler(props.todoKey)}>
             <Animated.Text style={{transform: [{scale: scale}],color:"white",paddingLeft:10,paddingRight:10}}>
                Delete
              </Animated.Text>
              </TouchableOpacity>
            </View>
            
          
        );
  };
    return(
        <View style={styles.item}>
        <Swipeable renderLeftActions={leftSwipe}>
        {isEditing ? (
          <TextInput autoFocus={true}
            value={text}
            onChangeText={setText}
            style={styles.itemText}
          />
        ) : (
          
        <Text style={{fontSize:17,width:"88%",}}>
        {props.title}
        </Text>
        
        )}
        
        {isEditing ? (
            <View style={{margin:10}}>
            <Button color="#5c37ff" title="Save" onPress={handleEdit} />
            </View>
          ) : (
        <TouchableOpacity style={{alignSelf:"flex-end",flexDirection:'row', flexWrap:'wrap' }}  >
        <AntDesign name="edit" size={26} onPress={() => setEdit(true)}/>
        <View style={{width:"2%"}}></View>
        <Checkbox color="#5c37ff" status={checked ? 'checked' : 'unchecked'} onPress={checkHandler} />
        </TouchableOpacity>    
          )}
        </Swipeable>
        </View>
        
    )

}

const styles = StyleSheet.create({
    item: {
      backgroundColor:"white",
        padding: 16,
        marginTop: 16,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        borderRadius: 10,
    },
    deleteBox: {
      borderRadius:6,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 41,
        marginRight:15,
        
    },
    itemText: {
      width: "70%",
      paddingVertical: 5,
      padding: 5,
      marginRight: 5,
      borderRadius: 6
    },
})
export default TodoItem;