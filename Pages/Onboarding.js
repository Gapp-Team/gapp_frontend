import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const fetchFonts = async () => {
  await Font.loadAsync({
    'luckiest-guy': require('../assets/Fonts/LuckiestGuy-Regular.ttf'),
    'HammersmithOne': require('../assets/Fonts/HammersmithOne-Regular.ttf'),
  });
};

const OnboardingPage = ({ baslik,aciklama, image, imageSource, navigation, text }) => {
   useEffect(() => {
    fetchFonts();
  }, []);
   const handleSkip = () => {
      const nextPageNumber = parseInt(text.charAt(text.length - 1)) + 1;
      if (nextPageNumber <= 3) {
        navigation.navigate(`Onboarding${nextPageNumber}`);
      } else {
        alert("SAYFA YOK");
      }
    
   };

  const dotCount = 3; 
  const activeDotIndex = parseInt(text.charAt(text.length - 1))-1; 
  const dots = Array.from({ length: dotCount }, (_, index) => (
    <Text
      key={index}
      style={[styles.dot, index === activeDotIndex && styles.activeDot]}
    >
      _
    </Text>
  ));
  return (
    <View style={styles.container}>
      <View style={styles.circle1}></View>
      <View style={styles.circle2}></View>
      {text === "Onboarding Page 2" ? ( 
        <Image source={image} style={styles.ikincionImage} />
      ) : (
        <Image source={image} style={styles.image} />
      )}
      
      <Text style={styles.textBaslik}>{baslik}</Text>
      <Text style={styles.textAciklama}>{aciklama}</Text>
      <View style={styles.dotsContainer}>
        {dots.map((dot, index) => (
          <Text key={index} style={styles.dot}>{dot}</Text>
        ))}
      </View>
      <View style={styles.skipButtonContainer}>
        {baslik !== "GİZLE" ? (
          <>
            <TouchableOpacity style={styles.atlaButton} onPress={() => navigation.navigate('Onboarding3')}>
              <Text style={styles.atlaButtonText}>ATLA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>SONRAKİ</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.atlaButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.atlaButtonText}>HEMEN BAŞLA</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#381163',
    backgroundColor: '#381163', // Arka plan rengi
  },
  textBaslik: {
    fontSize: 58,
    marginBottom: 20,
    marginTop:-150,
    marginLeft: 50,
    marginRight: 50,
    fontFamily: 'luckiest-guy',
    alignSelf: 'flex-start', 
    color: 'white'
  },
  textAciklama: {
    fontSize: 16,
    marginBottom: 70,
    marginLeft: 50,
    marginRight: 50,
    fontFamily: 'HammersmithOne',
    alignSelf: 'flex-start',
    color: 'white'

  },
  image: {
    width: 600,
    height: 600,
    resizeMode: 'contain',
    left: 0,
    top:-30
  },
  ikincionImage: {
    width: 430,
    height: 600,
    resizeMode: 'contain',
    left: 0,
    top:-38,
  },
  circle1: {
    width: 330,
    height: 350,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 400,
    borderTopRightRadius: 370,
    borderBottomRightRadius: 490,
    backgroundColor: '#7A55A2', // İlk yuvarlağın rengi
    position: 'absolute',
    top: 0,
    left: -50,
  },
  circle2: {
    width: 400,
    height: 400,
    borderBottomLeftRadius: 350,
    borderTopRightRadius: 400,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 400,
    backgroundColor: '#7A55A2', // İkinci yuvarlağın rengi
    position: 'absolute',
    top: '58%',
    right: 0,
    left: 90
  },
  skipButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 0
  },
  skipButton: {
    backgroundColor: '#381163',
    borderColor: '#381163',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 45,
    borderRadius: 5,
    marginRight: 0,
  },
  skipButtonText: {
    fontSize: 16,
    color: 'white',
  },
  atlaButton: {
    backgroundColor: '#7A55A2',
    borderColor: '#381163',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  atlaButtonText: {
    fontSize: 16,
    color: 'white',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    fontSize: 20,
    marginHorizontal: 5,
    color: 'white',
  },
  activeDot: {
    fontWeight: 'bold',
  },
});

export default OnboardingPage;
