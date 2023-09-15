import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
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

export default function SSS() {
  useEffect(() => {
    fetchFonts();
  }, []);


 
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
            <Text style={styles.header}>S.S.S</Text>
        </View>
        <View>
            <Text style={styles.soru}>GApp. Projesi Nedir ve Kim Tarafından Faaliyet Sağlanmaktadır?</Text>
            <Text style={styles.cevap}>GApp. (Gender Application), Kadir Has Üniversitesi Kadın ve Aile Çalışmaları Araştırma Merkezi tarafından yürütülen etkili bir projedir. İstanbul İsveç Başkonsolosluğu tarafından 2023 yılı için desteklenmektedir. 
Proje, cinsiyet eşitsizliği ile mücadele etmeyi ve cinsiyet eşitliğini teşvik etmeyi amaçlamaktadır. Özellikle cinsel ve üreme sağlığı alanına odaklanan projemiz, bir mobil uygulama aracılığıyla erişilebilir, güvenli ve gizli bilgi sağlamayı hedeflemektedir. Araştırma merkezinin uzmanlığını kullanarak ve çeşitli paydaşlarla işbirliği yaparak, GApp. Projesi bireyleri güçlendirmeyi, haklarını savunmayı ve genel anlamda cinsiyet eşitliğinin ilerlemesine katkıda bulunmayı amaçlamaktadır. </Text>
            <Text style={styles.soru}>Nasıl katkı sağlayabilirim?</Text>
            <Text style={styles.cevap}>https://gapp.khas.edu.tr/ adresinden iletişim listemize kaydolabilir veya gender@khas.edu.tr mail adresimiz üzerinden bizimle iletişime geçebilirsiniz. </Text>
            <Text style={styles.soru}>Nasıl geri bildirim gönderebilirim?</Text>
            <Text style={styles.cevap}>Ayarlar bölümünde bulunan “Sorun Bildir” ve “Geri Bildirim” sekmelerini kullanabilir, gender@khas.edu.tr mail adresimiz üzerinden bizimle iletişime geçebilirsiniz. </Text>
            <Text style={styles.soru}>Üyelik oluşturma, hesap açma, şifre değişikliği, unutulan şifre, üyelik iptali işlemlerini nasıl yapabilirim?</Text>
            <Text style={styles.cevap}>Mobil uygulamanın ayarlar panelinde bulunan kanallar sayesinde ilgili işlemleri gerçekleştirebilirsiniz. </Text>
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
    paddingBottom: 205,
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
    marginRight:274
  },
  icerikcontainer:{
    borderBottomWidth:1,
    borderBottomColor:'#DBD9D9',
    margin:10,
    flexDirection:'row',
    padding:5,
  },
  soru:{
    fontFamily:'Raleway ExtraBold',
    color:'#381163',
    fontSize:18,
    marginTop:30

  },
  cevap:{
    fontFamily:'Raleway Medium',
    color:'#381163',
    fontSize:17,
    marginTop:10
  }
});
