import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput
} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import showToast from "../../utils/toast";
import Axios from "axios";
import urls from "../../utils/urls";
const primaryColor = "#008577";

class SignUp extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <Text
          style={{
            fontSize: 23,
            marginStart: 10,
            color: "#fff"
          }}>
          Reset Password
        </Text>
      ),
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: primaryColor
      } 
    };
  };

  state = {
    email: ""
  };

  _resetPassword =  async () => {
    console.log("_resetPassword");
    if(!this.validateEmail(this.state.email.trim())){ 
      return
    }

    const res = await Axios.get(urls.resetPassword+this.state.email) 
    console.log(res)  
    if(res.data.error){
       showToast(res.data.error);
       return
    }
    showToast(res.data.message)

  };
  
  validateEmail = mail => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 25, width: "85%" }}>
          Lost your password? Please enter your email address. You will receive
          a link to create a new password via email.
        </Text>

        <Text style={{ marginTop: 25, width: "85%" }}>Email</Text>
        <TextInput
          value={this.state.email}
          style={styles.textInputStyles}
          placeholder="Email Address"
          onChangeText={email => this.setState({ email })}
          keyboardType="email-address"
          placeholderTextColor="#444"
        />

        <TouchableOpacity
          onPress={this._resetPassword}
          style={styles.resetButtonStyles}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "500" }}>
            RESET PASSWORD
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

  textInputStyles: {
    width: "80%",
    borderBottomColor: "#999",
    textAlignVertical: "bottom",
    textAlign: "left",
    height: 35,
    marginTop: 10,
    borderBottomWidth: 2
  },
  resetButtonStyles: {
    backgroundColor: primaryColor,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 35,
    width: "70%"
  }
});

export default SignUp;
