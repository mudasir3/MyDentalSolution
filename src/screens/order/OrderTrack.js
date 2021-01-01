//import liraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons as Icon, MaterialIcons as MIcon } from "@expo/vector-icons"; 
import Axios from 'axios';
import urls from '../../utils/urls';
import showToast from '../../utils/toast';

import moment from 'moment';


const primaryColor = "#008577";
const log = console.log
const Card = props => {
  return (
    <View
      style={[
        {
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 10,
          elevation: 1.5,
          paddingStart: 15,
          paddingEnd: 15
        },
        props.style
      ]}>
      {props.children}
    </View>
  );
};
class OrderTrack extends Component {
 
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <Text
          style={{
            fontSize: 23,
            marginStart: 10,
            color: "#fff"
          }}>
          Order Tracking
        </Text>
      ),
      headerStyle: {
        backgroundColor: primaryColor
      },
      headerTintColor: 'white'
    };
  };

  state ={
    eventDate:moment.duration().add({days:7,hours:0,minutes:0,seconds:0}), // add 9 full days, 3 hours, 40 minutes and 50 seconds
    days:0,
    hours:0,
    mins:0,
    secs:0
    }

  constructor(props){
    super(props)

    log(this.props.navigation.state.params);
    this.orderId = this.props.navigation.state.params.id;
  }

  componentDidMount(){
    this.updateTimer()
  }

  updateTimer=()=>{
    
    const x = setInterval(()=>{
      let { eventDate} = this.state

      if(eventDate <=0){
        clearInterval(x)
      }else {
        eventDate = eventDate.subtract(1,"s")
        const days = eventDate.days()
        const hours = eventDate.hours()
        const mins = eventDate.minutes()
        const secs = eventDate.seconds()
        
        this.setState({
          days,
          hours,
          mins,
          secs,
          eventDate
        })
      }
    },1000)

  }

  _confirmDelivery = async () => {

    log('confirm delivery');

    try {
      const res = await Axios.put(urls.orderUpdate(this.orderId));
      console.log(res)

      if(res.data.error) {
        showToast(res.data.error)
        return
      } 
      showToast("Order updated successfully!")
      this.setTimeout(() => {
        this.props.navigation.pop(2)
      }, 500);

    }catch(error){
      log(error)
    }

    
  }

  render() {
    const { days, hours, mins, secs } = this.state

    return (
      <View style={styles.container}>
        <Card style={{ marginTop: 30, padding: 15 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: primaryColor }}>Status</Text>
            <Text style={{ color: "#888" }}>pending</Text>
          </View>
        </Card>

        <Card style={{ marginTop: 30, padding: 15 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: primaryColor }}>Your Order will be delivered in</Text>
            {/* <Text style={{ color: "#888" }}>6 d, 02 h 34 m</Text> */}
            <Text>{`${days} : ${hours} : ${mins} : ${secs}`}</Text>

          </View>
        </Card>

        <TouchableOpacity
          onPress={this._confirmDelivery}
           style={{backgroundColor: primaryColor, 
        padding: 10, justifyContent: 'center', alignItems: 'center', marginTop: 45, width: '80%', alignSelf: 'center'}}>
            <Text>CONFIRM DELIVERY</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 10,
        backgroundColor:'#fafafa'
    },
});
 
export default OrderTrack;
