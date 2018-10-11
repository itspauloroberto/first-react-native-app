import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header.js';

export default class App extends React.Component {
   renderList() {
     axios
       .get('https://kitsu.io/api/edge/characters?page[limit]=5')
       .then(resp => {
          const { results } = resp.data.data,
            nomes = results.map(x => { 
          return <Text key={x.attributes.name}>{x.attributes.name}</Text>;
        });
         return nomes;
       });
   }

  render() {
    return (
      <View>
        <Header title="Pessoas!" />
        {this.renderList()}
      </View>
    );
  } 
}
