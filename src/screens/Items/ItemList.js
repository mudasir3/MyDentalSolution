//import liraries
import React, { Component } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import Axios from 'axios';
const primaryColor = "#008577";

const consumer_secret = 'cs_f7ebc5cd7d624dafe717d1dde10a4243589943d2' 
const consumer_key = 'ck_65538fd891ada609487b42ac1d3a97a748a92d1d'
const url =
  "https://edentalmart.com/wc-api/v2/products?filter[category]=" +
  "orthodontics" +
  "&filter%5Blimit%5D=300&filter%5Boffset%5D=0&consumer_secret=" +
  consumer_secret +
  "&consumer_key=" +
  consumer_key;

  const ItemComponent = props => {
     
    return (
      <View
        style={{
          width: "50%",
          aspectRatio: 1
        }}>
        <TouchableOpacity
          onPress={props.onItemPress}
          style={styles.itemContainer}>
          {props.item.featured_src ? (
            <Image
              resizeMode="cover"
              style={{
                width: "95%",
                height: "70%", 
                alignSelf: "center"
              }}
              source={{ uri: props.item.featured_src }}
            />
          ) : (
            <Image
              resizeMode="cover" 
              style={{ width: "90%", height: "70%", alignSelf: "center" }}
              source={require("../../../assets/placeholder.png")}
            />
          )}
          <View style={{flex: 1 }}>
            <Text style={{ marginStart: "5%" }}>{props.item.title}</Text>
          <Text
            style={{
              color: primaryColor,
              fontWeight: "bold",
              marginStart: "5%"
            }}>
            {props.item.price} PKR
          </Text>
          </View>
          
        </TouchableOpacity>
      </View>
    );};

  function getUrl(type) {
    const url = "https://edentalmart.com/wc-api/v2/products?filter[category]=" +
        type +
        "&filter%5Blimit%5D=300&filter%5Boffset%5D=0&consumer_secret=" +
        consumer_secret +
        "&consumer_key=" +
        consumer_key;
    return url;
  }
 
class ItemList extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <View >
          <Text
            style={{
              fontSize: 22,
              marginStart: 10,
              color: "#fff", 
            }}>
            E-Dental Mart
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginStart: 10,
              color: "#fff", 
            }}>
            {navigation.state.params.type}
          </Text>
        </View>
      ),
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: primaryColor
      } 
    };
  };

  state = {
    items: [],
    showIndicator: true
  };

  componentDidMount() {
    console.log("didMount");
    this.getData();
  }

  getData = async () => {
    this.setState({showIndicator: true})
    try {
      const res = await Axios.get(
        getUrl(this.props.navigation.state.params.type)
      );
     // console.log(res);
      this.setState({ items: res.data.products, showIndicator: false });

    }catch(err){
      console.log(err) 
      this.setState({ showIndicator: false });
    } 
    
  };

  onItemPress = (item) => {
    //console.log('onItemPress', item)
    this.props.navigation.navigate("ProductDetails", {id: item.id});
  }

  _renderItem = ({item}) => {
    return <ItemComponent item={item} onItemPress={()=>this.onItemPress(item)} />;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showIndicator && (
          <View style={{ marginTop: 40 }}>
            <ActivityIndicator size="large" color={primaryColor} />
          </View>
        )}
        <FlatList 
          data={this.state.items}
          keyExtractor={item => item.id + ""}
          renderItem={this._renderItem}
          numColumns={2}
        />
      </View>
    );
  }
}

 
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: "#eaeaea",
        paddingTop: 5
       
    },
    itemContainer: { 
            width: "93%",
            backgroundColor: "#fff",
            borderRadius: 3,
            padding: 5,
            height: "95%",
            justifyContent: "flex-start",
            alignSelf: "center" 
    }
});
 
export default ItemList;
