import React, { useEffect, useState } from "react"
import { View, Text, Divider, Button, Alert } from "react-native"
import { SafeAreaView } from 'react-native';
import DataView from './DataView';
import ScannerCode from "../Scanner/Scanner"
import { primaryColor, secondaryColor, styles } from "../style";
import { useRoute } from "@react-navigation/native"
import HistoryComponent from "./History";
import { Card, Snackbar, Switch, Modal, Portal, IconButton } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeComponent({ navigation }) {

  // ABRL312T8FG60

  const route = useRoute()
  const [authCredentials, setAuthCredentials] = useState("")

  const [history, setHistory] = useState([])
  const [currArticle, setCurrArticle] = useState(null)
  const [path, setPath] = useState("")
  const [addDone, setAddDone] = useState(false)
  const [autoSave, setAutoSave] = React.useState(false);

  // tooltip modal
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    console.log("route params: ", route.params)
    if (route.params !== undefined) {
      // save the scanned code 
      setCurrArticle(route.params)
    }
  }, [route.params])

  useFocusEffect(() => {
    AsyncStorage.getItem("authCredentials").then((res) => {
      if (res === null) {
        return
      }
      setAuthCredentials(res)
      AsyncStorage.getItem("serverIP").then((res) => {
        addr = res
        AsyncStorage.getItem("port").then((res) => {
          port = res

          setPath("http://" + addr + ":" + port)
        })
      })
    })
  })


  // fetch autoSave prop
  useFocusEffect(() => {
    AsyncStorage.getItem("autoSave").then((res) => {
      if (res === null) {
        setAutoSave(false)
        return
      }
      const autosave = res === "on" ? true : false
      setAutoSave(autosave)
    })
  })

  function handleAggiungi(codice, qnt) {
    fetch(path + "/saveCode", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + authCredentials
      },
    }).then((res) => {
      if (res.status === 200) {
        setAddDone(true)
        return
      }
      if (res.status === 401) {
        Alert.alert("Error", "Errore di autenticazione")
        return
      }
      Alert.alert("Errore", "Errore durante l'aggiunta dell'articolo")
      return
    }).catch((err) => {
      console.log("Errore", err)
      Alert.alert("Errore", "Errore durante l'aggiunta dell'articolo")
    })
  }

  const handleAutoSave = () => {
    AsyncStorage.setItem("autoSave", String(!autoSave ? "on" : "off")).then((res) => {
      console.log("setting AutoSave: ", !autoSave)
      setAutoSave(!autoSave)
    })
  }

  return (
    <View style={{ flex: 1, padding: 5,flexDirection:'column', margin: 10 }}>
      <Card style={{marginBottom:10}}>
        <View style={{ padding: 10, border: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Text>Attiva Salvataggio Automatico</Text>
          <Switch color={secondaryColor}value={autoSave} onValueChange={() => handleAutoSave()} />
          <IconButton
            icon="information-outline"
            size={20}
            onPress={showModal}
          />
          <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20 }}>
              <Text>Attivando il salvataggio automatico, il codice verra' immediatamente salvato con una quanita' predefinita.</Text>
            </Modal>
          </Portal>
        </View>
      </Card>
      
      <Card>
          {currArticle === null ?
            <View style={styles.containerHome1}>
              <Text style={styles.title}>Nessun articolo al momento</Text>
              <Text style={styles.body1}>Inserisci o scannerizza un codice</Text>
            </View>
            : <DataView data={currArticle} handleAggiungi={handleAggiungi} />}
      </Card>
    
      <View style={{ borderTop: 10, padding: 10 }}>
        <Button title="Torna a Scanner" color={secondaryColor}
          onPress={() => navigation.navigate("Scanner")} /></View>
          <Snackbar visible={addDone} onDismiss={() => setAddDone(false)}>Articolo Aggiunto Correttamente</Snackbar>
          <View style={{ borderTop: 10, padding: 10 }}>
        <Button title="Vai a Cronologia" color={primaryColor}
          onPress={() => navigation.navigate("Cronologia")} /></View>
      </View>
  )
}

export default HomeComponent