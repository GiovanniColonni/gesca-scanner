import React, { useState } from 'react';
import { Button,View,Text } from 'react-native';
import { primaryColor,secondaryColor, styles } from "../style";
import { Card } from 'react-native-paper';
import { DataTable } from 'react-native-paper';

const HistoryComponent = ({ navigation }) => {

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 5, 10, 15]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = React.useState([
    { 
      key: 1,
      codice: '6543210009400',
      altro: 'che ci sta qui ?',
    },
    {
      key: 2,
      codice: '6543210009400',
      altro: 'che ci sta qui ?',
    },
    {
      key: 3,
      codice: '6543210009400',
      altro: 'che ci sta qui ?',
    },
    {
      key: 4,
      codice: '6543210009400',
      altro: 'che ci sta qui ?',
    }, {
      key: 5,
      codice: '6543210009400',
      altro: 'che ci sta qui ?',
    }
  ])

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  return (
    <Card style={{ margin: 10 }}>
      <Text style={styles.titleCronologia}>Storico</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Codice</DataTable.Title>
          <DataTable.Title>Altro</DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell >{item.codice}</DataTable.Cell>
            <DataTable.Cell>{item.altro}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Righe per pagina'}
        />
      </DataTable>
      <View style={{ borderTop: 10, padding: 10 }}>
        <Button title="Vai a Scanner" color={secondaryColor}
          onPress={() => navigation.navigate("Scanner")} />

      </View>
      
      <View style={{ borderTop: 10, padding: 10 }}>
        <Button title="Vai a Articolo" color={primaryColor}
          onPress={() => navigation.navigate("Articolo")} />
      </View>
      
    </Card>
  );
};


export default HistoryComponent;

