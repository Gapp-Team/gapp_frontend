import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Logo from '../components/Logo';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchFonts = async () => {
  await Font.loadAsync({
    'Raleway': require('../assets/Fonts/Raleway-Regular.ttf'),
    'Raleway ExtraBold': require('../assets/Fonts/Raleway-ExtraBold.ttf'),
    'Raleway Medium': require('../assets/Fonts/Raleway-MediumItalic.ttf'),
  });
};

export default function Favoriler() {
  const [favoritedItems, setFavoritedItems] = useState([]);

  useEffect(() => {
    fetchFonts();
    fetchFavorites();
  }, [favoritedItems]);

  const fetchFavorites = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem('favorites');
      if (favoritesString) {
        const favoritesArray = JSON.parse(favoritesString);
        setFavoritedItems(favoritesArray);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const toggleFavorite = async (_id) => {
    try {
      const favoritesString = await AsyncStorage.getItem('favorites');
      if (!favoritesString) {
        return; 
      }
  
      const favoritesArray = JSON.parse(favoritesString);
  
      const indexToRemove = favoritesArray.findIndex((item) => item._id === _id);
  
      if (indexToRemove !== -1) {
        favoritesArray.splice(indexToRemove, 1);
  
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  
        setFavoritedItems([...favoritesArray]);
      }  
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  

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
        {favoritedItems.map((item) => (
          <TouchableOpacity key={item._id}>
            <View style={styles.card} key={item._id}>
            <Text style={styles.cardTitle}>{item.title.toUpperCase()}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <TouchableOpacity  onPress={() => toggleFavorite(item._id)}>
              <Image
                source={require('../assets/filledkalp.png')}
                style={styles.imagemodal}
              />
            </TouchableOpacity>
             
            </View>
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
  },
  header: {
    color: '#1E1E1E',
    fontFamily: 'Raleway',
    fontSize: 40,
    marginTop: 50,
  },
  headercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop:-30
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
    alignItems:'center'
  },
  card: { 
    borderRadius: 10,
    marginBottom: 16,
    width: 300,
    height:250,
    backgroundColor: '#e4d9fc',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    shadowRadius: 2.84,
    paddingTop:70,
    paddingBottom:70,
    paddingLeft:40,
    paddingRight:40,
    marginTop:15
  },
  cardTitle: {
    fontSize: 18,
    fontFamily:'Raleway',
    marginBottom: 8,
    marginTop:20
  },
  cardDescription: {
    fontSize: 12,
    fontFamily:'Raleway',

  },
  imagemodal:{
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:20,
    width:40,
    height:40,
    marginBottom:20
  }
});
