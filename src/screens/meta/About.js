import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
 import { Ionicons as Icon, AntDesign as AntIcon } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";

 const primaryColor = "#008577";
class About extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <Text
          style={{
            fontSize: 23,
            marginStart: 10,
            color: "#fff"
          }}>
          About
        </Text>
      ),
      headerStyle: {
        backgroundColor: primaryColor
      },
      drawerLabel: "About",
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-information-circle" size={25} color={tintColor} />
      ),
      headerLeft: () => (
        <Icon
          onPress={() => navigation.openDrawer()}
          style={{ marginStart: 20 }}
          name="md-menu"
          size={25}
          color="#fff"
        />
      )
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={{
            height: "8%",
            alignSelf: "center",
            marginTop: 50,
            marginBottom: 50
          }}
          source={require("../../../assets/edental.png")}
        />

        <Text style={{ width: "85%", alignSelf: "center" }}>
          E-Dental Mart is Pakistan’s first online dental store, which provides
          the reasonable prices of all dental products with assurance of
          originality and quality. Dental Shoppe gives a platform to the
          dentist, dental students and lab personnels to find the complete range
          of products at affordable prices under one roof.
        </Text>

        <Text
          style={{ marginTop: 50, fontSize: 18, color: primaryColor, alignSelf: "center" }}>
          Version No. 10
        </Text>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
});
export default createStackNavigator(
  {
    "About": {
      screen: About
    }
  },
  {
    navigationOptions: {
      drawerLabel: "About",
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-information-circle" size={25} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: primaryColor
      }
    }
  }
);
  