import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av'; // Expo Video bileşenini içe aktarın
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

export default function GeriBildirim() {
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
    navigation.goBack(); // Ayarlar sayfasına geri dön
  };
  
  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert('Fotoğraf erişimi izni verilmedi.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync();
  
    if (!result.cancelled) {
      // Seçilen fotoğrafı kullanmak için burada işlem yapabilirsiniz.
      console.log(result.uri);
      // Seçilen fotoğrafın uri'sini state veya bir başka değişken üzerinde saklayabilirsiniz.
    }
  };

  const [rating, setRating] = useState(0); // Puanı burada saklayın
  const handleRating = (value) => {
    // Yıldızlara tıklanınca puanı ayarlayın
    setRating(value);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.headercontainer}>
            <TouchableOpacity onPress={goBackToAyarlar}>
                <Icon type={Icons.AntDesign} name="left" size={28} color="black" style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.header}>GERİ BİLDİRİM</Text>
        </View>
        <View style={styles.logoContainer}>
            <Text style={{textAlign:'center', marginTop:70, fontFamily:'Raleway ExtraBold', color:'#381163' ,fontSize: 25, marginBottom:45}}>LÜTFEN DENEYİMİNİZİ BİZİMLE PAYLAŞIN VE İYİLEŞTİRMEK İÇİN YAPABİLECEĞİMİZ BİR ŞEY VARSA BİZE BİLDİRİN</Text>
        </View> 
        <View horizontal style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity key={value} onPress={() => handleRating(value)}>
                <Icon
                    type={Icons.FontAwesome}
                    name={rating >= value ? 'star' : 'star-o'}
                    size={55}
                    color={rating >= value ? '#FFD700' : '#D3D3D3'}
                    style={{margin:10}}
                />
                </TouchableOpacity>
            ))}
        </View>

        <View style={{alignItems:'center'}}>
           
            <View style={{borderWidth:1, width:'90%', height:'55%', backgroundColor:'#E9E9E980', borderColor:'#D2D2D2'}}>
                <View style={styles.icerikcontainer}>
                    <Text style={styles.iceriktext}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email Adresinizi girin"
                        underlineColorAndroid="transparent"
                        value={email} // input değeri state'ten gelir
                        onChangeText={text => setEmail(text)}
                    />
                </View>
                <View style={styles.icerikcontainer}>
                    <Text style={styles.iceriktext}>Konu</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Konu girin"
                        underlineColorAndroid="transparent"
                        value={konu} // input değeri state'ten gelir
                        onChangeText={text => setKonu(text)}
                    />
                </View>
                <View style={styles.icerikcontainer}>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Açıklama girin"
                        multiline={true}
                        numberOfLines={4} // İstediğiniz satır sayısını belirleyebilirsiniz
                        underlineColorAndroid="transparent"
                        value={metinAlani}
                        onChangeText={text => setMetinAlani(text)}
                    />
                </View>
            </View>
        </View>
        <View style={styles.buttoncontainer}>
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
    marginRight:136
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
    marginTop:-150
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
  ratingContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    marginBottom:50
  },
});
