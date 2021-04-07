import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image} from 'react-native-elements'
import { StatusBar } from "expo-status-bar";
import { auth } from '../firebase.js';
import { ThemeProvider} from 'react-native-elements';

const theme = {
  Button: {
    titleStyle: {
      color: 'white',
    },
}
}
const themes = {
    Button: {
      titleStyle: {
        color: '#5c37ff',
      },
      
  }
  }

const LoginScreen = ({navigation}) => {
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(authUser) {
            navigation.replace('Habits');
        }
    })
    return unsubscribe;
}, []);

 const signIn = () => {
    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error));
 }
    return (
        <KeyboardAvoidingView  style={styles.container} >
        <StatusBar style="light" />

        <Image source ={{
            uri:"https://i.ibb.co/BZ8sNL2/habitr.png",
        }}
        style={{width:200, height:200}}
        />
        <View style={styles.inputContainer}>
            <Input placeholder="Email" autofocus type="email" value={email} onChangeText={text=> setEmail(text)} />
            <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={text=> setPassword(text)}
             onSubmitEditing = {signIn}/>
        </View>
        <ThemeProvider theme={themes}>
        <Button raised containerStyle={styles.button2} type="standard"  onPress={signIn} title="Login" />
        </ThemeProvider>

        <ThemeProvider theme={theme}>
        <Button containerStyle={styles.button} type="standard" title="Register" onPress={() => navigation.navigate('Register')}/>
        </ThemeProvider>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
        backgroundColor:"#5c37ff",
        
    },
    button2: {
        width: 200,
        marginTop: 10,
        backgroundColor:"black",
    },
});