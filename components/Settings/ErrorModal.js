import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function CustomAlertComponent({ modalVisible, setModalVisible, errors }) {

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Errore</Text>
                        <Text style={styles.modalMessage}>Ci sono errori nella configurazione:</Text>
                        <View style={styles.leftView}>
                            {
                                Object.keys(errors).map((key, idx_) => {
                                    return (
                                        <View key={idx_}>
                                            <Text style={styles.modalError}>{`\u2022 ${errors[key]}`}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    leftView: {
        alignItems: 'flex-start',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    modalMessage: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalError: {
        textAlign: 'left',
        color: 'red', // Customize error message color
    },
    button: {
        width: 100,
        marginTop: 10,
        padding: 12,
        elevation: 2,
        backgroundColor: '#2196F3', // Customize button color
    },
    textStyle: {
        color: 'white', // Customize text color
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CustomAlertComponent;
