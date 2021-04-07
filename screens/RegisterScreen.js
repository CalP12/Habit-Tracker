import React , {useState, useLayoutEffect} from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { StatusBar } from "expo-status-bar"
import { Button, Input, Text, ThemeProvider } from 'react-native-elements'
import { auth } from "../firebase.js"
const theme = {
    Button: {
      titleStyle: {
        color: 'white',
      },
  }
  }
const RegisterScreen = ({navigation}) => {
    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const [imageUrl,setImageUrl]= useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"Login",

        })
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
            });
            })
        .catch((error) => alert(error.message)); 
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar style="light" />
        <Text h3 style={{marginBottom: 50,textAlign:"center",justifyContent:"center"}}>
            Create an account
        </Text>

<View style={styles.inputContainer}>
    <Input
        placeholder="Full Name" autofocus type="text" value={name} onChangeText= {text => setName(text)}
    />
    <Input
        placeholder="Email"  type="email" value={email} onChangeText= {text => setEmail(text)}
    />
    <Input
        placeholder="Password"  type="password" secureTextEntry value={password} onChangeText= {text => setPassword(text)}
    />
    <Input
        placeholder="Profile Picture"  type="text" value={imageUrl} onChangeText= {text => setImageUrl(text)} onSubmitEditing={register}
    />
</View>
<ThemeProvider theme={theme}>
<Button 
    containerStyle={styles.button}
    type="standard"
    onPress={register}
    title='Register'
/>
</ThemeProvider>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    button: {
        width: 200,
        marginTop: 10,
        backgroundColor:"#5c37ff",
    },
    inputContainer:{
        width: 300,
    }
})
