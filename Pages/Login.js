import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,Linking
} from 'react-native';
import Logo from '../components/Logo';

export default function Login({navigation}){

  return (
    <View style = {styles.container}>
      <Logo />
      <Text style = {styles.header}>MERHABA,</Text> 
      <Text style = {styles.header2}>TEKRAR HOŞGELDİN !</Text>
      
      <View style={styles.inputContainer}>
        <Image source={require('../assets/username.png')} style={styles.image} />
        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
           placeholderTextColor="#381163" 
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/password.png')} style={styles.image} />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
           placeholderTextColor="#381163" 
        />
      </View>
      <View>
        <TouchableOpacity style={styles.forgetButton}>
          <View style={styles.buttonContent}>
            <Text style={styles.forgetButtonText}>Şifremi Unuttum</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
       <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Navbar')} >
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
      <View>
       <Text style={styles.registerButton} onPress = {() => navigation.navigate('Register')}>
        <Text style={styles.registerButtonText}>
          Burada yeni misin? Hemen<Text style={styles.registerNavigate} > Kayıt Ol !</Text>
        </Text>
       </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:  'center',
  },
  header: {
    color: '#381163',
    fontWeight: '700',
    fontFamily: 'Hammersmith One',
    fontSize: 30,
    alignSelf: 'center'
  },
  header2: {
    color: '#381163',
    fontWeight: '700',
    fontFamily: 'Hammersmith One',
    fontSize: 22,
    marginTop:5,
    marginBottom: 30,
    alignSelf: 'center'
  },
  inputContainer: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row', 
    borderBottomWidth: 2, 
    borderBottomColor: '#381163', 
  },
  input: {
    borderWidth: 0,
    borderColor: '#381163',
    borderRadius: 5,
    padding: 10,
    width: 250,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Hubballi',
    letterSpacing:2
  },
  image: {
    width: 40,
    height: 40,
    marginTop: 10,
    marginBottom: 5
  },
  loginButton: {
    backgroundColor: '#381163',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
    marginBottom:8,
    marginTop:2,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    letterSpacing: 3,
        fontFamily: 'Hubballi',

  },
  buttonContent: {
    flexDirection: 'row',
    marginLeft: 160
  },
  forgetButtonText:{
    color: '#381163',
    fontSize: 15,
    letterSpacing: 1,
    fontFamily: 'Hubballi',
    marginTop: 15, 
    marginBottom: 30
  },
  registerButton: {
    paddingHorizontal: 30,
    paddingVertical: 22,
    margin:20
  },
  registerButtonText: {
    color: '#381163',
    fontSize: 15,
    letterSpacing: 1,
        fontFamily: 'Hubballi',
  },
  registerNavigate: {
    textDecorationLine: 'underline'
  }
})