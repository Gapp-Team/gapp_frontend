import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from '../components/Icon';
import Colors from '../contants/Colors';
import * as Animatable from 'react-native-animatable';
import AnasayfaComponent from './Anasayfa';

const TabArr = [
  { route: 'Anasayfa', label: 'Anasayfa', type: Icons.Feather, icon: 'home', component: AnasayfaComponent },
  { route: 'Takvim', label: 'Takvim', type: Icons.FontAwesome5, icon: 'calendar-alt', component: AnasayfaComponent },
  { route: 'Favorilerim', label: 'Favorilerim', type: Icons.Ionicons, icon: 'star',  component: AnasayfaComponent },
  { route: 'Kesfet', label: 'Keşfet', type: Icons.FontAwesome5, icon: 'glasses',  component: AnasayfaComponent},
  { route: 'Ayarlar', label: 'Ayarlar', type: Icons.Ionicons, icon: 'settings-sharp', component: AnasayfaComponent },
];

const Tab = createBottomTabNavigator();

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <View style={[styles.btn, { backgroundColor: focused ? Colors.purple : 'transparent',borderColor: focused ? Colors.white : Colors.purple, // borderColor ayarlandı
 } ]}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <Icon type={item.type} name={item.icon} color={focused ? Colors.white : Colors.white} />
        </View>
        <Animatable.Text
          ref={textRef}
          style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

export default function AnimTab1() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 75,
    position: 'absolute',
    bottom: 23,
    right: 16,
    left: 16,
    backgroundColor: Colors.purple,
    paddingTop:5,
    paddingBottom:2,
    borderRadius: 16,
  },
  btn: {
    width: 60,
    height: 60,
    borderRadius: 35,
    borderWidth: 9,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.purple,
    borderRadius: 25,
    margin:3
  },
  text: {
    fontSize: 13,
    textAlign: 'center',
    color: Colors.white,
    marginTop:4
  }
})