import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av'; // Expo Video bileşenini içe aktarın
import Logo from '../components/Logo';
import { ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import Icon, { Icons } from '../components/Icon';
import { useNavigation } from '@react-navigation/native';

const fetchFonts = async () => {
  await Font.loadAsync({
    'Raleway': require('../assets/Fonts/Raleway-Regular.ttf'),
    'Raleway ExtraBold': require('../assets/Fonts/Raleway-ExtraBold.ttf'),
    'Raleway Medium': require('../assets/Fonts/Raleway-MediumItalic.ttf'),
  });
};

export default function HesapBilgileri() {
  useEffect(() => {
    fetchFonts();
  }, []);

  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  const [dogumTarihi, setDogumTarihi] = useState('');
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [inputData, setInputData] = useState({
    ad: '',
    soyad: '',
    kullaniciAdi: '',
    dogumTarihi: '',
    email: '',
    sifre: '',
  });

  const handleKaydet = () => {
    console.log('Ad:', inputData.ad);
    console.log('Soyad:', inputData.soyad);
    console.log('Kullanıcı Adı:', inputData.kullaniciAdi);
    console.log('Doğum Tarihi:', inputData.dogumTarihi);
    console.log('Email:', inputData.email);
    console.log('Şifre:', inputData.sifre);
    navigation.goBack();
  };
  const navigation = useNavigation();

  const goBackToAyarlar = () => {
    navigation.goBack(); // Ayarlar sayfasına geri dön
  };
  

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.headercontainer}>
            <TouchableOpacity onPress={goBackToAyarlar}>
                <Icon type={Icons.AntDesign} name="left" size={28} color="black" style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.header}>HESAP BİLGİLERİ</Text>
        </View>
        <View style={styles.logoContainer}>
            <Logo style={styles.logo} />
        </View>
        <View style={styles.icerikcontainer}>
            <Text style={styles.iceriktext}>Ad</Text>
            <TextInput
                style={styles.input}
                placeholder="Adınızı girin"
                underlineColorAndroid="transparent"
                value={inputData.ad} // State'ten veriyi çekin
                onChangeText={text => setInputData({ ...inputData, ad: text })} // State'i güncelleyin
            />
        </View>
        <View style={styles.icerikcontainer}>
            <Text style={styles.iceriktext}>Soyad</Text>
            <TextInput
                style={styles.input}
                placeholder="Soyadınızı girin"
                underlineColorAndroid="transparent"
                value={soyad} 
                onChangeText={text => setSoyad(text)}
            />
        </View>
        <View style={styles.icerikcontainer}>
            <Text style={styles.iceriktext}>Kullanıcı Adı</Text>
            <TextInput
                style={styles.input}
                placeholder="Kullanıcı adınızı girin"
                underlineColorAndroid="transparent"
                value={kullaniciAdi} // input değeri state'ten gelir
                onChangeText={text => setKullaniciAdi(text)}
            />
        </View>
        <View style={styles.icerikcontainer}>
            <Text style={styles.iceriktext}>Doğum Tarihi</Text>
            <TextInput
                style={styles.input}
                placeholder="Doğum Tarihinizi girin"
                underlineColorAndroid="transparent"
                value={dogumTarihi} // input değeri state'ten gelir
                onChangeText={text => setDogumTarihi(text)}
            />
        </View>
        <View style={styles.icerikcontainer}>
            <Text style={styles.iceriktext}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email Adresinizi girin"
                underlineColorAndroid="transparent"
                value={email} // input değeri state'ten gelir
                onChangeText={text => setEmail(text)}
            />
        </View>
        <View style={styles.icerikcontainer}>
            <Text style={styles.iceriktext}>Şifre</Text>
            <TextInput
                style={styles.input}
                placeholder="Şifrenizi girin"
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                value={sifre} 
                onChangeText={text => setSifre(text)}
            />
        </View>
        <View style={styles.buttoncontainer}>
            <TouchableOpacity style={styles.kaydetbutton} onPress={handleKaydet}>
                <Text style={{color:'white', fontSize:20}}>KAYDET</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.guncellebutton}>
                <Text style={{color:'white', fontSize:20}}>GÜNCELLE</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 125,
  },
  header: {
    color: '#381163',
    fontFamily: 'Raleway',
    fontSize: 30,
  },
  headercontainer: {
    height: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logoContainer: {
    alignItems:'center',
    marginTop:-60
  },
  logo: {
    width: 150,
    height: 150,
  },
  icon:{
    marginRight:100
  },
  icerikcontainer:{
    borderBottomWidth:1,
    borderBottomColor:'#DBD9D9',
    margin:10,
    flexDirection:'row',
    padding:5,
    
  },
  input:{
    marginLeft:'auto',
    color: '#381163',
    fontFamily:'Raleway'

  },
  iceriktext:{
    color:'#381163',
    fontFamily:'Raleway'
  },
  buttoncontainer:{
    flexDirection:'row',
    justifyContent:'center',
    marginTop:100
  },
  kaydetbutton:{
    width:127,
    height:44,
    backgroundColor:'#381163',
    alignItems:'center',
    justifyContent:'center',
    marginRight:20,
    borderRadius:5,
    paddingTop:10,
    paddingBottom:10
  },
  guncellebutton:{
    width:127,
    height:44,
    backgroundColor:'#381163',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
    paddingTop:10,
    paddingBottom:10
  }
});
