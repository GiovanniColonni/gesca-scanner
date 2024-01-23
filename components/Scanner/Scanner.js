import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet } from 'react-native';
import { CameraView, Camera } from "expo-camera/next";

function ScannerCode({ setCurentArticle, setOldArticles }) {

    const [code, setCode] = useState("")

    const handleSearchPress = async () => {
        console.log("Search button pressed");
        // Add your search functionality here

        if (code === "") {
            Alert.alert("Errore", "Sembra che tu non abbia inserito nessun codice articolo")
        }

        try {
            const addr = await AsyncStorage.getItem("serverIP")
            const port = await AsyncStorage.getItem("port")

            const resp = await fetch("http://" + addr + ":" + port + "/articolo/" + code, {
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
            setOldArticles(prev => [...prev, articolo])

            setCurentArticle(articolo)
        } catch (e) {
            console.log("Error in handleSearch: ", e)
        }


    };

    const handleOpenScanner = () => {
        console.log("Open scanner button pressed");
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getCameraPermissions();
    }, []);

    const activateScanner = () => {
        setScanned(false)
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <CameraView
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barCodeTypes: ["qr", "pdf417"],
                }}
                style={StyleSheet.absoluteFillObject}
            />

            <TouchableOpacity onPress={handleOpenScanner}>
                <AntDesign
                    name="camera"
                    size={30}
                    color={'#ccc'}
                    onPress={() => activateScanner}
                />
            </TouchableOpacity>
            <TextInput
                style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', marginRight: 10, paddingHorizontal: 10 }}
                placeholder="Inserisci codice articolo"
                onChangeText={text => setCode(text)}
            />
            <TouchableOpacity onPress={handleSearchPress}>
                <AntDesign
                    name="search1"
                    size={30}
                    color={'#ccc'}
                />
            </TouchableOpacity>
        </View>
    );
}

export default ScannerCode;
