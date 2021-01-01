//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
 import Axios from "axios";
 import urls from "../../utils/urls";
import { Rating } from 'react-native-ratings';

 const primaryColor = "#008577";

class Reviews extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <Text
          style={{
            fontSize: 23,
            marginStart: 10,
            color: "#fff"
          }}>
          E-Dental Mart
        </Text>
      ),
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: primaryColor
      }
    };
  };

  _renderItem = ({item}) => {

    return (
      <View style={{ height: 70 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Anonymous</Text>
          <Rating
            readonly
            fractions={5}
            imageSize={25}
            startingValue={4}
            style={styles.ratingStyle}
          />
        </View>
        <Text>Currently there are no reviews for this product.</Text>
      </View>
    );

  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
         data={[1,2,3,4,5,6]}
         keyExtractor= {item  => item}
         renderItem = {this._renderItem}
         />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ratingStyle: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 5
  }
});
 
export default Reviews;
