//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
const primaryColor = "#008577";
import { Ionicons as Icon, MaterialIcons as MIcon } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";
import { connect } from "react-redux";
import { getCart, set,remove,setCartArray } from '../localStorage/cart'; 
const log = console.log

var cartItems = []
class Cart extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <Text
          style={{
            fontSize: 23,
            marginStart: 10,
            color: "#fff"
          }}>
          My Cart
        </Text>
      ),
      drawerLabel: "My Cart",
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-cart" size={25} color={tintColor} />
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
    items: [],
    counter : 1
  };

  constructor(props) {
    super(props);
    // this.focusListener = this.props.navigation.addListener(
    //   "willFocus",
    //   payload => {
    //     if (!this.props.user.userId) {
    //        this.props.navigation.dangerouslyGetParent().navigate("Auth");
    //     }
    //   }
    // );

  }

  componentWillUnmount() {
    //this.focusListener.remove();
    this.getData(); 
  }

  componentDidMount() {
    log("componentDidMount");
    this.getData(); 
  }

  getData =  async() => {
    const value = await getCart();
    //console.log("valuee " + value)

    if(value!=null && value!= "" && value!= [] )
    {
    this.setState({items:value})
    }
    
  }; 

  _removeItem =  async(itemId)  => {

    var newArray =[]
    var removeItem =  remove()    
    if(removeItem)
    {
      this.state.items.map(item => {
        if (item.id != itemId ) {
          //set(item)
          newArray.push(item)
       }  
      });

      this.setState({
        items: newArray
      });

      setCartArray(newArray)

    }        
  };

  _incrementItem =  async(itemId) => {

    var newArray =[]
    var removeItem =  true   
    if(removeItem)
    {
    newArray = this.state.items.map(item => {
      if (item.id == itemId ) {
        return { ...item, quantity: item.quantity + 1 };
      }
      else{
        return item;
      }
    });
    this.setState({
      items: newArray
    });
    setCartArray(newArray)

  }
  };

  _decrementItem =  async(itemId) => {
    var newArray =[]
    var removeItem =  remove()    
    if(removeItem)
    {
    newArray = this.state.items.map(item => {
      if (item.id == itemId && item.quantity > 1 ) {
        return { ...item, quantity: item.quantity - 1 };
      }
      else{
        return item;
      }  
    });
    this.setState({
      items: newArray
    });
    setCartArray(newArray)
  }
}

  _renderItem = item => {
    console.log("ITemmmmmmmmmmmm "+ JSON.stringify(item))
    if(item!=[] && item!=null && item!="[]" && item!= undefined )
    {
    var img = item.images[0].src
    return (
      <View style={styles.itemContainer}>
        <View
          style={{ flex: 0.7, justifyContent: "space-evenly", marginStart: 5 }}>
          <Text
            style={{ color: primaryColor, fontSize: 19, fontWeight: "500" }}>
            {item.title}
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Image
              resizeMode="contain"
              style={{ width: 35, height: 35 }}
              source={ img? {uri :img} :  require("../../../assets/picinstrument.jpg")}
            />
            <View style={{ flex: 0, flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => this._decrementItem(item.id)}
                style={styles.counterActionStyle}>
                <Icon name="md-remove" size={30} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.changeItemCount}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => this._incrementItem(item.id)}
                style={styles.counterActionStyle}>
                <Icon name="md-add" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.3,
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingBottom: 10
          }}>
          <MIcon
            onPress={() => this._removeItem(item.id , item)}
            name="delete"
            size={35}
            color={primaryColor}
          />
          <Text
            style={{ color: primaryColor, fontSize: 16, fontWeight: "500" }}>
            Rs. {item.price*(item.quantity)}
          </Text>
        </View>
      </View>
    );
        }
  };

  _checkout = () => {
    this.props.navigation.navigate("Checkout")
  }

  render() {
    return (
     <View style={styles.container}>
    {this.state.items != null && this.state.items != undefined && this.state.items != [] && this.state.items != "" ? 
    <View style={styles.container}>
        <FlatList
          data={this.state.items}
          //keyExtractor={item => item.id + ""}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>this._renderItem(item)}
          ListFooterComponent={() => <View style={{ height: 70 }} />}
        />

        <TouchableOpacity
            onPress={this._checkout}
            style={styles.checkOutButton}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>
            CHECKOUT
          </Text>
        </TouchableOpacity>
    </View>  
    :
      <View  style={{alignItems:'center' }}>
         <Text style={{fontSize: 18, fontWeight: "300"}}>
            Cart is empty 
          </Text>
      </View>
      }
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

  counterActionStyle: {
    backgroundColor: primaryColor,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 40
  },

  changeItemCount: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    padding: 2,
    marginStart: 1,
    marginEnd: 1,
    minWidth: 50,
    textAlignVertical: "center",
    backgroundColor: primaryColor
  },

  itemContainer: {
    flex: 1,
    flexDirection: "row",
    height: 90,
    padding: 5,
    backgroundColor: "#fff",
    elevation: 1.5,
    margin: 5,
    borderRadius: 5,
    width: "90%",
    alignSelf: "center"
  },
  checkOutButton: {
    position: "absolute",
    width: "100%",
    bottom: 2,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primaryColor
  }
});
  

const mapStateToProps = ( state ) => {
  return {
    user: state
  };
};
 
export default connect(mapStateToProps, null)(Cart);