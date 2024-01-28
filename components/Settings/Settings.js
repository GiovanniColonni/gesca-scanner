import React, { useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet, Button, Alert } from "react-native";
import { confSchema, confSchemaValidate } from "./Model";
import CustomAlertComponent from "./ErrorModal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../style";
import { Card,Chip } from 'react-native-paper';

function SettingComponent({ navigation }) {

  const [error, setError] = useState({
    serverIP: false,
    port: false,
    username: false,
    password: false,
    databaseName: false,
  })

  const [submitError, setSubmitError] = useState({})
  const [confFound, setConfFound] = useState({})
  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  const [foundConfig, setFoundConfig] = useState(false)

  const [conf, setConf] = useState(confSchema.parse({}));

  async function isConfigPresent() {

    const server = await AsyncStorage.getItem("serverIP")
    const port = await AsyncStorage.getItem("port")
    const username = await AsyncStorage.getItem("username")
    const pass = await AsyncStorage.getItem("password")
    const db = await AsyncStorage.getItem("databaseName")

    const goodConf = (server !== null) && (port !== null) && (username !== null) && (pass !== null) && (db !== null)

    setConfFound(goodConf)

    if (goodConf) {
      setFoundConfig({
        serverIP: server,
        port: port,
        username: username,
        password: pass,
        databaseName: db,
      })
    }
  }

  useEffect(() => {

    isConfigPresent()
  }, [])

  function handleChange(text, name) {

    const good = confSchema.pick({ [name]: true }).safeParse({ [name]: text })
    if (!good.success) {
      setError({ ...error, [name]: true })
      return
    }
    setError({ ...error, [name]: false })
    setConf({ ...conf, [name]: text })
  }

  const getStyle = (name) => {
    if (error[name]) {
      return styles.inputError
    }
    return styles.input
  }

  const saveConfiguration = () => {
    const good = confSchemaValidate.safeParse(conf)
    if (!good.success) {
      const errors = good.error.flatten().fieldErrors
      var flagErrors = {}
      for (const key in errors) {
        flagErrors = { ...flagErrors, [key]: true }
      }
      setError(flagErrors)
      setSubmitError(errors)
      setModalErrorVisible(true)
      return
    }


    // connect to server and test connection
    fetch("http://" + good.data.serverIP + ":" + good.data.port + "/healthcheck", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((resp) => {
      if (resp.status == 200) {
        try {
          AsyncStorage.setItem("serverIP", String(good.data.serverIP))
          AsyncStorage.setItem("port", String(good.data.port))
          AsyncStorage.setItem("username", String(good.data.username))
          AsyncStorage.setItem("password", String(good.data.password))
          AsyncStorage.setItem("databaseName", String(good.data.databaseName))
          setConfFound(true)
        } catch (err) {
          console.log("Error while saving configuration ", err)
        }

        Alert.alert("Connessione riuscita", "Configurazione salvata correttamente")
      } else {
        Alert.alert("Connessione fallita", "Controlla se la configurazione è corretta o che il server sia attivo e riprova")
      }
    }).catch((err) => {
      Alert.alert("Connessione fallita", "Controlla se la configurazione è corretta o che il server sia attivo e riprova")
    }
    )

  }


  return (
    <Card style={{padding:10,margin:30}}>
      <View style={styles.container}>
        <Text style={styles.title}>Impostazioni del Server</Text>
        {confFound && <Chip style={{backgroundColor:"#90EE90"}} icon="check">È presente una configurazione</Chip>}
        {!confFound && <Chip style={{backgroundColor:"#eed202"}} icon="exclamation">Ancora nessuna configurazione</Chip>}
        <TextInput
          style={getStyle("serverIP")}
          placeholder="Server IP"
          value={conf.serverIP}
          onChangeText={(text) => handleChange(text, "serverIP")}
        />

        <TextInput
          style={getStyle("port")}
          placeholder="Port"
          value={String(conf.port) || 0}
          onChangeText={(text) => handleChange(text, "port")}
          keyboardType="numeric"
        />

        <TextInput
          textContentType="password"
          style={getStyle("username")}
          placeholder="Username"
          value={conf.username}
          onChangeText={(text) => handleChange(text, "username")}
        />
        <TextInput
          style={getStyle("password")}
          placeholder="Password"
          value={conf.password}
          onChangeText={(text) => handleChange(text, "password")}
          secureTextEntry={true}
        />
        <TextInput
          style={getStyle("databaseName")}
          placeholder="Database Name"
          value={conf.databaseName}
          onChangeText={(text) => handleChange(text, "databaseName")}
        />
        <Button onPress={() => saveConfiguration()} title="Salva Configurazione" />
        <CustomAlertComponent modalVisible={modalErrorVisible} setModalVisible={setModalErrorVisible} errors={submitError} />
      </View>
    </Card>
  );
}


export default SettingComponent;
