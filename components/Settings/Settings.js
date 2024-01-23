import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button, Alert } from "react-native";
import { confSchema, confSchemaValidate } from "./Model";
import CustomAlertComponent from "./ErrorModal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../style";

function SettingComponent({ navigation }) {

  const [error, setError] = useState({
    serverIP: false,
    port: false,
    username: false,
    password: false,
    databaseName: false,
  })

  const [submitError, setSubmitError] = useState({})

  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  const [conf, setConf] = useState(confSchema.parse({}));

  function handleChange(text, name) {

    const good = confSchema.pick({ [name]: true }).safeParse({ [name]: text })
    if (!good.success) {
      console.log(good.error)
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

    console.log("GOOD", good.data)

    // connect to server and test connection
    fetch("http://" + good.data.serverIP + ":" + good.data.port + "/healthcheck", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((resp) => {
      if (resp.status == 200) {
        try{
          AsyncStorage.setItem("serverIP", String(good.data.serverIP))
          AsyncStorage.setItem("port", String(good.data.port))
          AsyncStorage.setItem("username", String(good.data.username))
          AsyncStorage.setItem("password", String(good.data.password))
          AsyncStorage.setItem("databaseName", String(good.data.databaseName))

        }catch(err){
          console.log("Error while saving configuration ",err)
        }
        
        Alert.alert("Connessione riuscita", "Configurazione salvata correttamente")
      } else {
        Alert.alert("Connessione fallita", "Controlla se la configurazione è corretta")
      }
    }).catch((err) => {
      Alert.alert("Connessione fallita", "Controlla se la configurazione è corretta")
    }
    )

  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Impostazioni del Server</Text>
      <Text>Modifica le impostazioni e Testa la connessione</Text>

      <TextInput
        style={getStyle("serverIP")}
        placeholder="Server IP"
        value={conf.serverIP}
        onChangeText={(text) => handleChange(text, "serverIP")}
      />

      <TextInput
        style={getStyle("port")}
        placeholder="Port"
        value={String(conf.port)}
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
  );
}


export default SettingComponent;
