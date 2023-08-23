import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../components/Logo';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import Icon, { Icons } from '../components/Icon';
import Ogren from './KesfetIcerik/Ogren';
import Bakım from './KesfetIcerik/Bakim';
import Cinsiyet from './KesfetIcerik/Cinsiyet';
import Guvenlik from './KesfetIcerik/Guvenlik';
import Iliski from './KesfetIcerik/Ilıski';
import Planla from './KesfetIcerik/Planla';
import Destek from './KesfetIcerik/Destek';
import Hakkında from './KesfetIcerik/Hakkinda';

import { useNavigation } from '@react-navigation/native';

const fetchFonts = async () => {
  await Font.loadAsync({
    'SeoulHangang': require('../assets/Fonts/SeoulHangang-Medium.ttf'),
    'Raleway': require('../assets/Fonts/Raleway-Regular.ttf'),
    'FuzzyBubbles': require('../assets/Fonts/FuzzyBubbles-Regular.ttf'),
  });
};

export default function Kesfet() {
  const navigation = useNavigation();

  useEffect(() => {
    fetchFonts();
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
  const handleLabelPress = (label) => {
    console.log("tıklandı");
  
    navigation.navigate(label);
  };
  const groupIntoRows = (array, elementsPerRow) => {
    const result = [];
    for (let i = 0; i < array.length; i += elementsPerRow) {
      result.push(array.slice(i, i + elementsPerRow));
    }
    return result;
  };

  const rows = groupIntoRows(Object.keys(labels), 4);

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
        <Text style={styles.header}>KEŞFET</Text>
        <View style={styles.spacer} />
        <View style={styles.logoContainer}>
          <Logo style={styles.logo} />
        </View>
      </View>
      <Text style={styles.icerikheader}>İÇERİKLER</Text>
        <View style={styles.icerikcontainer}>
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
        <View>
          <Text style={StyleSheet.compose(styles.icerikheader, { marginTop: 30 })}>UZMANLAR ANLATIYOR</Text>
          <Text style={StyleSheet.compose(styles.icerikheader, { fontSize: 20 })}>Bugün yeni ne var ?</Text>
        </View>
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
  logoContainer: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  logo: {
    width: 100,
    height: 100,
  },
  icerikcontainer: {
    marginTop: 20,
  },
  icerikheader: {
    fontFamily: 'Raleway',
    fontSize: 30,
    color: '#7A7A7A',
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
    width: 300, // Kart genişliği, ihtiyaca göre ayarlayın
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
