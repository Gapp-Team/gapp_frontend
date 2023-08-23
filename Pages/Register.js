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
import { CheckBox } from 'react-native-elements';

export default function Register({navigation}){
  const [isChecked, setIsChecked] = useState(false);
  const openAydinlatmaMetniLink = () => {
    const url = 'https://www.khas.edu.tr/kvkk-aydinlatma-metni/';
    Linking.openURL(url);
  };

  return (
    <View style = {styles.container}>
      <Logo />
      <Text style = {styles.header}>BİZE KATILIN !</Text>
      
      <View style={styles.inputContainer}>
        <Image source={require('../assets/username.png')} style={styles.image} />
        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
           placeholderTextColor="#381163" 
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/email2.png')} style={styles.image} />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
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
      <View style={styles.inputContainer}>
        <Image source={require('../assets/password.png')} style={styles.image} />
        <TextInput
          style={styles.input}
          placeholder="Şifre (Tekrar)"
           placeholderTextColor="#381163" 
        />
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          title={
            <>
            <Text style={styles.checkboxText} onPress={openAydinlatmaMetniLink}>
              Aydınlatma Metni’ni okudum ve KVKK kapsamında bilgilerimin kullanılmasına izin veriyorum.
            </Text>
          </>
          }
          checked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
           textStyle={styles.checkboxText}
            containerStyle={styles.checkboxBackground}
        />
      </View>
      <View>
       <TouchableOpacity style={styles.registerButton} >
          <Text style={styles.registerButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
      <View>
       <TouchableOpacity style={styles.loginButton} >
          <Text style={styles.loginButtonText}>Hesabın var mı? Şimdi<Text style={styles.loginNavigate} onPress = {() => navigation.navigate('Login')}> Giriş Yap ! </Text> </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:  'center'
  },
  header: {
    color: '#381163',
    fontWeight: '700',
    fontFamily: 'Hammersmith One',
    fontSize: 30
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
  checkboxContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:60,
    marginRight: 60,
    marginBottom: 25, // Set the background to transparent
    borderWidth: 0, // Remove the border
  },
  checkboxBackground:{
    backgroundColor: 'transparent',
  },
  checkboxText: {
    marginLeft: 6,
    color: '#381163',
    textDecorationLine: 'underline'

  },
  registerButton: {
    backgroundColor: '#381163',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  loginButton: {
    paddingHorizontal: 30,
    paddingVertical: 22,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    letterSpacing: 3,
        fontFamily: 'Hubballi',

  },
  loginButtonText: {
    color: '#381163',
    fontSize: 15,
    letterSpacing: 1,
        fontFamily: 'Hubballi',
  },
  loginNavigate: {
    textDecorationLine: 'underline'

  }
})