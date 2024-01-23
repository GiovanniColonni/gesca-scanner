import React, { useState } from "react"
import { View, Text, Divider } from "react-native"
import { SafeAreaView } from 'react-native';
import DataView from './DataView';
import ScannerCode from "../Scanner/Scanner"
import { styles } from "../style";

function HomeComponent({ navigation }) {

  const data = {
    "AM_MAGA": "00",
    "AM_CODICE": "ABRL312T8FG60",
    "AM_USABILE": true,
    "AM_LIST1": 0.6825,
    "AM_DES1": "DISCO VELCRO D.125 - 8F. GRANA 60",
    "AM_DISPO": 0,
    "AM_SETMAGA": "A2"
  };

  // ABRL312T8FG60

  const [oldArticles, setOldArticles] = useState([])
  const [currArticle, setCurrArticle] = useState(null)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScannerCode setCurentArticle={setCurrArticle} setOldArticles={setOldArticles} />
      {currArticle === null ? <>
        <Text style={styles.head1}>Nessun articolo al momento</Text>
        <Text style={styles.body1}>inserisci o scannerizza un codice</Text>
      </> : <DataView data={currArticle} />}
      {oldArticles.length > 0 && <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.head1}>Articoli scansionati</Text>
        {oldArticles.map((article, index) =>
          <>
            <Divider />
            <DataView key={index} data={article} />
            <Divider />
          </>
        )}
      </SafeAreaView>}
    </View>
  )
}

export default HomeComponent