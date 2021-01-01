import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Linking } from 'react-native';
 import { Ionicons as Icon,  FontAwesome } from "@expo/vector-icons";

 const primaryColor = "#008577";
class Contact extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <Text
          style={{
            fontSize: 23,
            marginStart: 10,
            color: "#fff"
          }}>
          Contact Us
        </Text>
      ),
      headerStyle: {
        backgroundColor: primaryColor
      },
      drawerLabel: "Contact Us",
      drawerIcon: ({ tintColor }) => (
        <FontAwesome name="phone" size={25} color={tintColor} />
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

  getAndroidVersion = version => {
    if (version === 21 || version === 22) return "Android 5.0 Lollipop";
    else if (version === 23) return "Android 6.0 Marshmallow";
    else if (version == 24 || version == 25) return "Android 7.0 Nougat";
    else if (version == 26 || version == 27) return "Android 8.0 Oreo";
    else if (version == 28) return "Android 9.0 Pie";
    else if (version == 29) return "Android 10 Q";
    else return version;
  };

  componentDidMount() {
    this.didBlurSubscription = this.props.navigation.addListener(
      "didFocus",
      payload => {
        const userId = 'user id';
        const userName = 'nick name';
        if (Platform.OS === "ios") {
          const version = Platform.Version;
          const type = Platform.isPad ? "IPad" : "IPhone";
          const data = `Please share with us any feedback you might have.\nUsername: ${userName}\nid: ${userId}\nDevice type: ${type} \nSystem version: ${version} \nApplication version: 1.0.0`;
          Linking.openURL(
            `mailto:support@mpset.co?subject=Feedback on MPSET app from user&body=${data}`
          );
        } else {
          const version = this.getAndroidVersion(Platform.Version);
          const data = `Please share with us any feedback you might have.\nUsername: ${userName}\nid: ${userId}\nDevice type: Android \nSystem version: ${version} \nApplication version: 1.0.0`;
          Linking.openURL(
            `mailto:support@mpset.co?subject=Feedback on MPSET app from user&body=${data}`
          );
        }
        this.props.navigation.dangerouslyGetParent().goBack();
      }
    );
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }
  render() {
    return <View style={styles.container}></View>;
  }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,  
    },
});
 
export default Contact;
