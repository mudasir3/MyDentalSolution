//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native";
const primaryColor = "#008577";
import {
  Ionicons as Icon,
  MaterialIcons as MIcon,
  FontAwesome
} from "@expo/vector-icons"; 
import Axios from "axios";
import urls from "../../utils/urls";
import showToast from "../../utils/toast";

import { connect } from "react-redux";
import { get } from '../../../src/local_storage/auth_storage';
import storage_keys from '../../../src/utils/storage_keys';


const log = console.log
class OrderHistory extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <Text
          style={{
            fontSize: 23,
            marginStart: 10,
            color: "#fff"
          }}>
          My Orders
        </Text>
      ),
      headerStyle: {
        backgroundColor: primaryColor
      },
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
    items : [],
    inProgress: false
  };

  checkId = async () => {

    var userId = await get(storage_keys.USER_ID);
    console.log("orderrrrrrr USERRRR " + userId)
  
  };

  componentDidMount(){ 
    this.checkId()

    this.props.navigation.addListener('didFocus', 
      payload => {
        this.getData();
      })

      console.log("ordersss " + this.props.user.userId);

  }

  getData = async () => {
    this.setState({
      inProgress: true
    });
    log("getData");

    var userid 
    if(this.props.user.userId)
    {
      userid =this.props.user.userId
    }
    else
    {
      userid = 219
     
    }
    try {
      const res = await Axios.get(urls.allOrders(userid));
      console.log(res);

      if(res.data.error){
        this.setState({
          inProgress: false
        });
        showToast(res.data.error)
        return
      }

      this.setState({
        items : res.data,
        inProgress:false
      })

    } catch (error) {
      log(error);
      this.setState({
        inProgress: false
      });
    }
  };

  _onItemPress = item => {
    log(item); 
    this.props.navigation.navigate("OrderReceipt", {id : item.id+''}); 
  }

  _renderItem = item => { 
    
    return (
     <TouchableOpacity 
        onPress={() => this._onItemPress(item)} 
        style={styles.itemContainer}>
        <Image
          resizeMode="contain"
          style={styles.itemImage}
          source={require("../../../assets/picinstrument.jpg")}
        />
        <View
          style={{
            flex: 0.7,
            justifyContent: "center",
            marginStart: 15
          }}>
          <Text style={{ color: primaryColor, fontSize: 17 }}>
            Order id:{" "}
            <Text style={{ color: "#000", fontWeight: "bold" }}>{item.id}</Text>
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>
            {item.total} {item.currency}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <Text
            style={{ color: primaryColor, fontSize: 16, fontWeight: "500" }}>
            QTY:{" "}
            <Text style={{ color: "#000", fontWeight: "bold" }}>
              {item.line_items.length}
            </Text>
          </Text>
        </View>

      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>

            <View>
              {this.state.inProgress ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator size="large" color={primaryColor} />
                </View>
              ) : null}
            </View>

        <FlatList
          data={this.state.items}
          keyExtractor={item => item.id+''}
          renderItem={({ item }) => this._renderItem(item)}
          ListFooterComponent={() => <View style={{ height: 70 }} />}
        />

     

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff"
  },
 
  itemImage: { width: 50, height: 50, marginStart: 5, alignSelf: "center" },

  quantityContainer : {
    flex: 0.3,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginEnd: 5,
    paddingBottom: 10
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    height: 70,
    padding: 5,
    paddingStart: 15,
    backgroundColor: "#fff",
    elevation: 1.5,
    margin: 5,
    borderRadius: 5,
    width: "90%",
    alignSelf: "center"
  } 
});
;

const mapStateToProps = state => {
  return {
    user: state 
  };
};

export default connect(
  mapStateToProps,
  null
)(OrderHistory); 

 
// export default createStackNavigator(
//   {
//     "My Orders": {
//       screen: OrderHistory
//     }
//   },
//   {
//     navigationOptions: {
//       drawerIcon: ({ tintColor }) => (
//         <FontAwesome name="shopping-bag" size={20} color={tintColor} />
//       ),
//       drawerLabel: "My Orders",
//       headerStyle: {
//         backgroundColor: primaryColor
//       }, 
//     }
//   }
// );