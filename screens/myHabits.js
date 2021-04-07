import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { StyleSheet,Text, Modal,View ,TextInput,Button,FlatList,TouchableOpacity,Alert } from 'react-native';
import TodoItem from '../components/todoitem';
import AddTodo from '../components/addTodo';
import { AntDesign,Ionicons } from '@expo/vector-icons';
import { auth, db } from "../firebase"
import StreakScreen from './streaks';

const HabitScreen = ({navigation}) => {
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
const signOutUser = () => {
    auth.signOut().then(() => {
        navigation.replace('Login')
    })
}
const handleDelete = (todoKey) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todos => todos.key !== todoKey);
    });
  };

  const handleEdit = (todoKey, newText) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(todos => todos.key === todoKey);
    newTodos[index] = Object.assign(newTodos[index], { value: newText });
   setTodos(newTodos);
  };
  
  const [modalVisible, setModalVisible] = useState(false);


  const [todos,setTodos] = useState([
    { value:'Drink Water', key:'1' },
    { value:'Workout', key:'2' },
    { value:'Study', key:'3' }
  ]);

  const addTodoHandler = (addTodos) => {
    setModalVisible(!modalVisible);
    if (addTodos.length < 5) {
      Alert.alert("Too short!","Habit must be over 5 characters long.")
      return;
    }
    setTodos(prevTodos => [
      { key: Math.random().toString(), value: addTodos },
      ...prevTodos,
    ]);
  };


  return (
    
    <View style={styles.container}>

    <StatusBar style="light" />
    
      <View style = {styles.content}>
      
      <Modal //add modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible)}}
        >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <AddTodo onAddTodo={addTodoHandler}/>
          </View>
        </View>

      </Modal>

      <Text style={styles.habitTitle}>
        My Habits
      </Text> 

        <View style={styles.list}>
        
        <FlatList
        keyExtractor={(item, index) => item.key}
        data={todos}
        renderItem={({ item }) => (
          <View>
          
          <TodoItem
            key={item.key}
            todoKey={item.key}
            title={item.value}
            editHandler={handleEdit}
            pressHandler={handleDelete}
          />
          
          </View>
          )}  
         /> 
          
        </View>
        
        
      </View>
      <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {setModalVisible(true)}}
          style={styles.addHabitStyle}>
         <AntDesign name="pluscircle" size={50} color="#5c37ff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={signOutUser} activeOpacity={0.5} style={styles.logoutStyle}>
        <Ionicons name="ios-log-out" size={50} color="#5c37ff" />
                </TouchableOpacity>
    </View>
    
  );
}
export default HabitScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content:{
    padding:30,
  },
  list:{
    marginTop: 20
  },
  openButton: {
    backgroundColor: 'blue',
    borderRadius: 60,
    padding: 10,
    
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  modalView: {
    padding: 35,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addHabitStyle: {
    
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  logoutStyle: {
    
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    left: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    position: 'relative',
  },
  habitTitle: {
    fontWeight:"bold",
    fontSize:35,
  }
})