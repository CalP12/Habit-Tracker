import React,{useState} from 'react'
import { auth, db } from "../firebase"
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

const AddTodo = props => {
    const [text, setText] = useState("");
    
    const addTodoHandler = async () => {
        props.onAddTodo(text);
        setText("");
        await db.collection('Habits').add({
            HabitTitle: text,
            HabitStreak: 0
        }).catch((error => alert(error)))
      };
      
const changeHandler = (val) => {
    setText(val);
}

    return(
        <View>
            <TextInput 
                style={styles.input}
                placeholder='Add a new habit...'
                onChangeText={changeHandler}
                value={text}
            />
            <Button onPress={addTodoHandler} title='Add' color='#5c37ff' />
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor:'blue'
    }
})

export default AddTodo;