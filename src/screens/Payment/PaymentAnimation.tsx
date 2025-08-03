import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';

const PaymentAnimation = ({ visible, onClose }: any) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <AntDesign name="checkcircle" size={scale(100)} color="white" />
          <Text style={styles.successText}>Payment Done Successfully.</Text>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Entypo name="circle-with-cross" size={34} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentAnimation;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)', // gives a fake blur/dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1D3725',
    width: scale(300),
    height: verticalScale(250),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successText: {
    marginTop: 15,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
