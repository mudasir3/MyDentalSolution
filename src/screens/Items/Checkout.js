import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
 const primaryColor = "#008577";
 import { Ionicons as Icon } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";
import { connect } from "react-redux";
import Axios from "axios";
import urls from "../../utils/urls";
import showToast from "../../utils/toast";
import { TextInput } from 'react-native-gesture-handler'; 
const log = console.log

import { get } from '../localStorage/cart'; 

class Checkout extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <Text
          style={{
            fontSize: 23,
            marginStart: 10,
            color: "#fff"
          }}>
          Checkout
        </Text>
      ),
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: primaryColor
      }
    };
  };

  state = {
    items :[],
    cashOnDelivery: true,
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
    additionalInformation: "",
    totalPrice: 0,
    totalItems: 0
  };

  componentDidMount() {
    this.getUserData(this.props.user.userId);
    this.getCartData()
  }

  getCartData =  async() => {
    const value = await get();
    var price = 0;
    var itemquantity =0;

    if(value!=null && value!= "" && value!= [] )
    {
    convertedArray = JSON.stringify(value)
    }
    value.map((val) =>
    {
      if(val.price!= undefined &&val.price!= null && val.price!= "")
      {
      price = Number(price) + Number(val.price)
      }
      if(val.quantity!= undefined &&val.quantity!= null && val.quantity!= "")
      {
      itemquantity = itemquantity + val.quantity
      }
      console.log("price " + val.price)
    })
    this.setState({
      items:value,
      totalPrice : price,
      totalItems : itemquantity
    })
  }; 

  getUserData = async id => {
    try {
      log("getUserData" + id);
      const res = await Axios.get(urls.userData(id));

      if (res.data.error) {
        showToast(res.data.error);
        return;
      }

      const data = res.data;
      this.setState({
        firstName: data.first_name,
        lastName: data.last_name,
        address: data.billing.address_1 + " " + data.billing.address_1,
        city: data.billing.city,
        state: data.billing.state,
        email: data.email,
        phone: data.billing.phone,
        additionalInformation: "",
       // totalPrice: 0,
       // totalItems: 0
      });
    } catch (error) {
      log(error);
    }
  };

  _cashOnDelivery = () => {
    this.setState({
      cashOnDelivery: !this.state.cashOnDelivery
    });
  };

  validateData = () => {
    
    if (this.state.firstName.trim().length == 0) {
      showToast("First name cannot be empty");
      return false;
    }
    if (this.state.lastName.trim().length == 0) {
      showToast("Last name cannot be empty");

      return false;
    }
    
    if (this.state.address.trim().length == 0) {
      showToast("Address cannot be empty");
      return false;
    }
    if (this.state.city.trim().length == 0) {
      showToast("City cannot be empty");
      return false;
    }
    if (this.state.state.trim().length == 0) {
      showToast("State cannot be empty");
      return false;
    }
    if (this.state.phone.trim().length == 0) {
      showToast("Phone cannot be empty");
      return false;
    }

    return true;
  };

  _placeOrder = async () => {

    if(!this.validateData()){
      return
    }


    const billing = {
      customer_id: this.props.user.userId,
      firstName: this.state.first_name,
      lastName: this.state.last_name,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      email: this.state.email,
      phone: this.state.phone,
      additionalInformation: this.state.additionalInformation
    };

    const shipping = {
      customer_id: this.props.user.userId,
      firstName: this.state.first_name,
      lastName: this.state.last_name,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state, 
    }
    //TODO : load items from cart and populate line_items 
    const line_items = []; 

    this.state.items.map((cartItem) =>
    {
      var Prod = {"quantity" :cartItem.quantity,"product_id" : cartItem.id }
      line_items.push(Prod)
    })
    
    const orderData = {
      customer_id: this.props.user.userId,
      order_number: Date(),
      payment_method: "dos",
      billing: billing,
      shipping: shipping,
      set_paid: "false",
      payment_method_title: "Cash on delivery",
      line_items
    };

   
    const data = JSON.stringify(orderData);

    console.log("Order dataa ", data)
    try {
      const res = await Axios.post(urls.order, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });

      if(res.data.error){
        showToast(res.data.error)
      }

      showToast("Order placed successfully")
      //TODO : remove items from cart
      this.props.navigation.dangerouslyGetParent().goBack();
       console.log(" RES " + res);
    } catch (error) {
      console.log("ERRORR "+error);
      showToast("Couldn't process the order")
    }
 
  }

  render() {
    console.log("itemssss " +JSON.stringify(this.state.items))
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={85}
        style={{ flex: 1 }}
        behavior="padding">
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          {this.state.items.map(value => (
            <View style={styles.itemContainer}>
              <Text style={{ flex: 0.55 }}>
                {value.title}
              </Text>
              <Text style={{ flex: 0.15, textAlign: "center" }}>{value.quantity}X</Text>
          <Text style={{ flex: 0.3, textAlign: "center" }}>{value.price} .Rs</Text>
            </View>
          ))}

          <View style={[styles.aggregateBreaker, { marginTop: 15 }]} />
          <View style={styles.aggregateContainer}>
            <Text style={styles.aggregateText}>Items: {this.state.totalItems}</Text>
          <Text style={styles.aggregateText}>{this.state.totalPrice} .Rs</Text>
          </View>
          <View style={styles.aggregateBreaker} />

          <Text
            style={[
              styles.aggregateText,
              {
                width: "85%",
                textAlign: "right",
                alignSelf: "center",
                marginTop: 10
              }
            ]}>
            13.65 USD
          </Text>

          <View style={{ flexDirection: "row", marginStart: "5%" }}>
            <Icon
              onPress={this._cashOnDelivery}
              name={
                this.state.cashOnDelivery
                  ? "md-radio-button-on"
                  : "md-radio-button-off"
              }
              size={25}
              color={primaryColor}
            />
            <Text style={[styles.aggregateText, { marginStart: 5 }]}>
              CASH ON DELIVERY
            </Text>
          </View>

          <Text
            style={[styles.aggregateText, { alignSelf: "center", margin: 10 }]}>
            Billing Details
          </Text>

          <View style={styles.nameContainer}>
            <View style={{ flex: 0.48 }}>
              <Text style={styles.valueHeader}>first name</Text>
              <Text style={styles.valueText}>{this.state.firstName}</Text>
            </View>

            <View style={{ flex: 0.48 }}>
              <Text style={styles.valueHeader}>last name</Text>
              <Text style={styles.valueText}>{this.state.lastName}</Text>
            </View>
          </View>

          <View style={styles.valueContainer}>
            <Text style={styles.valueHeader}>Billing address</Text>
            <Text style={styles.valueText}>{this.state.address}</Text>
          </View>

          <View style={styles.addressContainer}>
            <View style={{ flex: 0.48 }}>
              <Text style={{ fontSize: 13, color: "#999" }}>city</Text>
              <Text style={styles.valueText}>{this.state.city}</Text>
            </View>

            <View style={{ flex: 0.48 }}>
              <Text style={{ fontSize: 13, color: "#999" }}>state</Text>
              <Text style={styles.valueText}>{this.state.state}</Text>
            </View>
          </View>

          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{this.state.email}</Text>
          </View>

          <View style={styles.valueContainer}>
            <Text style={styles.valueHeader}>phone number</Text>
            <Text style={styles.valueText}>{this.state.phone}</Text>
          </View>

          <View style={styles.valueContainer}>
            {/* <Text style={styles.valueText}>
              {this.state.additionalInformation}
            </Text> */}
            <TextInput
              style={styles.valueText}
              value={this.state.additionalInformation}
              onChangeText={additionalInformation =>
                this.setState({ additionalInformation })
              }
            />
          </View>
        </ScrollView>
        <TouchableOpacity 
            onPress={this._placeOrder} 
            style={styles.placeOrderButton}>
          <Text style={styles.placeOrderText}>PLACE AN ORDER NOW</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 25
  },
  nameContainer: {
    flexDirection: "row",
    width: "95%",
    alignSelf: "center",
    justifyContent: "space-between"
  },
  addressContainer: {
              flexDirection: "row",
              width: "95%",
              marginTop: 15,
              alignSelf: "center",
              justifyContent: "space-between"
            },
  itemContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: "95%",
    minHeight: 25,
    alignItems: "flex-start"
  },
  valueContainer: {
    width: "95%",
    alignSelf: "center",
    marginTop: 15
  },
  valueHeader: { fontSize: 13, color: "#999" },
  valueText: {
    fontSize: 18,
    borderBottomColor: "#888",
    marginTop: 5,
    borderBottomWidth: 2
  },

  aggregateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    padding: 10,
    paddingStart: 0,
    paddingEnd: 0,
    width: "85%"
  },
  aggregateText: { fontSize: 18, fontWeight: "bold", color: primaryColor },
  aggregateBreaker: {
    width: "95%",
    height: 2,
    backgroundColor: primaryColor,
    alignSelf: "center"
  },
  placeOrderButton: {
    width: "100%",
    padding: 13,
    backgroundColor: primaryColor,
    alignSelf: "center",
    marginTop: 20,
    position: "absolute",
    alignItems: "center",
    bottom: 2
  },
  placeOrderText: { fontSize: 18, fontWeight: "bold", color: "#fff" }
});
  const mapStateToProps = ( state ) => {
  return {
    user: state
  };
};
 
export default connect(mapStateToProps, null)(Checkout); 
    
