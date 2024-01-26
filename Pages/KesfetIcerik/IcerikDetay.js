import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Video } from 'expo-av'; 
import Logo from '../../components/Logo';
import { getCategoryById, getProductsByCategoryId, getProductsById } from '../../request/main';
import Icon, { Icons } from '../../components/Icon';
import { Image as ExpoImage } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function IcerikDetay({ route }) {
  const { id } = route.params;

  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null); 

  const [categoryName, setCategoryName] = useState({});
  const [error, setError] = useState([]);
  const [modals, setModals] = useState(false);

  const [filledHeart, setFilledHeart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

  useEffect(() => {
    getProductsByCategoryId(id).then((res) => {

      if (res.status == 404) {
          setError("No products found for this category")
          setProducts([]);
      } else {
          setProducts(res.products)
          setError("");
      }
    })
    
    getProductsById().then((res) =>{
      if (res.status == 404) {
        setError("No products found for this id")
        setProductDetails(null);
    } else {
      setProductDetails(res)
        setError("");
    }
    })

    getCategoryById(id).then((res) => {
      console.log( "Kategori" ,res.category)
      setCategoryName(res.category)
    })
  }, []);


  const openModal = async (productId) => {
    try {
      const productDetails = await getProductsById(productId);
      setProductDetails(productDetails);
      setModals(true);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  

  const closeModal = () => {
    setModals(false);
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
      <Text style={styles.icerikheader}>{categoryName.name}</Text>

      {products ? products.map((item, index) => (     
        <TouchableOpacity key={item._id} onPress={() => openModal(item._id)}>
          <View style={styles.card}>
              <ExpoImage
                style={styles.image}  
                uri={{ uri: item.imageUrl }}
                onError={(error) => console.error('Image Error:', error)}
              />
              <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.titleCategory}>{categoryName.name.toUpperCase()}</Text>
              <View style={styles.subtitleLine}></View>
              <Text style={styles.description}>{item.author}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )) : 
        <View>
          <Text> {error} </Text>
        </View>
      }

      {modals && (
        <Modal visible={modals} onRequestClose={closeModal}>
          <ScrollView>
          <TouchableOpacity onPress={closeModal} style={{ marginTop: 50, marginLeft: 20 }} >
            <Icon type={Icons.AntDesign} name="left" size={20} color="black" style={styles.icontakvim}  />

          </TouchableOpacity>
          <View style={{ alignItems: 'center', marginTop: 0, marginBottom:50, padding:20 }}>
            <Video
              source={{ uri: 'your_video_uri.mp4' }}
              useNativeControls
              resizeMode="contain"
              isLooping
            />
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
                source={filledHeart ? require('../../assets/filledkalp.png') : require('../../assets/outlinekalp.png')}
                style={[styles.imagemodal, { marginRight: 150 }]}
              />
              </TouchableOpacity>
              <Image
                source={require('../../assets/gönder.png')} 
                style={styles.imagemodal}
              />
            </View>
          </View>
          </ScrollView>
        </Modal>
      )}
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
  },
  header: {
    color: '#1E1E1E',
    fontSize: 40,
    marginTop: 40,
  },
  headercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: -30
  },
  logoContainer: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  logo: {
    width: 100,
    height: 100,
  },
  icerikheader: {
    fontSize: 35,
    color: '#7A7A7A',
    textAlign: 'center',
    marginBottom: 10,
    marginTop:0
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    shadowColor: '#000',
    height:200
  },
  image: {
    width: 140,
    height: 190,
    marginRight: 10,
    borderRadius: 13,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginTop: 30,
    marginLeft: 10,
    fontFamily: 'Raleway'
  },
  titleCategory: {
    marginTop:4,
    marginLeft: 10,
    fontSize:15,
    fontFamily: 'Raleway'

  },
  subtitle: {
    fontSize: 15,
    marginTop: 5,
    marginLeft: 10,
    fontFamily:'Raleway'

  },
  description: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 10,
    fontFamily: 'Raleway',
  },
  subtitleLine: {
    borderWidth: 0.8,
    backgroundColor: 'black',
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  videotext: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    fontFamily:'Raleway-Bold',
    fontWeight:'bold'
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
  linkText:{
    color:'#381163'
  }
});
