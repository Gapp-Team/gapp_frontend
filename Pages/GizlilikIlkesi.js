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

export default function GizlilikIlkesi() {
  useEffect(() => {
    fetchFonts();
  }, []);


 
  const navigation = useNavigation();

  const goBackToAyarlar = () => {
    navigation.goBack(); // Ayarlar sayfasına geri dön
  };

  const [acikSoru, setAcikSoru] = useState(null); // Açık sorunun indeksi

  const sorularVeCevaplar = [
    {
      soru: '1. Kişisel Verilerin İşlenmesi Aydınlatma Metni',
      cevap: 'Cevap.',
    },
    {
      soru: '2. Kişisel Verileri İşlemek İçin',
      cevap: 'Cevap.',
    },
    {
      soru: '3. Toplanan Kişisel Veri Kategorilerin',
      cevap: 'Cevap.',
    },
    {
      soru: '4. Kişisel Verilerinizi Alabilecek Alıcılar/Alıcı Kategorileri',
      cevap: 'Cevap.',
    },
    {
      soru: '5. Kişisel Verilerin Transferi',
      cevap: 'Kadir Has Üniversitesi ile aranızdaki bir sözleşmenin ifası için gerektiğinde veya Kadir Has Üniversitesi’nin bu tür bir transfere açık rızanızı alması durumunda GDPR sağladığınız kişisel verilerin Avrupa Birliği veya dışındaki ülkelere aktarımına izin verir.',
    },
    {
      soru: '6. Kişisel Verileriniz Ne Kadar Süre Saklanacak?',
      cevap: 'Cevap.',
    },
    {
      soru: '7. Kişisel Veri Sağlamak Zorunda mısınız?',
      cevap: 'Cevap.',
    },
    {
      soru: '8. Bilgi Güvenliği',
      cevap: 'Cevap.',
    },
  ];

  const toggleCevap = (soruIndex) => {
    if (acikSoru === soruIndex) {
      setAcikSoru(null); // Soru zaten açıksa kapat
    } else {
      setAcikSoru(soruIndex); // Soruyu aç
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.headercontainer}>
            <TouchableOpacity onPress={goBackToAyarlar}>
                <Icon type={Icons.AntDesign} name="left" size={28} color="black" style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.header}>GİZLİLİK İLKESİ</Text>
        </View>
        <View>
          {sorularVeCevaplar.map((soruCevap, index) => (
            <View key={index} style={{
              borderBottomWidth:1,
              borderBottomColor:'#381163'}}>
              <TouchableOpacity
                style={styles.sorusekme}
                onPress={() => toggleCevap(index)}
              >
                <Text style={styles.soru}>{soruCevap.soru}</Text>
                <Icon
                  type={Icons.Entypo}
                  name={acikSoru === index ? 'minus' : 'plus'}
                  size={30}
                  color="#381163"
                  style={styles.iconicerik}
                />
              </TouchableOpacity>
              {acikSoru === index && (
                <View>
                  <Text style={styles.cevap}>{soruCevap.cevap}</Text>
                </View>
              )}
            </View>
          ))}
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
    marginBottom:-30
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
    marginRight:125
  },
  icerikcontainer:{
    borderBottomWidth:1,
    borderBottomColor:'#DBD9D9',
    margin:10,
    flexDirection:'row',
    padding:5,
  },
  sorusekme:{
    flexDirection:'row',
  },
  soru:{
    fontFamily:'Raleway ExtraBold',
    color:'#381163',
    fontSize:18,
    marginTop:30,
    width:'90%',
    marginBottom:15
  },
  cevap:{
    fontFamily:'Raleway Medium',
    color:'#381163',
    fontSize:17,
    marginTop:10,
    marginBottom:20
  },
  iconicerik:{
    marginLeft:'auto',
    marginTop:'auto',
    marginBottom:'auto',
    fontFamily:'Raleway ExtraBold',

  }
});
