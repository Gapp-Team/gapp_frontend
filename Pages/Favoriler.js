import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Logo from '../components/Logo';
import { ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';

const fetchFonts = async () => {
  await Font.loadAsync({
    'Raleway': require('../assets/Fonts/Raleway-Regular.ttf'),
    'Raleway ExtraBold': require('../assets/Fonts/Raleway-ExtraBold.ttf'),
    'Raleway Medium': require('../assets/Fonts/Raleway-MediumItalic.ttf'),
  });
};

export default function Favoriler() {
  useEffect(() => {
    fetchFonts();
  }, []);

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const favoriteCards = [
    {
      id: 1,
      title: 'GEBELİK SONLANDIRMA İŞLEMİNİN KADINLAR ÜZERİNDE ETKİSİ',
      description: 'Gebelik kürtajı, vakum aspiratör yöntemiyle uygulanır. Bu yöntem, kürtaj için en sık uygulanan yöntemdir ve oldukça güvenlidir. Bu yöntemde plastik enjektör ve plastik ince ',
    },
    {
      id: 2,
      title: 'GEBELİK SONLANDIRMA İŞLEMİNİN KADINLAR ÜZERİNDE ETKİSİ',
      description: 'Gebelik kürtajı, vakum aspiratör yöntemiyle uygulanır. Bu yöntem, kürtaj için en sık uygulanan yöntemdir ve oldukça güvenlidir. Bu yöntemde plastik enjektör ve plastik ince ',
    },
    {
      id: 3,
      title: 'GEBELİK SONLANDIRMA İŞLEMİNİN KADINLAR ÜZERİNDE ETKİSİ',
      description: 'Gebelik kürtajı, vakum aspiratör yöntemiyle uygulanır. Bu yöntem, kürtaj için en sık uygulanan yöntemdir ve oldukça güvenlidir. Bu yöntemde plastik enjektör ve plastik ince ',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headercontainer}>
        <Text style={styles.header}>FAVORİLER</Text>
        <View style={styles.spacer} />
        <View style={styles.logoContainer}>
          <Logo style={styles.logo} />
        </View>
      </View>
      <View style={styles.cardContainer}>
        {favoriteCards.map((card) => (
          <TouchableOpacity key={card.id} style={styles.card}>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardDescription}>{card.description}</Text>
            <TouchableOpacity onPress={toggleFavorite}>
           <Image
             source={isFavorite ? require('../assets/outlinekalp.png') : require('../assets/filledkalp.png')}
             style={styles.imagemodal}
           />
         </TouchableOpacity>
          </TouchableOpacity>
          
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
    color: '#1E1E1E',
    fontFamily: 'Raleway',
    fontSize: 40,
    marginTop: 50,
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
  cardContainer: {
    marginTop: 10,
    alignItems:'center'
  },
  card: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    width: '80%',
    height: '32%',
    backgroundColor: '#e4d9fc',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily:'Raleway',
    marginBottom: 8,
    marginTop:-20
  },
  cardDescription: {
    fontSize: 12,
    fontFamily:'Raleway',

  },
  imagemodal:{
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:20,
    marginBottom:-30,
    width:40,
    height:40
  }
});
