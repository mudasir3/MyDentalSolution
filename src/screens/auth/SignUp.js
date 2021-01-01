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
import { connect } from 'react-redux'
import actions from "../../redux/user/actions";
import { set } from "../../local_storage/auth_storage";
import storage_keys from "../../utils/storage_keys";
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
          E-Dental Mart
        </Text>
      ),
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: primaryColor
      }
    };
  };

  state = {
    rememberAuth: true,
    email: "",
    password: ""
  };

  validateEmail = (mail) => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        mail
      )
    ) {
      return true;
    } 
    return false;
  }

  validateInput = () => {
    if (this.state.email.trim().length == 0 || !this.validateEmail(this.state.email)) {
      //alert
      showToast('Invalid Email')
      return false
    }

    if (this.state.email.trim().length == 0) {
      showToast('Invalid Password') 
      return false
    } 
    return true;
  };

  _register = async () => {

    console.log(this.props)
    if(!this.validateInput())
      return

    console.log('register')  
    const data = JSON.stringify({
      email: this.state.email,
      password: this.state.password
    }); 
 
    try {
      const res = await Axios.post(urls.createUser, data, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json", 
        }
      });
      
      if(res && res.data.error){
        showToast(res.data.error)
        return
      }
      
      if(res) {
        this.props.saveId(res.data.user_id)
        set(res.data.user_id, storage_keys.USER_ID);
        showToast("Profile created")
        this.props.navigation.navigate("Home")
      }

    }catch(e) {
      console.log(e)
    }

  };

  _onChangeText = (value, key) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: "50%", marginTop: "10%" }}
          resizeMode="contain"
          source={require("../../../assets/edental.png")}
        />

        <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "500" }}>
          Register
        </Text>

        <TextInput
          value={this.state.email}
          style={styles.textInputStyles}
          placeholder="Email Address"
          onChangeText={value => this._onChangeText(value, "email")}
          keyboardType="email-address"
          placeholderTextColor="#444"
        />
        <TextInput
          value={this.state.password}
          style={styles.textInputStyles}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={value => this._onChangeText(value, "password")}
          password={true}
          placeholderTextColor="#444"
        />

        <TouchableOpacity
          onPress={this._register}
          style={styles.registerButtonStyles}>
          <Text style={{ color: "#fff", fontWeight: "500" }}>Register</Text>
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
  registerButtonStyles: {
    backgroundColor: primaryColor,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 35,
    width: "60%"
  }
});
 

 
 
const mapDispatchToProps = dispatch => {
  return { 
    saveId: id => dispatch({ type: actions.SAVE_ID, userId: id })
  };
}

export default connect(null, mapDispatchToProps)(SignUp); 