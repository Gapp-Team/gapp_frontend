
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import OnboardingPage from './Pages/Onboarding';
import Login from './Pages/Login';
import Anasayfa from './Pages/Anasayfa';
import Register from './Pages/Register';
import AyarlarComponent from './Pages/Ayarlar';
import HesapBilgileri from './Pages/AyarlarHesapBilgileri';
import GeriBildirim from './Pages/geribildirim';
import GizlilikIlkesi from './Pages/GizlilikIlkesi';
import SSS from './Pages/SSS';
import SorunBildir from './Pages/sorunbildir';
import TakvimComponent from './Pages/Takvim';
import Navbar from './Pages/BottomNavbar';
import ilkon from './assets/ilkon.png';
import ikincion from './assets/ikincion.png';
import ucuncuon from './assets/ucuncuon.png';
import KesfetComponent from './Pages/Kesfet';
import IcerikDetay from './Pages/KesfetIcerik/IcerikDetay';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const OnboardingNavigator = () => {
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Onboarding1" options={{ headerShown: false }}>
        {props => (
          <OnboardingPage
            {...props}
            baslik="OKU"
            aciklama="Merak ettiğin her konu hakkında uzmanından bilgi al, güncel konular ile ilgili en doğru içeriklere ulaş!"
              text="Onboarding Page 1" 
            image = {ilkon}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Onboarding2" options={{ headerShown: false }}>
        {props => (
          <OnboardingPage
            {...props}
            baslik="KATIL"
            aciklama="Sürekli güncellenen konferans, söyleşi gibi etkinliklerden haberdar ol ve sen de bizimle yerini al!"

              text="Onboarding Page 2" 
            image = {ikincion}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Onboarding3" options={{ headerShown: false }}>
        {props => (
          <OnboardingPage
            {...props}
            baslik="GİZLE"
            aciklama="Tüm verilerini gizli tutmakta özgürsün, hepsi bizimle güvende. Tamamen gizli olmak senin tercihin!"
            text="Onboarding Page 3" 
            image = {ucuncuon}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />

      <Stack.Screen name="Navbar" component={Navbar} options={{ headerShown: false }} />
      <Stack.Screen name="Ayarlar" component={AyarlarComponent} options={{ headerShown: false }} />
      <Stack.Screen name="HesapBilgileri" component={HesapBilgileri} options={{ headerShown: false }} />
      <Stack.Screen name="SorunBildir" component={SorunBildir} options={{ headerShown: false }} />
      <Stack.Screen name="GeriBildirim" component={GeriBildirim} options={{ headerShown: false }} />
      <Stack.Screen name="GizlilikIlkesi" component={GizlilikIlkesi} options={{ headerShown: false }} />
      <Stack.Screen name="SSS" component={SSS} options={{ headerShown: false }} />
      <Stack.Screen name="Anasayfa" component={Anasayfa} options={{ headerShown: false }} />
      <Stack.Screen name="Takvim" component={TakvimComponent} options={{ headerShown: false }} />
      <Stack.Screen name="Kesfet" component={KesfetComponent} options={{ headerShown: false }} />
      <Stack.Screen name="IcerikDetay" component={IcerikDetay} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};


export default function App() {
  return (
    <NavigationContainer>
      <OnboardingNavigator />
    </NavigationContainer>
  );
}
