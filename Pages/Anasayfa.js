import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Anasayfa() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>MERHABA,</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#381163',
    fontWeight: '700',
    fontFamily: 'Hammersmith One',
    fontSize: 30,
    alignSelf: 'center',
  },
});
