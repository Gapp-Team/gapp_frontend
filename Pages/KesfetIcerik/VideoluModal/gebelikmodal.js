// Örnek: Modal1.js
import React from 'react';
import { View, Text, Modal, Button } from 'react-native';

const Modal1 = ({ isVisible, onClose, title, description }) => {
  return (
    <Modal visible={isVisible}>
      <View>
        <Text>{title}</Text>
        <Text>{description}</Text>
        <Button title="Kapat" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default Modal1;
