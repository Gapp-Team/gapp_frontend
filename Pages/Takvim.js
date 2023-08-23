import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList } from 'react-native';
import Logo from '../components/Logo';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon, { Icons } from '../components/Icon';
import AddEvent from './Modals/AddEvent';
import RNPickerSelect from 'react-native-picker-select';


const fetchFonts = async () => {
  await Font.loadAsync({
    'luckiest-guy': require('../assets/Fonts/LuckiestGuy-Regular.ttf'),
    'HammersmithOne': require('../assets/Fonts/HammersmithOne-Regular.ttf'),
    'Raleway': require('../assets/Fonts/Raleway-Regular.ttf'),
  });
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



export default function Takvim() {
  const [modalVisible, setModalVisible] = useState(false);
  const [etkinlikler, setEtkinlikler] = useState([]); 
  const [markedDates, setMarkedDates] = useState({});

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();


  const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString());
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());



  const addEtkinlik = (etkinlikBilgisi) => {
    const { baslangicTarih, bitisTarih } = etkinlikBilgisi;
    console.log('Başlangıç Tarihi:', baslangicTarih);
    console.log('Bitiş Tarihi:', bitisTarih);
    const baslangicSaatDakika = baslangicTarih.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    const baslangicGunAy = baslangicTarih.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' });
    
    const bitisSaatDakika = bitisTarih.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    const bitisGunAy = bitisTarih.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' });
    
  
    const updatedEtkinlik = {
      ...etkinlikBilgisi,
      baslangicSaatDakika,
      baslangicGunAy,
      bitisSaatDakika,
      bitisGunAy,
    };
  
    setEtkinlikler([...etkinlikler, updatedEtkinlik]);

    const currentDate = new Date(baslangicGunAy);
    const markedDatesCopy = { ...markedDates };
    while (currentDate <= new Date(bitisGunAy)) {
      const formattedDate = currentDate.toISOString().split('T')[0];
      markedDatesCopy[formattedDate] = { underlayColor: 'red', textDecorationLine: 'underline' };
      currentDate.setDate(currentDate.getDate() + 1); // Bir sonraki güne geçin
    }
    console.log(markedDates);
    setMarkedDates(markedDatesCopy);
  };

  
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    fetchFonts();
  }, []);


  const monthOptions = [
    { label: 'OCAK', value: '1' },
    { label: 'ŞUBAT', value: '2' },
    { label: 'MART', value: '3' },
    { label: 'NİSAN', value: '4' },
    { label: 'MAYIS', value: '5' },
    { label: 'HAZİRAN', value: '6' },
    { label: 'TEMMUZ', value: '7' },
    { label: 'AĞUSTOS', value: '8' },
    { label: 'EYLÜL', value: '9' },
    { label: 'EKİM', value: '10' },
    { label: 'KASIM', value: '11' },
    { label: 'ARALIK', value: '12' },
  ];
  const yearOptions = [
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
    // Diğer yılları da ekleyin
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headercontainer}>
        <Text style={styles.header}>TAKVİM</Text>
        <View style={styles.spacer} />
        <View style={styles.logoContainer}>
          <Logo style={styles.logo} />
        </View>
      </View>
      <Calendar
        renderHeader={(date) => {        
          const openDatePicker = () => {
            setShowDatePicker(true);
          };
        
          const onDateChange = (event, selectedDate) => {
            const currentDate = selectedDate || new Date();
            setSelectedMonth(currentDate.getMonth() + 1);
            setSelectedYear(currentDate.getFullYear());
            setShowDatePicker(false);
          };
        
          return (
            <View>
              <View style={styles.takvimbutton}> 
                <View style={{marginTop:2, flexDirection:'row'}}>
                  <View style={{marginRight:10}}>
                    <RNPickerSelect
                    placeholder={{ label: 'Ay Seçin', value: null }}
                    onValueChange={(value) => setSelectedMonth(value)}
                    items={monthOptions}
                    value={selectedMonth}
                    textInputProps={{ style: { fontFamily: 'Raleway', fontSize: 20, color:'#381163' } }}
                  />
                  </View>
                  <View>
                    <RNPickerSelect
                    placeholder={{ label: 'Yıl Seçin', value: null }}
                    onValueChange={(value) => setSelectedYear(value)}
                    items={yearOptions}
                    value={selectedYear}
                    style={{fontFamily:'Raleway', fontSize:20}}
                    textInputProps={{ style: { fontFamily: 'Raleway', fontSize: 20, color:'#381163' } }}
                  />
                  </View>
                  
                </View>
                <View style={{marginRight:'-20%'}}>
                  <TouchableOpacity onPress={openModal}>
                    <Icon type={Icons.AntDesign} name="plus" size={20} color="#381163" style={styles.icon} />
                  </TouchableOpacity>
                </View>
                <AddEvent visible={modalVisible} onClose={closeModal} addEtkinlik={addEtkinlik} />
                <View>
                  <Image source={require('../assets/search.png')}/>
                </View>
              </View>
            </View>
          );
        }}
        
        hideArrows={true}
        theme={{
          textDayFontFamily: 'Raleway', 
          textMonthFontFamily: 'Raleway',
          textDayHeaderFontFamily: 'Raleway',
          textDayFontSize:20,
          textDayHeaderFontSize:20,
        }}
        markedDates={markedDates}

      />
      <View style={styles.yaklasanetcontainer}>
        <Text style={styles.yaklasanettext}>YAKLAŞAN ETKİNLİKLER</Text>
        {etkinlikler.length === 0 ? (
          <View style={styles.noEtkinlik}>
            <Text style={styles.noEtkinlikText}>Şu anda bir etkinlik yok</Text>
          </View>
        ) : (
          etkinlikler.map((etkinlik, index) => {
            const selectedColorDark = lightenOrDarkenColor(etkinlik.selectedColor, -99);

            function lightenOrDarkenColor(color, percent) {
              console.log('color:', color);
              console.log('percent:', percent);
              if (typeof color !== 'string' || !color.match(/^#[0-9A-Fa-f]{6}$/)) {
                return color; 
              }
            
              let R = parseInt(color.slice(1, 3), 16);
              let G = parseInt(color.slice(3, 5), 16);
              let B = parseInt(color.slice(5, 7), 16);
            
              R = Math.min(255, Math.max(0, R + (R * percent) / 100));
              G = Math.min(255, Math.max(0, G + (G * percent) / 100));
              B = Math.min(255, Math.max(0, B + (B * percent) / 100));
            
              return `#${R.toString(16).padStart(2, '0')}${G.toString(16).padStart(2, '0')}${B.toString(16).padStart(2, '0')}`;
            }
            return (
              <View style={styles.cardContainer} key={index}>
                <View style={[styles.card, { backgroundColor: etkinlik.selectedColor, borderBottomColor: selectedColorDark, borderBottomWidth:4 }]}>
                  <View style={styles.leftColumn}>
                    <Text style={styles.cardText}>{etkinlik.aciklama}</Text>
                  </View>
                  <View style={styles.rightColumn}>
                    <Text style={styles.cardText}>{etkinlik.baslik}</Text>
                    <Text style={styles.cardText}>{etkinlik.baslangicGunAy} {etkinlik.baslangicSaatDakika} - {etkinlik.bitisGunAy} {etkinlik.bitisSaatDakika} {etkinlik.konum}</Text>
                  </View>
                  <View style={styles.right2Column}>
                    <Image source={require('../assets/etksilme.png')} style={{ marginLeft: 'auto', width: 30, height: 30 }} />
                  </View>
                </View>
              </View>
            );
            })
        )}
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
    paddingBottom: 125,
  },
  header: {
    color: '#1E1E1E',
    fontFamily: 'Raleway',
    fontSize: 40,
    marginTop: 40,
    marginTop:46,

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
    marginTop:10
  },
  logo: {
    width: 100,
    height: 100,
  },
  takvimbutton: {
    backgroundColor: '#E9E9E9',
    padding: 15,
    borderRadius: 25,
    width: 350,
    marginBottom:30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:20
  },
  icon:{
    marginLeft:60
  },
  takvimbuttontext: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Raleway',
  },
  yaklasanetcontainer:{
    marginTop:33
  },
  yaklasanettext:{
    fontSize: 30,
  },
  cardContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  card: {
    flexDirection: 'row', 
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    height:65
  },
  leftColumn: {
    flex: 0.3, 
    borderRightWidth: 1,
    borderRightColor: '#000', 
    flexDirection: 'column', 
    justifyContent:'center',
    paddingRight:10
  },
  rightColumn: {
    flex: 2, 
    flexDirection: 'column', 
    justifyContent:'center',
    paddingLeft:10

  },
  cardText: {
    fontSize: 12,
    fontFamily: 'Raleway',
  },
  right2Column:{
    flex:1,
    justifyContent: 'center'

  },
  noEtkinlik:{
   
    justifyContent:'center',
    alignItems:'center'
  },
  noEtkinlikText:{
    fontSize: 15,
    fontFamily: 'Raleway',
    marginTop:20
  }
});
