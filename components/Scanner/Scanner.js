import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Button } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { CameraView, Camera } from "expo-camera/next";
import { BarCodeScanner } from 'expo-barcode-scanner';
import ScanButton from './ScanButton';

function ScannerCode({ navigation }) {

    const barcodeTypes = [
        //BarCodeScanner.Constants.BarCodeType.qr,
        //BarCodeScanner.Constants.BarCodeType.code39,
        //BarCodeScanner.Constants.BarCodeType.code128,
        //BarCodeScanner.Constants.BarCodeType.code93,
        BarCodeScanner.Constants.BarCodeType.ean13,
    ]

    const [code, setCode] = useState("")
    const [path, setPath] = useState("")
    const [articolo,setArticolo] = useState({})

    useFocusEffect(() => {
        if (path === "") {
            let addr = ""
            let port = ""
            
            AsyncStorage.getItem("serverIP").then((res) => {
                addr = res
                AsyncStorage.getItem("port").then((res) => {
                    port = res
                    if (addr === null || port === null) {
                        return
                    }
        
                    setPath("http://" + addr + ":" + port)
                })    
            })
        }
    })



    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setOpenCamera(false)

        setCode(data)
        setStartSearch(!startSearch)
    };

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [openCamera, setOpenCamera] = useState(false)
    const [startSearch, setStartSearch] = useState(false)

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getCameraPermissions();
        return () => {}
    }, []);

    useEffect(() => {
        const search = async () => {
            if (code === "") {
                Alert.alert("Errore", "Sembra che tu non abbia inserito nessun codice articolo")
                return
            }

            try {

                const resp = await fetch(path + "/articolo/" + code, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                if (resp.status !== 200) {
                    Alert.alert("Errore", `Articolo ${code} non trovato`)
                    return
                }

                const articolo = await resp.json()
                setCode("")
                setArticolo(articolo)

            } catch (e) {
                console.log("Error in handleSearch: ", e)
            }

            return
        };

        if (code !== "") {
            search()
        }

        return () => {}
    }, [startSearch]);

    useEffect(() => {
        if(Object.keys(articolo).length > 0){
            navigation.navigate("Articolo", articolo)
        }
    }, [articolo])

    const activateScanner = () => {
        setScanned(false)
        setOpenCamera(prev => !prev)
    }


    if (path === "") {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 5, padding: 5 }}>
                <Text style={{ fontSize: 20, marginBottom: 10 }}>Prima di iniziare configura applicazione</Text>
                <Button title="Vai a Impostazioni" onPress={() => navigation.navigate("Impostazioni")} />
            </View>
        )
    }

    return (
    <View style={{ flex: 1 }}>
        {openCamera && (
            <View style={styles_.cameraContainer}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles_.cameraContainer}
                    barCodeTypes={barcodeTypes}
                />
            </View>
        )}
        {!openCamera && <View style={styles_.bottomContainer}>
            <TextInput
                style={styles_.textInput}
                placeholder="Inserisci codice articolo"
                onChangeText={(text) => setCode(text)}
            />
            <Button title="Cerca" onPress={() => setStartSearch(!startSearch)} />
        </View>}
        {!openCamera && <ScanButton onPress={activateScanner} />}
        {openCamera && <Button title="Chiudi Scanner" onPress={() => setOpenCamera(false)} />}

    </View>
    );
}

const styles_ = StyleSheet.create({
    cameraContainer: {
        flex: 1, // Camera takes up the upper part of the screen
        // Additional styling for the camera container if needed
        margin: 7,
        maxHeight: "80%",
    },
    bottomContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        padding: 7,
        // If you want to limit the height of this container, you can add height here
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 3,
        paddingHorizontal: 10,
    },
    // ... any additional styles you need ...
});

export default ScannerCode;
