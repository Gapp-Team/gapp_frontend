import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, Linking } from 'react-native';
import Logo from '../components/Logo';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import Icon, { Icons } from '../components/Icon';
import { getAllCategories, getAllProducts, getProductsById } from '../request/main';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsid, setProductsId] = useState([]);
  const [modals, setModals] = useState(false);
  const [productDetails, setProductDetails] = useState(null); 
  const [filledHeart, setFilledHeart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchFonts();

    
  }, []);

  
  const handleLabelPress = (id) => {
    console.log("tıklandı");
    navigation.navigate("IcerikDetay", { id: id });
  };
  
  
  const groupIntoRows = (array, elementsPerRow) => {
    const result = [];
    for (let i = 0; i < array.length; i += elementsPerRow) {
      result.push(array.slice(i, i + elementsPerRow));
    }
    return result;
  };


  useEffect(() => {
    getAllCategories().then((res) => {
        setCategories(res)
    })

    getAllProducts().then((res) =>(
      setProducts(res)
    ))

    getProductsById().then((res) =>{
      if (res.status == 404) {
        setError("No products found for this id")
        setProductDetails(null);
    } else {
      setProductDetails(res)
        setError("");
    }
    })
  }, []);


  const openCardModal = async (productId) => {
    try {
      const productDetails = await getProductsById(productId);
      setProductDetails(productDetails);
      setModals(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  

  const closeCardModal = () => {
    setModals(false);
  };
  const handleAddToFavorites = async (_id) => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      const favorites = existingFavorites ? JSON.parse(existingFavorites) : [];
  
      const isAlreadyInFavorites = favorites.some(
        (fav) => fav._id === productDetails.product._id
      );
  
      if (!isAlreadyInFavorites) {
        favorites.push({
          _id: productDetails.product._id,
          title: productDetails.product.title,
          author: productDetails.product.author,
          date: productDetails.product.date,
          description: productDetails.product.description,
        });
  
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  
        console.log('Product added to favorites');
        setFilledHeart(true);

      } else {
        setIsFavorite(false);
        setFilledHeart(false);

        const updatedFavorites = favorites.filter((fav) => fav._id !== productDetails.product._id);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  
        console.log('Product removed from favorites');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };
  
  const renderTextWithLinks = (text) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(linkRegex);

    return parts.map((part, index) => {
      if (linkRegex.test(part)) {
        return (
          <Text key={index} style={styles.linkText} onPress={() => handleLinkPress(part)}>
            {part}
          </Text>
        );
      }
      return <Text key={index}>{part}</Text>;
    });
  };

  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  const formatDateString = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', options);
  };

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
        {groupIntoRows(categories, 4).map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((category) => (
              <TouchableOpacity
                key={category._id}
                onPress={() => handleLabelPress(category._id)}
                style={styles.labelButton}
              >
             <Image
                    source={{ uri: category.imageUrl }}
                    style={styles.labelImage}
                  />
                <Text style={{ color: 'white', fontFamily: 'SeoulHangang', padding:5 }}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View>
          <Text style={StyleSheet.compose(styles.icerikheader, { marginTop: 30 })}>UZMANLAR ANLATIYOR</Text>
          <Text style={StyleSheet.compose(styles.icerikheader, { fontSize: 20 })}>Bugün yeni ne var ?</Text>
        </View>
        <ScrollView style={{ flexDirection: 'row' }} horizontal={true} showsHorizontalScrollIndicator={false}>
        {products && products.map((item) => (
           <TouchableOpacity  key={item._id} onPress={() => openCardModal(item._id)}>

            <View style={styles.card} key={item._id}>
              <Text style={styles.title}>{item.title.toUpperCase()}</Text>
              <Text style={styles.paragraph}>{item.description}</Text>
              <Icon type={Icons.MaterialCommunityIcons} name="arrow-right" size={25} color="#8547D1" style={styles.icon} />
            </View>
            </TouchableOpacity>
          ))}

{modals && (
        <Modal visible={modals} onRequestClose={closeCardModal}>
          <ScrollView>
          <TouchableOpacity onPress={closeCardModal} style={{ marginTop: 50, marginLeft: 20 }} >
            <Icon type={Icons.AntDesign} name="left" size={20} color="black" style={{float: 'left'}}  />

          </TouchableOpacity>
          <View style={{ alignItems: 'center', marginTop: 40, marginBottom:50, padding:20 }}>
            
            <Text style={styles.videotext}>{productDetails.product.title.toUpperCase()}</Text>
            <Text style={styles.videosubtitle}>{productDetails.product.author}</Text>
            
            <Text style={[styles.videosubtitle, { marginTop: 5 }]}> {formatDateString(productDetails.product.date)}</Text>

            <View style={styles.videosubtitleline}></View>
            <Text style={styles.videodescriptipn}>
            {renderTextWithLinks(productDetails.product.description)}
            </Text>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 20 }}>
            <TouchableOpacity onPress={() => handleAddToFavorites(productDetails.product._id)}>
              <Image
                source={filledHeart ? require('../assets/filledkalp.png') : require('../assets/outlinekalp.png')}
                style={[styles.imagemodal, { marginRight: 150 }]}
              />
            </TouchableOpacity>
              <Image
                source={require('../assets/gönder.png')} 
                style={styles.imagemodal}
              />
            </View>
          </View>
          </ScrollView>
        </Modal>
      )}
          
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
    paddingBottom: 160,
  },
  header: {
    color: '#1E1E1E',
    fontFamily: 'Raleway',
    fontSize: 40,
    marginTop: 40,
  },
  headercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop:-34
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
    marginTop: 10,
  },
  videotext: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    fontFamily:'Raleway-Bold',
    fontWeight:'bold',
  },
  videosubtitle: {
    marginTop: 16,
    fontSize: 12,
    textAlign: 'center',
    fontFamily:'Raleway-MediumItalic',
    
  },
  videosubtitleline: {
    borderWidth: 0.5,
    backgroundColor: 'black',
    marginLeft: 0,
    marginBottom: 10,
    marginTop: 10,
    fontFamily:'Raleway',
    borderEndWidth:'350'
  },
  videodescriptipn: {
    marginTop: 16,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 20,
    fontFamily:'Raleway'
  },
  icerikheader: {
    fontFamily: 'Raleway',
    fontSize: 30,
    color: '#7A7A7A',
  },
  labelButton: {
    width: 86,  
    height: 85,
    backgroundColor: '#381163',
    marginTop: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight:10,
  },
  
  row: {
    flexDirection: 'row',
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
    height:200,
    paddingBottom:100
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
    marginBottom:20
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
  linkText:{
    color:'#381163'
  }
});
