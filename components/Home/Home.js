import React, { useEffect, useState } from "react"
import { View, Text, Divider, Button } from "react-native"
import { SafeAreaView } from 'react-native';
import DataView from './DataView';
import ScannerCode from "../Scanner/Scanner"
import { styles } from "../style";
import { useRoute } from "@react-navigation/native"
import HistoryComponent from "./History";
import { Card } from 'react-native-paper';

function HomeComponent({ navigation }) {

  // ABRL312T8FG60

  const route = useRoute()

  const [history, setHistory] = useState([])
  const [currArticle, setCurrArticle] = useState(null)

  useEffect(() => {
    console.log("route params: ", route.params)
    if (route.params !== undefined) {
      // save the scanned code 
      setCurrArticle(route.params)
    }
  }, [route.params])


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {currArticle === null ?
        <Card style={{margin:20}}>
          <View style={{ alignContent: 'center',  margin: 10 }}>
            <Text style={styles.head1}>Nessun articolo al momento</Text>
            <Text style={styles.body1}>Inserisci o scannerizza un codice</Text>
            <Button title="Vai a Scanner" onPress={() => navigation.navigate("Scanner")} />
          </View>
        </Card>
       : <DataView data={currArticle} />}
      <HistoryComponent history={["6543210009400", "6543210009400", "6543210009400"]} onRowPress={() => console.log("clicked")} />
      {currArticle !== null && <View style={{borderTop:10,padding:10}}>
        <Button title="Torna a Scanner"
         onPress={() => navigation.navigate("Scanner")} /></View>}

    </View>
  )
}

export default HomeComponent