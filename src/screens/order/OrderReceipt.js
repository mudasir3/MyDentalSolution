import React, { Component } from 'react';
import { View, Text,TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Image, StyleSheet } from 'react-native';
const primaryColor = "#008577";
import { connect } from "react-redux";

import {
  Ionicons as Icon,
  MaterialIcons as MIcon, 
} from "@expo/vector-icons"; 
import Axios from 'axios';
import urls from '../../utils/urls';
import showToast from '../../utils/toast';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';
 
const log = console.log
const Card = props => {
    return (<View style = {[props.style, {backgroundColor: '#fff', borderRadius: 10,   padding: 10, paddingStart: 15, paddingEnd: 15}]}>
        {props.children}
    </View>)
}

  CustomerMessage = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 2,
        justifyContent: "flex-end"
      }}>
      <View
        style={{
          backgroundColor: primaryColor,
          padding: 5,
          maxWidth: "60%",
          minWidth: "40%",
          borderRadius: 5
        }}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          {item.sent_by}
        </Text>
        <Text style={{ color: "#fff", fontSize: 15 }}>
          {item.message} 
        </Text>
        <Text style={{ color: "#fff", fontSize: 15 }}>{item.senton}</Text>
      </View>
      <Image
        style={{ width: 25, height: 25, marginStart: 5 }}
        resizeMode="contain"
        source={require("../../../assets/account.png")}
      />
    </View>
  );

  AdminMessage = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 2,
        justifyContent: "flex-start"
      }}>
      <Image
        style={{
          width: 25,
          height: 25,
          borderRadius: 12,
          marginEnd: 5
        }}
        resizeMode="contain"
        source={require("../../../assets/admin.png")}
      />
      <View
        style={{
          backgroundColor: "#fff",
          padding: 5,
          borderWidth: 0.3,
          elevation: 2,
          borderColor: "#ddd",
          maxWidth: "60%",
          minWidth: "40%",
          borderRadius: 5
        }}>
        <Text style={{ color: primaryColor, fontWeight: "bold" }}>
          {item.sent_by}
        </Text>
        <Text style={{ color: primaryColor, fontSize: 15 }}>
          {item.message}
        </Text>
        <Text style={{ color: primaryColor, fontSize: 15 }}>{item.senton}</Text>
      </View>
    </View>
  );


 
class OrderReceipt extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <Text
          style={{
            fontSize: 22,
            marginStart: 10,
            color: "#fff"
          }}>
          Order Receipt
        </Text>
      ),
      headerStyle: {
        backgroundColor: primaryColor
      },
      headerTintColor: "white"
    };
  };

  state = {
    order: undefined,
    message: "",
    showMessages: false,
    messages: []
  };

  constructor(props) {
    super(props);

    this.orderId = this.props.navigation.state.params.id;
    this.focusListener = this.props.navigation.addListener(
      "willFocus",
      payload => {
        if (!this.props.user.userId) {
          //this.props.navigation.dangerouslyGetParent().navigate("Auth");
        }
      }
    );
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  componentDidMount() {
    this.getOrderMessages();
    this.getOrderDetails();
  }

  getOrderMessages = async () => {
    log("getOrderMessages");
    try {
      const res = await Axios.get(urls.messages(this.orderId));
      if (res.data.error) {
        //showToast(res.data.error)
        return;
      }
      const messages = []; 
      res.data.forEach(message => {
        const temp = JSON.parse(message.convo_thread);
        temp.forEach(item => {
             messages.push(item);  
        })
       
      });
 
      this.setState({ messages });
    } catch (error) {
      log(error);
      showToast("Couldn't load data, try again");
    }
  };

  getOrderDetails = async () => {

    try { 
      const res = await Axios.get(urls.orderDetails(this.orderId));
      
      if (res.data.error) {
        showToast(res.data.error);
        return;
      }

      var date = res.data.order.created_at

      var d = new Date(date)
      console.log("getOrderDetails " + d )

      this.setState({ order: res.data.order, showMessages: true }); 

    } catch (error) {
      log(error);
    }

  };

  _sendMessage = async () => {
    log("sendMessage");
 
    const messageText = this.state.message.trim();
    if (messageText.length == 0 || !this.state.order) return;
    const name = `${this.state.order.customer.first_name} ${this.state.order.customer.last_name}`;
    const message = {
      sent_by: name,
      message: messageText,
      user: "",
      senton: moment(new Date()).format("YYYY-MM-dd HH:mm:ss"),
      files: ""
    };
    const data = JSON.stringify({
      order_id: this.orderId,
      message_object: message
    });
    const res = await Axios.post(urls.sendMessage, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });

    log(res);

    if(res.data.error) {
      showToast(res.data.error)
      return
    }

    if(res.data.message && res.data.message == 'Message sent') {

      this.setState({ message: '', messages: [...this.state.messages, message] });
    }


  };

  _trackOrder = () => {
    log("trackOrder");
    if(this.orderId)
    this.props.navigation.navigate("OrderTrack",
         { status: this.state.order.status, id : this.orderId });
  };

  _renderMessage = ({item}) =>{
    const name = `${this.state.order.customer.first_name} ${this.state.order.customer.last_name}`;
    
     if(item.sent_by == name) {
       return (<CustomerMessage item={item} />)
     }else {
       return <AdminMessage item={item} />;
     }
 
  }

  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={120}
        behavior="padding"
        style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='always'>
          <Card>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
              <Text
                style={{
                  color: primaryColor,
                  fontSize: 18,
                  fontWeight: "bold"
                }}>
                Status:{" "}
                <Text
                  style={{
                    color: "#333",
                    fontSize: 15,
                    fontWeight: "normal"
                  }}>
                  {this.state.order && this.state.order.status}
                </Text>
              </Text>
              <TouchableOpacity
                onPress={this._trackOrder}
                style={{
                  backgroundColor: primaryColor,
                  padding: 10,
                  paddingStart: 15,
                  paddingEnd: 15
                }}>
                <Text style={{ color: "#fff", fontSize: 15 }}>TRACK ORDER</Text>
              </TouchableOpacity>
            </View>
          </Card>

          <Card style={{ marginTop: 15 }}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 5
                }}>
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  ITEM
                </Text>
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  QTY
                </Text>
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  PRICE
                </Text>
              </View>

              {this.state.order && this.state.order.line_items.map(item => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 5
                  }}>
                  <Text style={{ flex: 0.339 }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      flex: 0.339,
                      textAlign: "center"
                    }}>
                    {item.quantity}
                  </Text>
                  <Text style={{ flex: 0.339, textAlign: "right" }}>
                    {item.total}
                  </Text>
                </View>
              ))}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 5
                }}>
                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  Total
                </Text>

                <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                  {this.state.order && this.state.order.total}
                </Text>
              </View>

              <View
                style={{
                  height: 2,
                  backgroundColor: "#dadada",
                  width: "100%",
                  margin: 10,
                  alignSelf: "center"
                }}
              />

              <View
                style={{
                  justifyContent: "space-between",
                  width: "50%",
                  alignSelf: "flex-end",
                  flexDirection: "row"
                }}>
                <Text style={{ textAlign: "right" }}>Shipping</Text>
                <Text>
                  {this.state.order && this.state.order.total_shipping}
                </Text>
              </View>

              <View
                style={{
                  justifyContent: "flex-end",
                  marginTop: 10,
                  flexDirection: "row"
                }}>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    paddingTop: 8,
                    flex: 0.5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingBottom: 8,
                    backgroundColor: primaryColor
                  }}>
                  <Text style={{ color: "#fff" }}>Subtotal </Text>
                  <Text style={{ fontWeight: "bold", color: "#fff" }}>
                    {"       "}
                    {this.state.order && this.state.order.subtotal}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>

          <Text style={{ fontSize: 18, fontWeight: "500", margin: 15 }}>
            Customer Details
          </Text>

          <Card>
            <View>
              <Text style={styles.detailsHeader}>Contact Information</Text>
              <Text>
                {this.state.order &&
                  `${this.state.order.customer.first_name} ${this.state.order.customer.last_name}`}
              </Text>
              <Text>
                {this.state.order &&
                  this.state.order.customer.billing_address.phone}
              </Text>
              <Text style={styles.detailsHeader}>Shipping Address</Text>
              <Text>
                {this.state.order &&
                  `${this.state.order.customer.shipping_address.first_name} ${this.state.order.customer.shipping_address.last_name}`}
              </Text>
              <Text style={styles.detailsHeader}>DATE</Text>
              <Text>
                {this.state.order &&
                  new Date(this.state.order.created_at).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    }
                  )}
              </Text>
            </View>
          </Card>

          <Card style={{ marginTop: 15 }}>
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  fontWeight: "bold",
                  color: primaryColor
                }}>
                Messages for orders
              </Text>

              {this.state.showMessages && (
                <FlatList
                  data={this.state.messages}
                  renderItem={this._renderMessage}
                />
              )}

              <View
                style={{
                  marginTop: 15,
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}>
                <TextInput
                  style={{
                    backgroundColor: "#e0e0e0",
                    width: "80%",
                    padding: 3,
                    paddingStart: 10,
                    paddingEnd: 10
                  }}
                  placeholderTextColor="#aaa"
                  placeholder="write your message"
                  value={this.state.message}
                  onChangeText={message => this.setState({ message })}
                />
                <TouchableOpacity
                  onPress={this._sendMessage}
                  style={{
                    backgroundColor: primaryColor,
                    padding: 3,
                    paddingStart: 15,
                    paddingEnd: 15,
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                  <Text style={{ color: "#fff" }}>SEND</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 10,
        paddingTop: 20,
        backgroundColor: '#eee',
    },
    detailsHeader: {
        color: primaryColor,
        marginTop: 5,
        fontSize: 16
    }
});
  
const mapStateToProps = ( state ) => {
  return {
    user: state
  };
};

export default connect(mapStateToProps, null)(OrderReceipt); 