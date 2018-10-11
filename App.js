import React from 'react';
import axios from 'axios';
import { StyleSheet, FlatList, Image, Text, View } from 'react-native';

import Header from './components/Header.js';

export default class FlatListBasics extends React.Component {
	constructor(props) {
			super(props);

			this.state = {
				personagens: []
			}
	}

	componentDidMount() {
	  axios
	    .get('https://kitsu.io/api/edge/characters?page[limit]=20')
	    .then(resp => {
	     	const nomes = resp.data.data.map(x => {
	     		return {key: x.attributes.name, img: x.attributes.image.original };
	     	});
	      	console.log(nomes);
	      	this.setState({
	      		personagens: nomes
	      	});
	    });   	
	}

	renderList() {
		const txtElements = this.state.personagens;
		return txtElements;
	}

	render() {
	  return (
	    <View style={styles.container}>
	      <Header title="Personagens" />
	      <FlatList
	      	data={this.renderList()}
	      	renderItem={({item}) => <View><Image style={styles.avatar} source={{ uri: item.img }} /><Text style={styles.item}>{item.key}</Text></View>}
	      />
	    </View>
	  );
	} 
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 0
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  avatar: {
  	aspectRatio: 1,
  	width: 200
  }
})
