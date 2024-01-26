import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, Modal, Linking, TextInput } from 'react-native';
import Logo from '../components/Logo';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon, { Icons } from '../components/Icon';
import AddEvent from './Modals/AddEvent';
import { getAllCategories, getAllProducts, getProductsById } from '../request/main';

import { useNavigation } from '@react-navigation/native';
import { getUserByToken } from '../request/login';

const fetchFonts = async () => {
  await Font.loadAsync({
    'luckiest-guy': require('../assets/Fonts/LuckiestGuy-Regular.ttf'),
    'HammersmithOne': require('../assets/Fonts/HammersmithOne-Regular.ttf'),
    'Raleway': require('../assets/Fonts/Raleway-Regular.ttf'),
    'SeoulHangang': require('../assets/Fonts/SeoulHangang-Medium.ttf'),
    'FuzzyBubbles': require('../assets/Fonts/FuzzyBubbles-Regular.ttf'),
    'Raleway-Bold': require('../assets/Fonts/Raleway-ExtraBold.ttf'),
    'Raleway-MediumItalic': require('../assets/Fonts/Raleway-MediumItalic.ttf'),
  });
};


export default function Anasayfa({route}) {
  const navigation = useNavigation();

  useEffect(() => {
    fetchFonts();
  }, []);

  const [username, setUsername] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [modals, setModals] = useState(false);
  const [productDetails, setProductDetails] = useState(null); 
  const [filledHeart, setFilledHeart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect( async () => {
    const token = await AsyncStorage.getItem('token');
    getUserByToken(token)
    .then((response) => {
      setUsername(response.name);
    })
  }, []);


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

  console.log("************************************************************" ,categories);

  const groupIntoRows = (array, elementsPerRow) => {
    const result = [];
    for (let i = 0; i < array.length; i += elementsPerRow) {
      result.push(array.slice(i, i + elementsPerRow));
    }
    return result;
  };

  const handleLabelPress = (id) => {
    console.log("tıklandı");
    navigation.navigate("IcerikDetay", { id: id });
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
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
  
  
  const addEtkinlik = (etkinlikBilgisi) => {
    const { baslangic, bitis } = etkinlikBilgisi;
    console.log('Başlangıç Tarihi:', baslangic);
    console.log('Bitiş Tarihi:', bitis);
    
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

  const handleSearch = (query) => {
    console.log('aranan kelime:', query);
  };
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
        <View style={styles.aramabutton}>
          <TouchableOpacity onPress={() => handleSearch(searchQuery)}>
            <Image source={require('../assets/search.png')} style={{marginLeft:10}} />
          </TouchableOpacity> 
          <TextInput
              style={{marginLeft:10, float:'left'}}
              placeholder="Arama yap"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />          
        </View>

        <View style={styles.content}>
          <Text style={styles.mottotext}>GÜNLÜK MOTTO</Text>
          <Image source={require('../assets/motto.png')} style={{marginTop:10, width:'100%', borderRadius:10}} />
        </View>

        <View style={styles.content}>
        <Text style={styles.mottotext}>İÇERİKLER</Text>

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

                {/* <Image source={labels[label].imageSource} style={[styles.labelImage, label === 'Cinsiyet' && styles.specialLabelImage]} /> */}
                <Text style={{ color: 'white', fontFamily: 'SeoulHangang', padding:5 }}>{category.name}</Text>
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
          {products && products.map((item) => (
            <TouchableOpacity  key={item._id} onPress={() => openCardModal(item._id)}>
            <View style={styles.card} key={item._id}>
              <Text style={styles.title}>{item.title}</Text>
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
                source={ filledHeart ? require('../assets/filledkalp.png') : require('../assets/outlinekalp.png')}
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
      </View>
    </ScrollView>
)}

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
    fontSize:17,
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
    borderRadius:20, 
    float:'left'
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
    width: 86,  
    height: 85,
    backgroundColor: '#381163',
    marginTop: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight:10
  },
  row: {
    flexDirection: 'row',
  },
  takvimbutton: {
    backgroundColor: '#E9E9E9',
    padding: 15,
    borderRadius: 25,
    justifyContent: 'center',
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
    marginTop:13,
    alignItems: 'center',
    justifyContent: 'center',
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
