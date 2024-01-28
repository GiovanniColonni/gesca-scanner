import React from "react";
import { View,Text,Image } from "react-native";
import { Card } from "react-native-paper";
import { styles } from "../style";

const infoText = `
L'applicazione utilizza la fotocamera del cellulare comescanner, il suo corretto funzionamento potrebbe in parte dipendere dalle condizioni di luce in cui si trova il codice da scansionare e dallo stato dello stesso (se è rovinato o parzialmente assente).

Per ora l'unico tipo di codice a barre supportato è il EAN13, ma c'è la possibilità di aggiungerne molte altri (Qrcode, CODE39, aztec etc.).

Inoltre, per il corretto funzionamento dell'applicazione,è necessario che il dispositivo sia connesso alla rete aziendale, o direttamente o tramite VPN.

Alcuni cellulari (specialmente Apple) potrebbero avere problemi nello scannerizzare i codici a barre, in questo caso si consiglia di utilizzare un altro dispositivo o inserire il codice a mano.
`

function InfoPage() {
  return (
    <Card style={{margin:20,padding:10, maxHeight:"95%"}}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.head1}>Informazioni Applicazione</Text>
        <Text style={styles.body1}>App Version: v1.0.0</Text>
        <Image style={{resizeMode:'contain',width:'50%',maxHeight:"20%"}} source={require('../../assets/icons/logo3.png')} />
        <Text>{infoText}</Text>
       </View>
    </Card>
  )
}

export default InfoPage;