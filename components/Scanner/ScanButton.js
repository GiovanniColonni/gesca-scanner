import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View,Image } from 'react-native';
import ScanIcon from '../../assets/icons/scanicon2.png';
import { secondaryColor } from '../style';

const ScanButton = ({ onPress }) => {

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>
      <Image source={ScanIcon} />
      </View>
      <Text style={styles.buttonText}>Apri Scanner</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: secondaryColor, //'#3a7ef2'
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
    margin:30,
},
  iconContainer: {
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScanButton;
