
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import OnboardingPage from './Pages/Onboarding';
import Login from './Pages/Login';
import Anasayfa from './Pages/Anasayfa';
import Register from './Pages/Register';
import Navbar from './Pages/BottomNavbar';
import ilkon from './assets/ilkon.png';
import ikincion from './assets/ikincion.png';
import ucuncuon from './assets/ucuncuon.png';

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
              text="Onboarding Page 1" // Burada text prop'unu tanımlayarak geçirin
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
              text="Onboarding Page 2" // Burada text prop'unu tanımlayarak geçirin
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
            text="Onboarding Page 3" // Burada text prop'unu tanımlayarak geçirin
            image = {ucuncuon}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Navbar" component={Navbar} options={{ headerShown: false }} />

      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
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
