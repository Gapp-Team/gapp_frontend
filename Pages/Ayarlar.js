import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, Modal, FlatList } from 'react-native'; 
import Logo from '../components/Logo';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import Icon, { Icons } from '../components/Icon';
import { useNavigation } from '@react-navigation/native'; 


const fetchFonts = async () => {
  await Font.loadAsync({
    'Raleway': require('../assets/Fonts/Raleway-Regular.ttf'),
  });
};

export default function Ayarlar() {
  const [bildirimAcik, setBildirimAcik] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false); 

  const diller = [
    { id: 1, name: 'Türkçe' },
    { id: 2, name: 'İngilizce' },
    { id: 3, name: 'İspanyolca' },
    { id: 4, name: 'Fransızca' },
    { id: 5, name: 'Almanca' },
  ];

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsLanguageModalVisible(false);
  };

  const toggleLanguageModal = () => {
    setIsLanguageModalVisible(!isLanguageModalVisible);
  };

  useEffect(() => {
    fetchFonts();
  }, []);

  const navigation = useNavigation();

  const goToHesapBilgileri = () => {
    navigation.navigate('HesapBilgileri'); 
  };

  const goToSorunBildir = () =>{
    navigation.navigate('SorunBildir');
  }
  const goToGeriBildirim = () =>{
    navigation.navigate('GeriBildirim');
  }
  const goToSSS = () =>{
    navigation.navigate('SSS');
  }
  const goToGizlilikIlkesi = () =>{
    navigation.navigate('GizlilikIlkesi');
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headercontainer}>
        <Text style={styles.header}>AYARLAR</Text>
        <View style={styles.spacer} />
        <View style={styles.logoContainer}>
          <Logo style={styles.logo} />
        </View>
      </View>
      <View style={styles.ayarlarcontainer}>
        <View style={styles.hesapbilgilericontainer}>
          <Text style={styles.hesapbilgileritext}>Hesap</Text>
        </View>
        <TouchableOpacity style={styles.hesapbilgileri} onPress={goToHesapBilgileri}>
          <Image source={require('../assets/hesapbilgileri.png')} style={styles.hesapbilgileriImage} />
          <Text style={styles.hesapbilgilerito}>Hesap Bilgileri</Text>
          <Icon type={Icons.AntDesign} name="right" size={20} color="#381163" style={styles.icon} />
        </TouchableOpacity>
        <View style={[styles.hesapbilgilericontainer, { marginTop: '6%' }]}>
          <Text style={styles.hesapbilgileritext}>Erişebilirlik Ekran ve Diller</Text>
        </View>
        <TouchableOpacity style={styles.hesapbilgileri}  onPress={toggleLanguageModal}>
          <Image source={require('../assets/dilbilgileri.png')} style={styles.hesapbilgileriImage} />
          <Text style={styles.hesapbilgilerito}>Tercih Edilen Dil</Text>
          <Text style={[styles.hesapbilgilerito, style={margin:'auto',marginLeft:'13%'}]}>{selectedLanguage}</Text>
          <Icon type={Icons.AntDesign} name="right" size={20} color="#381163" style={styles.icon} />
        </TouchableOpacity>
        <View style={[styles.hesapbilgilericontainer, { marginTop: '6%' }]}>
          <Text style={styles.hesapbilgileritext}>Bildirimler</Text>
        </View>
        <View style={styles.hesapbilgileri}>
          <Image source={require('../assets/bildirim.png')} style={styles.hesapbilgileriImage} />
          <Text style={styles.hesapbilgilerito}>Bildirimleri Aç / Kapa</Text>      
          <Switch
            value={bildirimAcik}
            onValueChange={(newValue) => setBildirimAcik(newValue)}
            trackColor={{ false: '#381163', true: '#381163' }} 
            thumbColor={bildirimAcik ? '#CA91F6' : '#381163'} 
            style={styles.toggle}
          />
        </View>
        <View  style={[styles.hesapbilgilericontainer, { marginTop: '6%' }]}>
          <Text style={styles.hesapbilgileritext}>Yardım & Destek</Text>
        </View>
        <TouchableOpacity style={styles.hesapbilgileri} onPress={goToSorunBildir}>
          <Image source={require('../assets/sorunbildir.png')} style={styles.hesapbilgileriImage} />
          <Text style={styles.hesapbilgilerito}>Sorun Bildir</Text>
          <Icon type={Icons.AntDesign} name="right" size={20} color="#381163" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.hesapbilgileri} onPress={goToGeriBildirim}>
          <Image source={require('../assets/geribildirim.png')} style={styles.hesapbilgileriImage} />
          <Text style={styles.hesapbilgilerito}>Geri Bildirim</Text>
          <Icon type={Icons.AntDesign} name="right" size={20} color="#381163" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.hesapbilgileri} onPress={goToSSS}>
          <Image source={require('../assets/sss.png')} style={styles.hesapbilgileriImage} />
          <Text style={styles.hesapbilgilerito}>Sıkça Sorulan Sorular</Text>
          <Icon type={Icons.AntDesign} name="right" size={20} color="#381163" style={styles.icon} />
        </TouchableOpacity>
        <View  style={[styles.hesapbilgilericontainer, { marginTop: '6%' }]}>
          <Text style={styles.hesapbilgileritext}>Hakkında</Text>
        </View>
        <TouchableOpacity style={styles.hesapbilgileri} onPress={goToGizlilikIlkesi}>
          <Image source={require('../assets/gizlilik.png')} style={styles.hesapbilgileriImage} />
          <Text style={styles.hesapbilgilerito}>Gizlilik İlkesi</Text>
          <Icon type={Icons.AntDesign} name="right" size={20} color="#381163" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cikisbutton}>
          <Text style={styles.cikisbuttontext}>Oturumu Kapat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.hesapsilbutton}>
          <Text style={styles.hesapsilbuttontext}>Hesabı Sil</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLanguageModalVisible}
        onRequestClose={() => {
          setIsLanguageModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.languageModal}>
            <Text style={styles.modalTitle}>Tercih Edilen Dil</Text>
            <FlatList
              data={diller}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.languageOption}
                  onPress={() => handleLanguageChange(item.name)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setIsLanguageModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    fontFamily: 'Raleway',
    marginTop:-27
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 125, 
  },
  header: {
    color: '#1E1E1E',
    fontFamily: 'Raleway',
    fontSize: 40,
    marginTop: 40,
  },
  headercontainer: {
    height: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ayarlarcontainer: {},
  hesapbilgilericontainer: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 5,
  },
  hesapbilgileri: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoContainer: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  logo: {
    width: 100,
    height: 100,
  },
  spacer: {
    flex: 1,
  },
  hesapbilgileritext: {
    fontSize: 20,
    color: '#381163',
  },
  hesapbilgileriImage: {
    width: 34,
    height: 34,
  },
  hesapbilgilerito: {
    fontSize: 20,
    color: '#381163',
    marginLeft: 10,
  },
  icon: {
    marginLeft: 'auto',
  },
  toggle: {
    marginLeft: 'auto',
  },
  cikisbutton:{
    backgroundColor:'#CCB8F8',
    marginTop:'15%',
    height: 40,
    justifyContent:'center',
    borderColor:'#381163',
    borderWidth: 1,
    borderRadius:5,

  },
  cikisbuttontext:{
    fontSize:20,
    paddingLeft:20,
    color:'#381163'
  },
  hesapsilbutton:{
    backgroundColor:'#381163',
    marginTop:'5%',
    height: 40,
    justifyContent:'center',
    borderColor:'#381163',
    borderWidth: 1,
    borderRadius:5,
  },
  hesapsilbuttontext:{
    fontSize:20,
    paddingLeft:20,
    color:'white'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageModal: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  languageOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeModalButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeModalButtonText: {
    fontSize: 18,
    color: 'blue',
  },
});
