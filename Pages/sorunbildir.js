import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';  
import Logo from '../components/Logo';
import { ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import Icon, { Icons } from '../components/Icon';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const fetchFonts = async () => {
  await Font.loadAsync({
    'Raleway': require('../assets/Fonts/Raleway-Regular.ttf'),
    'Raleway ExtraBold': require('../assets/Fonts/Raleway-ExtraBold.ttf'),
    'Raleway Medium': require('../assets/Fonts/Raleway-MediumItalic.ttf'),
  });
};

export default function Sorunbildir() {
  useEffect(() => {
    fetchFonts();
  }, []);

  const [email, setEmail] = useState('');
  const [konu, setKonu] = useState('');
  const [metinAlani, setMetinAlani] = useState('');

  const [inputData, setInputData] = useState({
    email: '',
    konu: '',
    metinAlani:''
  });

  const handleKaydet = () => {
    console.log('Email:', inputData.email);
    console.log('Konu:', inputData.konu);
    console.log('Metin Alanı:', inputData.metinAlani);
    navigation.goBack();
  };
  
  const navigation = useNavigation();

  const goBackToAyarlar = () => {
    navigation.goBack();
  };
  
  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert('Fotoğraf erişimi izni verilmedi.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync();
  
    if (!result.cancelled) {
      console.log(result.uri);
    }
  };

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.headercontainer}>
            <TouchableOpacity onPress={goBackToAyarlar}>
                <Icon type={Icons.AntDesign} name="left" size={28} color="black" style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.header}>SORUN BİLDİR</Text>
        </View>
        <View style={styles.logoContainer}>
            <Text style={{textAlign:'center', marginTop:70, fontFamily:'Raleway ExtraBold', color:'#381163' ,fontSize: 25, marginBottom:45}}>LÜTFEN SORUNUNUZU BİZİMLE PAYLAŞIN VE SİZE DESTEK OLALIM</Text>
        </View>
        <View style={{alignItems:'center'}}>
            <View style={{borderWidth:1, width:'90%', margin:'auto', backgroundColor:'#E9E9E980', borderColor:'#D2D2D2', paddingBottom:90}}>
                <View style={styles.icerikcontainer}>
                    <Text style={styles.iceriktext}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email Adresinizi girin"
                        underlineColorAndroid="transparent"
                        value={email} 
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View style={styles.icerikcontainer}>
                    <Text style={styles.iceriktext}>Konu</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Konu girin"
                        underlineColorAndroid="transparent"
                        value={konu} 
                        onChangeText={text => setKonu(text)}
                    />
                </View>
                <View style={styles.icerikcontainer}>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Açıklama girin"
                        multiline={true}
                        numberOfLines={4}  İstediğiniz satır sayısını belirleyebilirsiniz
                        underlineColorAndroid="transparent"
                        value={metinAlani}
                        onChangeText={text => setMetinAlani(text)}
                    />
                </View>
            </View>
        </View>
        <View style={{margin:20}}>
            <TouchableOpacity style={styles.fotografEkleButton} onPress={() => handleImagePick(setImage1)}>
                {image1 ? (
                <>
                    <Image source={{ uri: image1 }} style={styles.selectedImage} />
                    <TouchableOpacity style={styles.deleteImage} onPress={() => handleDeleteImage(setImage1)}>
                    <Icon type={Icons.AntDesign} name="delete" size={20} color="white" />
                    </TouchableOpacity>
                </>
                ) : (
                <Icon type={Icons.AntDesign} name="plus" size={20} color="#381163" style={styles.iconfotograf} />
                )}
                <Text style={styles.fotografEkleButtonText}>Fotograf Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fotografEkleButton} onPress={() => handleImagePick(setImage1)}>
                {image2 ? (
                <>
                    <Image source={{ uri: image1 }} style={styles.selectedImage} />
                    <TouchableOpacity style={styles.deleteImage} onPress={() => handleDeleteImage(setImage1)}>
                    <Icon type={Icons.AntDesign} name="delete" size={20} color="white" />
                    </TouchableOpacity>
                </>
                ) : (
                <Icon type={Icons.AntDesign} name="plus" size={20} color="#381163" style={styles.iconfotograf} />
                )}
                <Text style={styles.fotografEkleButtonText}>Fotograf Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fotografEkleButton} onPress={() => handleImagePick(setImage1)}>
                {image3 ? (
                <>
                    <Image source={{ uri: image1 }} style={styles.selectedImage} />
                    <TouchableOpacity style={styles.deleteImage} onPress={() => handleDeleteImage(setImage1)}>
                    <Icon type={Icons.AntDesign} name="delete" size={20} color="white" />
                    </TouchableOpacity>
                </>
                ) : (
                <Icon type={Icons.AntDesign} name="plus" size={20} color="#381163" style={styles.iconfotograf} />
                )}
                <Text style={styles.fotografEkleButtonText}>Fotograf Ekle</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 13, color:'#381163', marginTop:10, fontFamily:'Raleway'}}>***Yalnızca png, jpg formatında ve 100 mb boyutunda fotoğraf yükleyiniz.</Text>
        </View>
        <View style={{alignItems:'center'}}>
            <TouchableOpacity style={styles.kaydetbutton} >
                <Text style={{color:'white', fontSize:20}}>GÖNDER</Text>
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
    marginRight:130
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
    fontFamily:'Raleway',
    fontSize:20
  },
  buttoncontainer:{
    flexDirection:'row',
    justifyContent:'center',
    marginTop:100
  },
  fotografEkleButton:{
    width:150,
    height:44,
    backgroundColor:'#E9E9E980',
    alignItems:'center',
    justifyContent:'center',
    marginRight:20,
    borderRadius:5,
    padding:10,
    marginBottom:10,
    flexDirection:'row'
  },
  fotografEkleButtonText:{
    color:'#381163',
    fontFamily:'Raleway',
    fontSize:16
  },
  iconfotograf:{
    marginLeft:'auto',
    marginRight:7
  },
  kaydetbutton:{
    width:127,
    height:44,
    backgroundColor:'#381163',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
  },
});
