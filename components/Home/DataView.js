import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { primaryColor, styles } from "../style";
import { Card, Divider, Button } from 'react-native-paper';
const DataView = ({ data, handleAggiungi }) => {
  const [qnt, setQnt] = useState(0)
  const [qntErr, setQntErr] = useState(false)
  const [qntErrMsg, setQntErrMsg] = useState("")
  const onAggiungi = () => {
    handleAggiungi(data.AM_CODICE, qnt)
  }
  const onChangeQnt = (value) => {
    setQntErr(false)
    setQntErrMsg("")
    const val = Number(value)
    if (isNaN(val)) {
      setQntErrMsg("Inserire un numero")
      setQntErr(true)
      setQnt(0)
    }
    if (val > data.AM_DISPO) {
      setQntErrMsg("Quantità maggiore di disponibile")
      setQntErr(true)
    }
    setQnt(val)
    return
  }
  const getQntStyle = () => {
    return qntErr ? styles.qntInputError : styles.qntInput
  }
  console.log(data)
  return (
      <View style={styles.containerArticolo}>
        <Text style={styles.head1}>Articolo Scansionato </Text>
        <Text style={styles.label}>Codice: <Text style={styles.value}>{data.AM_CODICE}</Text></Text>
        <Text style={styles.label}>Descrizione: <Text style={styles.value}>{data.AM_DES1}</Text></Text>
        <Text style={styles.label}>Usabile <Text style={styles.value}>{data.AM_USABILE ? 'Si' : 'No'}</Text></Text>
        <Text style={styles.label}>Disponibilità: <Text style={styles.value}>{data.AM_DISPO}</Text></Text>
        <Text style={styles.label}>Ord Clienti: <Text style={styles.value}>{"BOH"}</Text></Text>
        <Text style={styles.label}>Ord Fornitori: <Text style={styles.value}>{"BOH"}</Text></Text>
        <Text style={styles.label}>Settore Magazzino: <Text style={styles.value}>{data.AM_SETMAGA}</Text></Text>
        <Text style={styles.label}>Prezzo Cli1: <Text style={styles.value}>{"BOH"}</Text></Text>
        <Text style={styles.label}>Prezzo Cli2: <Text style={styles.value}>{"BOH"}</Text></Text>
        
        <Divider/>

        <View style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
          marginTop: 10,
        }}>
          <TextInput style={[getQntStyle(),{marginRight:10}]} keyboardType="numeric" placeholder="qnt" value={String(qnt || 0)} onChangeText={t => onChangeQnt(t)} />
          <Button buttonColor={primaryColor} mode="contained" onPress={() => onAggiungi()}>Aggiungi</Button>
            
          </View>
          {qntErr && <Text style={styles.error}>{qntErrMsg}</Text>}
        </View>

      </View>
  );
};


export default DataView;
