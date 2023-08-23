import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import Logo from '../components/Logo';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ogren from './KesfetIcerik/Ogren';
import Bakım from './KesfetIcerik/Bakim';
import Cinsiyet from './KesfetIcerik/Cinsiyet';
import Guvenlik from './KesfetIcerik/Guvenlik';
import Iliski from './KesfetIcerik/Ilıski';
import Planla from './KesfetIcerik/Planla';
import Destek from './KesfetIcerik/Destek';
import Hakkında from './KesfetIcerik/Hakkinda';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon, { Icons } from '../components/Icon';
import AddEvent from './Modals/AddEvent';

import { useNavigation } from '@react-navigation/native';

const fetchFonts = async () => {
  await Font.loadAsync({
    'luckiest-guy': require('../assets/Fonts/LuckiestGuy-Regular.ttf'),
    'HammersmithOne': require('../assets/Fonts/HammersmithOne-Regular.ttf'),
    'Raleway': require('../assets/Fonts/Raleway-Regular.ttf'),
    'SeoulHangang': require('../assets/Fonts/SeoulHangang-Medium.ttf'),
    'FuzzyBubbles': require('../assets/Fonts/FuzzyBubbles-Regular.ttf'),
  });
};


export default function Anasayfa() {
  const navigation = useNavigation();

  useEffect(() => {
    fetchFonts();
  }, []);

  const [username, setUsername] = useState('');

  useEffect(() => {
    async function getUsername() {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        console.log('Alınan kullanıcı adı:', storedUsername);
        setUsername(storedUsername || '');
      } catch (error) {
        console.error('Kullanıcı adı alınırken hata oluştu:', error);
      }
    }
  
    getUsername();
  }, []);

  const labels = {
    'Öğren': {
      screen: Ogren,
      imageSource: require('../assets/ogren.png'),
    },
    'Planla': {
      screen: Planla,
      imageSource: require('../assets/planla.png'),
    },
    'Güvenlik': {
      screen: Guvenlik,
      imageSource: require('../assets/guvenlik.jpg'), 
    },
    'Cinsiyet': {
      screen: Cinsiyet,
      imageSource: require('../assets/cinsiyet.png'), 
    },
    'Ilişki': {
      screen: Iliski,
      imageSource: require('../assets/iliski.png'), 
    },
    'Bakım': {
      screen: Bakım,
      imageSource: require('../assets/bakim.png'), 
    },
    'Destek': {
      screen: Destek,
      imageSource: require('../assets/destek.png'), 
    },
    'Hakkında': {
      screen: Hakkında,
      imageSource: require('../assets/iceriklogo.png'), 
    }
  };

  const groupIntoRows = (array, elementsPerRow) => {
    const result = [];
    for (let i = 0; i < array.length; i += elementsPerRow) {
      result.push(array.slice(i, i + elementsPerRow));
    }
    return result;
  };
  const rows = groupIntoRows(Object.keys(labels), 4);

  const handleLabelPress = (label) => {
    console.log("tıklandı");
  
    navigation.navigate(label);
  };
  
  LocaleConfig.locales['tr'] = {
    monthNames: [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık',
    ],
    monthNamesShort: [
      'Oca',
      'Şub',
      'Mar',
      'Nis',
      'May',
      'Haz',
      'Tem',
      'Ağu',
      'Eyl',
      'Eki',
      'Kas',
      'Ara',
    ],
    dayNames: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi','Pazar'],
    dayNamesShort: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Pz'],
    today: "Bugün", 
  };
  LocaleConfig.defaultLocale = 'tr';

  const [modalVisible, setModalVisible] = useState(false);
  const [etkinlikler, setEtkinlikler] = useState([]); 

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const addEtkinlik = (etkinlikBilgisi) => {
    const { baslangic, bitis } = etkinlikBilgisi;
    console.log('Başlangıç Tarihi:', baslangic);
    console.log('Bitiş Tarihi:', bitis);
    
    // Başlangıç ve bitiş tarihleri arasındaki günleri işaretle
    const tarihler = getDatesBetween(baslangic, bitis);
    const yeniMarkedDates = { ...markedDates };
  
    tarihler.forEach((tarih) => {
      yeniMarkedDates[tarih] = { marked: true, dotColor: 'blue' };
    });
  
    setMarkedDates((prevMarkedDates) => ({
      ...prevMarkedDates,
      ...yeniMarkedDates,
    }));
  
    setEtkinlikler([...etkinlikler, etkinlikBilgisi]);
  };

  const Emojis = ['😹','😼','😻','🙀','😿','😾'];
  const handleEmojiSelect = (selectedEmoji) => {
    Alert.alert("Emojiyi başarıyla seçtiniz!", selectedEmoji);
  };

  const cards = [
    {
      id: '1',
      title: 'GEBELİK SONLANDIRMA İŞLEMİNİN KADINLAR ÜZERİNDE ETKİSİ',
      content: 'Gebelik kürtajı, vakum aspiratör yöntemiyle uygulanır. Bu yöntem, kürtaj için en sık uygulanan yöntemdir ve oldukça güvenlidir. Bu yöntemde plastik enjektör ve plastik ince',
    },
    {
      id: '2',
      title: 'GEBELİK SONLANDIRMA İŞLEMİNİN KADINLAR ÜZERİNDE ETKİSİ',
      content: 'Gebelik kürtajı, vakum aspiratör yöntemiyle uygulanır. Bu yöntem, kürtaj için en sık uygulanan yöntemdir ve oldukça güvenlidir. Bu yöntemde plastik enjektör ve plastik ince',
    },
  ];


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headercontainer}>
        <Text style={styles.header}>ANASAYFA</Text>
        <View style={styles.spacer} />
        <View style={styles.logoContainer}>
          <Logo style={styles.logo} />
        </View>
      </View>
      <Text style={styles.emailText}>
        Hoş geldin, {username || 'Misafir'}!
      </Text>


      <View style={styles.icerikcontainer}>
        <View>
          <TouchableOpacity style={styles.aramabutton}>
            <Image source={require('../assets/search.png')} style={{marginLeft:10}} />
            <Text  style={styles.aramabuttontext}>Arama</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.mottotext}>GÜNLÜK MOTTO</Text>
          <Image source={require('../assets/motto.png')} style={{marginTop:10, width:377, borderRadius:10}} />
        </View>


        <View style={styles.content}>
          <Text style={styles.mottotext}>İÇERİKLER</Text>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((label, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleLabelPress(label)}
                  style={styles.labelButton}
                >
                  <Image source={labels[label].imageSource} style={[styles.labelImage, label === 'Cinsiyet' && styles.specialLabelImage]} />
                  <Text style={{color:'white', fontFamily:'SeoulHangang'}}>{label}</Text>

                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>


        <View style={styles.content}>
          <Calendar
            renderHeader={(date) => {
              const month = date.toString('MMMM yyyy');
              return (
                <TouchableOpacity style={[styles.takvimbutton, style={marginTop:20}]}>
                  <Text style={styles.takvimbuttontext}>{month}</Text>
                  <TouchableOpacity  onPress={openModal}>
                    <Icon type={Icons.AntDesign} name="plus" size={20} color="#381163" style={styles.icontakvim}  />
                  </TouchableOpacity>
                  <AddEvent visible={modalVisible} onClose={closeModal} addEtkinlik={addEtkinlik} />
                  <Image source={require('../assets/search.png')} style={{marginLeft:10}} />
                </TouchableOpacity>
              );
            }}
            hideArrows={true}
            hideExtraDays={true}
            hideDayNames={true}
            theme={{
              textDayFontFamily: 'Raleway',
              textMonthFontFamily: 'Raleway', 
              textDayHeaderFontFamily: 'Raleway',
              textDayFontSize:20,
              textDayHeaderFontSize:20,
            }}
          />
        </View>
       
        <View style={[styles.content, style={alignItems:'center'}]}>
          <View style={{backgroundColor:'#CCB8F8A1', marginTop:20,marginBottom:20, borderRadius:20, padding:10, width:'90%'}}>
            <Text style={{fontFamily:'FuzzyBubbles', textAlign:'center', fontSize:20, color:'#381163', marginTop:8}}>Bugün nasıl hissediyorsun ?</Text>            
            <View style={{flexDirection:'row', justifyContent:'center'}}>
              {Emojis.map((emoji) => (
                  <TouchableOpacity key={emoji} onPress={() => handleEmojiSelect(emoji)}>
                    <Text style={{ fontSize: 30, margin:7}}>{emoji}</Text>
                  </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.mottotext}>UZMANLAR NE DİYOR</Text>
          <Text style={StyleSheet.compose(styles.mottotext, { fontSize: 20 })}>Bugün yeni ne var ?</Text>
          <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>
          {cards.map((item) => (
            <View style={styles.card} key={item.id}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.paragraph}>{item.content}</Text>
              <Icon type={Icons.MaterialCommunityIcons} name="arrow-right" size={25} color="#8547D1" style={styles.icon} />
            </View>
          ))}
        </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    fontFamily: 'Raleway',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 345,
  },
  content:{
    marginTop:25
  },
  header: {
    color: '#1E1E1E',
    fontFamily: 'Raleway',
    fontSize: 40,
    marginTop: -100,
  },
  headercontainer: {
    height: '20%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logoContainer: {
    marginLeft: 'auto',
    marginRight: 0,
    marginTop: -128,

  },
  logo: {
    width: 100,
    height: 100,
  },
  emailText:{
    fontFamily:'Raleway',
    fontSize:18,
    marginTop: -160,
    color:'#636363'
  },
  icerikcontainer:{
    marginTop:40
  },
  aramabutton: {
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#E9E9E9A3',
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20
  },
  aramabuttontext:{
    marginLeft:10,
    fontFamily:'Raleway',
    fontSize:18,
    color:'#666567'
  },
  mottotext:{
    fontSize:30,
    fontFamily:'Raleway',
    color:'#7A7A7A'
  },
  labelButton: {
    width: 85, // Adjust the width as needed
    height: 85,
    backgroundColor: '#381163',
    marginTop: 7,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  takvimbutton: {
    backgroundColor: '#E9E9E9',
    padding: 15,
    borderRadius: 25,
    justifyContent: 'center',
    elevation: 3,
    width: 350,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icontakvim:{
    marginLeft:160
  },
  takvimbuttontext: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Raleway',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    marginTop: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    width: 300, 
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Raleway'
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 15,
    marginBottom: 10,
    fontFamily: 'Raleway'
  },
  icon: {
    marginLeft: 'auto',
  },
  labelImage:{
    width:50,
    height:50,
    marginBottom:3
  },
  specialLabelImage:{
    width:30,
    height:30,
    marginBottom:10,
    marginTop:13
  },
});
