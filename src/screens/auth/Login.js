import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Image, TextInput,ActivityIndicator } from 'react-native';
import { Ionicons as Icon } from "@expo/vector-icons";  

const primaryColor = "#008577";
import { connect } from "react-redux";
import actions from "../../redux/user/actions";
import showToast from "../../utils/toast";
import Axios from "axios";
import urls from "../../utils/urls";
import { set } from '../../local_storage/auth_storage';
import { get } from '../../local_storage/auth_storage';

import storage_keys from '../../utils/storage_keys';

class Login extends Component {
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
      headerStyle: {
        backgroundColor: primaryColor
      },
      headerTintColor: "white",
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

  state = {
    rememberAuth: true,
    email: "",
    password: "",
    loading: false,
    inProgress: false
  };

  rememberClicked = () => {
    this.setState({
      rememberAuth: !this.state.rememberAuth
    });
  };

  validateEmail = mail => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  validateInput = () => {
    if (
      this.state.email.trim().length == 0 ||
      !this.validateEmail(this.state.email)
    ) {
      showToast("Invalid Email");
      this.setState({ loading: false })
      return false;
    }

    if (this.state.email.trim().length == 0) {
      showToast("Invalid Password");
      this.setState({ loading: false })
      return false;
    }
    return true;
  };

  _login = async () => {
    this.setState({ loading: true })

    console.log("_login");
    if (!this.validateInput()) return;

    const data = JSON.stringify({
      username: this.state.email,
      password: this.state.password
    }); 

    this.setState({
      inProgress: true
    });
    // console.log(data)
    // console.log(urls.login);

    try {
      const res = await Axios.post(urls.login, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      console.log("Login "+res);
      if (res && res.data.error) {
        this.setState({
          inProgress: false
        });
        showToast(res.data.error);
        this.setState({ loading: false })
        return;
      }
      if (res) {
        this.setState({
          inProgress: false
        });
        //this.props.saveId(res.data.user.ID);
        set(res.data.user.ID, storage_keys.USER_ID);
        this.props.saveId(res.data.user.ID)

        this.checkId()
        this.props.navigation.navigate("Home")
      }
    } catch (e) {
      this.setState({ loading: false })
      console.log(e);
      showToast("Couldn't process the request, try again.")
      this.setState({
        inProgress: false
      });
    }
  };

  checkId  () {
    // this.userId = await get(storage_keys.USER_ID);

     var userId =  get(storage_keys.USER_ID);

     log("loginnnn user id : ", userId);
   };

  _onChangeText = (value, key) => {
    this.setState({
      [key]: value
    });
  };

  _signUp = () => {
    this.props.navigation.navigate("SignUp");
  };

  _forgotPassword = () => {
    this.props.navigation.navigate("ResetPassword");
  }

  render() {
    return (
      <View style={styles.container}>

        <Image
          style={{ width: "50%", marginTop: "10%" }}
          resizeMode="contain"
          source={require("../../../assets/edental.png")}
        />

        <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "500" }}>
          Login
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

            <View>
              {this.state.inProgress ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator size="large" color={primaryColor} />
                </View>
              ) : null}
            </View>


        <View style={styles.forgotPassContainer}>
          <TouchableOpacity
            onPress={this.rememberClicked}
            style={{ flexDirection: "row" }}>
            <Icon
              name={
                this.state.rememberAuth ? "md-checkbox" : "md-checkbox-outline"
              }
              color={primaryColor}
              size={20}
            />
            <Text style={{ marginStart: 5 }}>Remember Me</Text>
          </TouchableOpacity>
          <Text onPress={this._forgotPassword}>Forgot your Password?</Text>
        </View>
        
        {!this.state.loading ?
          <TouchableOpacity
            onPress={this._login}
            style={styles.loginButtonStyles}>
            <Text style={{ color: "#fff", fontWeight: "500" }}>Log In</Text>
          </TouchableOpacity> :
          <View style={styles.loginButtonStyles}>
           <ActivityIndicator  color="white" />
          </View>
        }
        

        <Text
          onPress={this._signUp}
          style={{ marginTop: 25, fontSize: 18, fontWeight: "400" }}>
          Register
        </Text>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  forgotPassContainer: {
    width: "80%",
    marginTop: "8%",
    height: 40,
    justifyContent: "space-between",
    paddingStart: 15,
    paddingEnd: 15,
    flexDirection: "row"
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
  loginButtonStyles: {
    backgroundColor: primaryColor,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "60%"
  }
});
 
  
const mapDispatchToProps = dispatch => {
  return {
    saveId: id => dispatch({ type: actions.SAVE_ID, userId: id })
  };
};


export default connect(null, mapDispatchToProps)(Login); 