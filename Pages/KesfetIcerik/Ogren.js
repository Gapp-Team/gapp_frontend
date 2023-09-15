import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import Logo from '../../components/Logo';
import { ScrollView } from 'react-native-gesture-handler';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import Icon, { Icons } from '../../components/Icon';

const fetchFonts = async () => {
  await Font.loadAsync({
    'Raleway': require('../../assets/Fonts/Raleway-Regular.ttf'),
    'Raleway ExtraBold': require('../../assets/Fonts/Raleway-ExtraBold.ttf'),
    'Raleway Medium': require('../../assets/Fonts/Raleway-MediumItalic.ttf'),
  });
};

export default function Ogren() {
  useEffect(() => {
    fetchFonts();
  }, []);


  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const videoAsset = Asset.fromModule(require('../../assets/gebelikvideo.mp4'));
  videoAsset.downloadAsync();

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };


  const data = [
    {
      id: 1,
      imageSource: require('../../assets/gebelik.jpg'), 
      title: 'GEBELİK SONLANDIRMA İŞLEMİNİN KADINLAR ÜZERİNDE ETKİSİ',
      subtitle: 'GEBELİK',
      description: 'Kadın Hastalıkları ve Doğum Uzmanı Gizem Ustahüseyin',
      videoModalContent: (
        <View style={{ alignItems:'center', marginTop:40}}>
          <Video
            ref={video}
            style={{ width: 350, height: 200, borderRadius:20 }} 
            source={{ uri: videoAsset.uri }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
          <View>
            <Text style={styles.videotext}>GEBELİK SONLANDIRMA İŞLEMİNİN KADINLAR ÜZERİNDE ETKİSİ</Text>
            <Text style={styles.videosubtitle}>Kadın Hastalıkları ve Doğum Uzmanı Gizem Ustahüseyin</Text>
            <View style={styles.videosubtitleline}></View>
            <Text style={styles.videodescriptipn}> Gebelik kürtajı, vakum aspiratör yöntemiyle uygulanır. Bu yöntem, kürtaj için en sık uygulanan yöntemdir ve oldukça güvenlidir. Bu yöntemde plastik enjektör ve plastik ince borular kullanılır. Gebeliğin sonlanması, bu borular ile emilmesi ve çekilerek alınması şeklinde yapılır.
                  Gebelik kürtajı, vakum aspiratör yöntemiyle uygulanır. Bu yöntem, kürtaj için en sık uygulanan yöntemdir ve oldukça güvenlidir. Bu yöntemde plastik enjektör ve plastik ince borular kullanılır. Gebeliğin sonlanması, bu borular ile emilmesi ve çekilerek alınması şeklinde yapılır.
                  Gebelik kürtajı, vakum aspiratör yöntemiyle uygulanır. Bu yöntem, kürtaj için en sık uygulanan  
            </Text>
            <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row', marginTop:20}}>
              <TouchableOpacity onPress={toggleFavorite}>
                <Image
                  source={isFavorite ? require('../../assets/filledkalp.png') : require('../../assets/outlinekalp.png')}
                  style={[styles.imagemodal, style ={marginRight:150}]}
                />
              </TouchableOpacity>
              <Image
                  source={require('../../assets/gönder.png')} 
                  style={styles.imagemodal}
              />
            </View>
          </View>
        </View>
      ),
    },
    {
      id: 2,
      imageSource: require('../../assets/gebelik.jpg'),
      title: 'GEBELİK SONLANDIRMA İŞLEMİNİN KADINLAR ÜZERİNDE ETKİSİ',
      subtitle: 'GEBELİK',
      description: 'Kadın Hastalıkları ve Doğum Uzmanı Gizem Ustahüseyin',
      videoModalContent: (
        <View style={{ alignItems:'center', marginTop:40}}>
          <Video
            ref={video}
            style={{ width: 350, height: 200, borderRadius:20 }} 
            source={{ uri: videoAsset.uri }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
          <View>
            <Text style={styles.videotext}>GEBELİK SONLANDIRMA İŞLEMİNİN KADINLAR ÜZERİNDE ETKİSİ</Text>
            <Text style={styles.videosubtitle}>Kadın Hastalıkları ve Doğum Uzmanı Gizem Ustahüseyin</Text>
            <View style={styles.videosubtitleline}></View>
            <Text style={styles.videodescriptipn}> Gebelik kürtajı, vakum aspiratör yöntemiyle uygulanır. Bu yöntem, kürtaj için en sık uygulanan yöntemdir ve oldukça güvenlidir. Bu yöntemde plastik enjektör ve plastik ince borular kullanılır. Gebeliğin sonlanması, bu borular ile emilmesi ve çekilerek alınması şeklinde yapılır.
                  Gebelik kürtajı, vakum aspiratör yöntemiyle uygulanır. Bu yöntem, kürtaj için en sık uygulanan yöntemdir ve oldukça güvenlidir. Bu yöntemde plastik enjektör ve plastik ince borular kullanılır. Gebeliğin sonlanması, bu borular ile emilmesi ve çekilerek alınması şeklinde yapılır.
                  Gebelik kürtajı, vakum aspiratör yöntemiyle uygulanır. Bu yöntem, kürtaj için en sık uygulanan  
            </Text>
            <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row', marginTop:20}}>
              <TouchableOpacity onPress={toggleFavorite}>
                <Image
                  source={isFavorite ? require('../../assets/filledkalp.png') : require('../../assets/outlinekalp.png')}
                  style={[styles.imagemodal, style ={marginRight:150}]}
                />
              </TouchableOpacity>
              <Image
                  source={require('../../assets/gönder.png')}
                  style={styles.imagemodal}
              />
            </View>
            
          </View>
        </View>
      ),
    },
    {
      id: 3,
      imageSource: require('../../assets/gebelik.jpg'),
      title: 'GEBELİK SONLANDIRMA İŞLEMİNİN KADINLAR ÜZERİNDE ETKİSİ',
      subtitle: 'GEBELİK',
      description: 'Kadın Hastalıkları ve Doğum Uzmanı Gizem Ustahüseyin',
      videoModalContent: (
        <View style={{ alignItems:'center', marginTop:40}}>
          <Video
            ref={video}
            style={{ width: 350, height: 200, borderRadius:20 }}
            source={{ uri: videoAsset.uri }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
          <View>
            <Text style={styles.videotext}>GEBELİK SONLANDIRMA İŞLEMİNİN KADINLAR ÜZERİNDE ETKİSİ</Text>
            <Text style={styles.videosubtitle}>Kadın Hastalıkları ve Doğum Uzmanı Gizem Ustahüseyin</Text>
            <View style={styles.videosubtitleline}></View>
            <Text style={styles.videodescriptipn}> Gebelik kürtajı, vakum aspiratör yöntemiyle uygulanır. Bu yöntem, kürtaj için en sık uygulanan yöntemdir ve oldukça güvenlidir. Bu yöntemde plastik enjektör ve plastik ince borular kullanılır. Gebeliğin sonlanması, bu borular ile emilmesi ve çekilerek alınması şeklinde yapılır.
                  Gebelik kürtajı, vakum aspiratör yöntemiyle uygulanır. Bu yöntem, kürtaj için en sık uygulanan yöntemdir ve oldukça güvenlidir. Bu yöntemde plastik enjektör ve plastik ince borular kullanılır. Gebeliğin sonlanması, bu borular ile emilmesi ve çekilerek alınması şeklinde yapılır.
                  Gebelik kürtajı, vakum aspiratör yöntemiyle uygulanır. Bu yöntem, kürtaj için en sık uygulanan  
            </Text>
            <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row', marginTop:20}}>
              <TouchableOpacity onPress={toggleFavorite}>
                <Image
                  source={isFavorite ? require('../../assets/filledkalp.png') : require('../../assets/outlinekalp.png')}
                  style={[styles.imagemodal, style ={marginRight:150}]}
                />
              </TouchableOpacity>
              <Image
                  source={require('../../assets/gönder.png')}
                  style={styles.imagemodal}
              />
            </View>
          </View>
        </View>
      ),
    },
  ];

  const [modals, setModals] = useState(new Array(data.length).fill(false));

  const openModal = (index) => {
    const updatedModals = [...modals];
    updatedModals[index] = true;
    setModals(updatedModals);
  };
  
  const closeModal = (index) => {
    const updatedModals = [...modals];
    updatedModals[index] = false;
    setModals(updatedModals);
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
      <Text style={styles.icerikheader}>GEBELİK</Text>
      {data.map((item, index) => (
        <TouchableOpacity key={item.id} onPress={() => openModal(index)}>
          <View style={styles.card}>
            <Image source={item.imageSource} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <View style={styles.subtitleLine}></View>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      {data.map((item, index) => (
        <Modal key={item.id} visible={modals[index]} onRequestClose={() => closeModal(index)} >
          <TouchableOpacity onPress={() => closeModal(index)} style={{marginTop:50, marginLeft:20}}>
            <Icon type={Icons.AntDesign} name="left" size={28} color="black" style={styles.icon} />
          </TouchableOpacity>
          {item.videoModalContent}
        </Modal>
      ))}
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
  icerikheader: {
    fontFamily: 'Raleway',
    fontSize: 35,
    color: '#7A7A7A',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    shadowColor: '#000',
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
    marginTop: 20,
    marginLeft: 10,
    fontFamily: 'Raleway',
  },
  subtitle: {
    fontSize: 15,
    marginTop: 5,
    marginLeft: 10,
    fontFamily: 'Raleway',
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
  video: {
    width: '100%',
    aspectRatio: 16 / 9, 
  },
  videotext:{
    fontSize:28,
    fontFamily:'Raleway ExtraBold',
    textAlign: 'center',
    marginTop:20
  },
  videosubtitle:{
    fontFamily:'Raleway Medium',
    marginTop:16,
    fontSize:12,
    textAlign:'center',
    fontWeight: 'bold',
  },
  videosubtitleLine: {
    borderWidth: 0.8,
    backgroundColor: 'black',
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  videodescriptipn:{
    fontFamily:'Raleway',
    marginTop:16,
    fontSize:15,
    textAlign:'center',
    fontWeight: 'bold',
    padding:20
  },
  imagemodal:{
    width:50,
    height:50,
  }
});
