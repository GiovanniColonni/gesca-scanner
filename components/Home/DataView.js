import React from 'react';
import { View, Text } from 'react-native';
import { styles } from "../style";

const DataView = ({ data }) => {
  return (
    <View style={styles.containerHome}>
      <Text style={styles.label}>Codice: <Text style={styles.value}>{data.AM_CODICE}</Text></Text>
      <Text style={styles.label}>Usabile <Text style={styles.value}>{data.AM_USABILE ? 'Si' : 'No'}</Text></Text>
      <Text style={styles.label}>AM_LIST1: <Text style={styles.value}>{data.AM_LIST1}</Text></Text>
      <Text style={styles.label}>Descrizione: <Text style={styles.value}>{data.AM_DES1}</Text></Text>
      <Text style={styles.label}>Disponibilita': <Text style={styles.value}>{data.AM_DISPO}</Text></Text>
      <Text style={styles.label}>Magazzino: <Text style={styles.value}>{data.AM_MAGA}</Text></Text>
      <Text style={styles.label}>Settore Magazzino: <Text style={styles.value}>{data.AM_SETMAGA}</Text></Text>
    </View>
  );
};


export default DataView;
