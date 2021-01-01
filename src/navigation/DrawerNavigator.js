import { createDrawerNavigator } from "react-navigation-drawer"; 
import  {  HomeNavigator, AccountNavigator, OrderNavigator } from "./ScreenNavigator";
import React from "react";
import {StyleSheet, Image, TouchableOpacity, Text, View, ScrollView} from 'react-native'
 import SafeAreaView from "react-native-safe-area-view";
 import { DrawerItems } from "react-navigation-drawer"; 
import { CartNavigator } from "./ScreenNavigator";
import Wishlist from "../screens/Items/Wishlist"; 
import { connect } from "react-redux";
import About from '../screens/meta/About'
import Policies from "../screens/meta/Policies";
import Checkout from '../screens/Items/Checkout'
import Contact from "../screens/meta/Contact"; 
import AuthNavigator from "./AuthNavigator";
const primaryColor = "#008577"
import Service from './NavigationService'

import Axios from "axios";
import urls from "../../src/utils/urls";

var firstName ="";
var lastName ="";

 class CustomDrawerContentComponent extends React.Component {

  // state ={
  //   firstName : "",
  //   lastName : ""
  // }
  componentDidMount(){
    //this.getUserData(this.props.user.userId)
  }

  openAuth = () => {
    if (this.props.user.userId && this.props.user.userId != "") {
        Service.navigate("Account");
    } else {
        Service.navigate("Auth");
    }
  }

  getUserData = async id => {
    try {
      const res = await Axios.get(urls.userData(id));

      if (res.data.error) {
        showToast(res.data.error);
        return;
      }

      const data = res.data;

      firstName =  data.first_name
      lastName = data.last_name

      // this.setState({
      //   firstName: data.first_name,
      //   lastName: data.last_name,
      // });
    } catch (error) {
      log(error);
    }
  };
  render(){

    this.getUserData(this.props.user.userId)
     return (
       <ScrollView>
         <SafeAreaView
           style={styles.container}
           forceInset={{ top: "always", horizontal: "never" }}>
           <View
             style={styles.navImageContainer}>
             <Image
               resizeMode="contain"
               style={{ width: "80%" }}
               source={require("../../assets/edental.png")}
             />
           </View>
           <TouchableOpacity
              onPress={this.openAuth}
             style={{ backgroundColor: primaryColor, padding: 10 }}>
             <Text style={{ color: "#fff", fontSize: 15 }}>
               {this.props.user.userId == "" ? "Sign In" : " Hi," + firstName + " " + lastName}
             </Text>
           </TouchableOpacity>
           <DrawerItems {...this.props} />
         </SafeAreaView>
       </ScrollView>
     );
  }
 }
const mapStateToProps = (state /*, ownProps*/) => {
  console.log('header', state)
  return {
    user: state 
  };
};
 const ReduxWrappedComponent = connect(
   mapStateToProps,
   null
 )(CustomDrawerContentComponent);

 const styles = StyleSheet.create({
   container: {
     flex: 1
   },
   navImageContainer: {
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: "#fff",
     height: 130
   }
 });

export default MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator
    },
    Account: {
      screen: AccountNavigator
    },
    Auth: {
      screen: AuthNavigator
    },
    Order: {
      screen: OrderNavigator
    },
    cart: {
      screen: CartNavigator
    },
    wishlist: {
      screen: Wishlist
    },
    Contact: {
      screen: Contact
    },
    Policies: {
      screen: Policies
    },
    About: {
      screen: About
    }
  },
  {
    contentComponent: ReduxWrappedComponent
  }
);
 