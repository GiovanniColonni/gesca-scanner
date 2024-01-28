import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from "../style";
import { Card } from 'react-native-paper';

const HistoryComponent = ({ history, onRowPress }) => {
  return (
    history.length > 0 ? (
    <Card style={{marginTop:20}}>
      <View style={styles.containerHistory}>
        <Text style={styles.head1}>Storico Scansioni</Text>
        <Text style={styles.body1}>Ultimi 10 articoli scansionati</Text>
        <View style={styles.table}>
          {history.map((code, idx_) => (
            <TouchableOpacity key={idx_} style={styles.row} onPress={() => onRowPress(code)}>
              <Text style={styles.codeText}>{code}</Text>
              <Text style={styles.clickText}>Carica Articolo</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Card>
    ) : null
  );
};


export default HistoryComponent;

/*  useEffect(() => {
    const getHistory = async () => {
      const codeHistory = await AsyncStorage.getItem("CodeHistory")
      if(codeHistory !== null){
        setHistory(JSON.parse(codeHistory))
      }
    }
    const saveCode = async () => {
      const codeHistory = await AsyncStorage.getItem("CodeHistory")
      if(codeHistory === null){
        AsyncStorage.setItem("CodeHistory", JSON.stringify([route.params.AM_CODICE]))
      }else{
        const codeHistoryArray = JSON.parse(codeHistory)
        const codes = codeHistoryArray.push(route.params.AM_CODICE.replace(" ","")).slice(0,10)
        const r  = await AsyncStorage.setItem("CodeHistory", JSON.stringify(codes))
        console.log("Result of saving code: ", r)
      }
    }
    saveCode()
    getHistory()

    return () => {}
  },[]) */