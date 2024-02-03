import React from 'react';
import { View, Text, Divider } from 'react-native';
import { styles } from "../style";
import { Card } from 'react-native-paper';
const DataView2 = ({ data }) => {
  return (
    <Card>
      <View style={styles.containerHome1}>
        <Text style={styles.head1}>Articolo Scansionato </Text>
        <Text style={styles.label}>Descrizione: <Text style={styles.value}>{data.descrizione}</Text></Text>
        <Text style={styles.label}>Codice: <Text style={styles.value}>{data.AM_CODICE}</Text></Text>
        <Text style={styles.label}>Usabile <Text style={styles.value}>{data.AM_USABILE ? 'Si' : 'No'}</Text></Text>
        <Text style={styles.label}>AM_LIST1: <Text style={styles.value}>{data.AM_LIST1}</Text></Text>
        <Text style={styles.label}>Descrizione: <Text style={styles.value}>{data.AM_DES1}</Text></Text>
        <Text style={styles.label}>Disponibilità: <Text style={styles.value}>{data.AM_DISPO}</Text></Text>
        <Text style={styles.label}>Magazzino: <Text style={styles.value}>{data.AM_MAGA}</Text></Text>
        <Text style={styles.label}>Settore Magazzino: <Text style={styles.value}>{data.AM_SETMAGA}</Text></Text>
        
      </View>
    </Card>

  );
};


export default DataView;
