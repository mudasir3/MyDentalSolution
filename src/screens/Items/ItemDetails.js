import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Share, Image, TouchableOpacity,ActivityIndicator } from 'react-native';
 import Axios from "axios";
 const primaryColor = "#008577";
 import keys from '../../utils/keys' 
import {
  Ionicons as Icon,
  MaterialIcons as MIcon,
  FontAwesome
} from "@expo/vector-icons"; 
import { connect } from "react-redux";

import { Rating, AirbnbRating } from "react-native-ratings";
import urls from '../../utils/urls';
import {set,get} from '../../screens/localStorage/cart'
import Toast from 'react-native-root-toast';
import Spinner from 'react-native-loading-spinner-overlay';

const log = console.log
 
  Button = props => (
   
    !props.loader ?
     <TouchableOpacity style= {styles.buttonContainer} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
      </TouchableOpacity>
      :
      <View style= {styles.buttonContainer}>
      <ActivityIndicator  color="white" />
      </View>
    
    
  )

  ImagePreview = props => (
    <TouchableOpacity
      key={props.id}
      onPress={props.onPress}
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          width: 45,
          height: 45,
          backgroundColor: "#eee",
          marginStart: 5
        },
        props.index == props.viewImageIndex ? {backgroundColor : "#bbb"} : {}
      ]}>
      <Image style={{ width: 45, height: 35 }} source={{ uri: props.src }} />
    </TouchableOpacity>
  );

  Counter = props => (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ width: 35, height: 35, 
      backgroundColor: primaryColor, 
      alignItems: 'center', justifyContent: 'center'}}
    > 
       <Icon name={props.iconName} size={30} color='#ffffff' />
    </TouchableOpacity>
  )

class ItemDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <View>
          <Text
            style={{
              fontSize: 22,
              marginStart: 10,
              color: "#fff"
            }}>
            E-Dental Mart
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
    item: {},
    previewImage: "",
    viewImageIndex: 0,
    productCounter: 1,
    loading: false,
    inProgress :false
  };

  getData = async () => { 
    this.setState({
      inProgress: true
    });

    const res = await Axios.get(
      urls.product(this.props.navigation.state.params.id)
    );
    console.log(res)
    this.setState({
      previewImage: res.data.product.featured_src,
      item: res.data.product,
      inProgress:false
    });
  };

  _addToWishList = async () => {
    this.setState({
      inProgress: true
    });

    log('addToWishlist'); 
    try {
      
     const data = JSON.stringify({
       user_id: this.props.user.userId,
       product_id: this.state.item.id,
       variation_id: 0,
       date: this.state.item.created_at,
       quantity: this.state.productCounter,
       price: this.state.item.price,
       in_stock: `${this.state.item.in_stock}`
     });

     const res = await Axios.post(urls.addToWishList, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    
    this.setState({
      inProgress: false
    });

    
    } catch (error) {
      log(" error " + error)
      this.setState({
        inProgress: false
      });
  
    }
 
  }

  componentDidMount() {
    this.getData();
    }

  _onImagePress = viewImageIndex => {
    this.setState({
      viewImageIndex,
      previewImage: this.state.item.images[viewImageIndex].src
    });
  };

  _productDecrement = () => {
    if (this.state.productCounter > 1)
      this.setState({
        productCounter: this.state.productCounter - 1
      });
  };

  _productIncrement = () => { 
      this.setState({
        productCounter: this.state.productCounter + 1
      });
  };

  _contactSeller = () => {

      const data = `Product Enquiry from E-Dental Mart " + "\n \n" + "PRODUCT NAME : " + ${this.state.item.title} + "\n PRODUCT URL: " + ${this.state.item.permalink} + "\n  \n CUSTOMER NAME: \n \n MESSAGE:  `;
      Linking.openURL(
        `mailto:info@edentalmart.com?subject=Subject&body=${data}`
      );
  }
  _share = () => {
    
    if(this.state.item.permalink) {
      Share.share(
        {
          message: `${this.state.item.permalink}`,
          title: this.state.item.title
        },
        { dialogTitle: "Share" }
      );
    } 
  }

   
  _addToCart = async (data) => {
    this.setState({
      inProgress: true,
      loading: true
    });
    setTimeout(() => {
      this.setState({ loading: false })
    }, 2000);

    var cartData = {...data, "quantity":this.state.productCounter}
    console.log("addtocart " +JSON.stringify(cartData))
    var setdata = set(cartData).then((val)=>{    
       this.setState({
       inProgress: false
       })
       Toast("Product Added to Cart successfully ")

       console.log("setdata  thennn " + val )

     }).catch((e)=>{
      this.setState({
        inProgress: false
        })
        console.log("setdata  catchhh   " + e )

    })


    // if(setdata)
    // {
    //    this.setState({
    //    inProgress: false
    //    });
    // }

  }

  render() { 
    return (
      <View style={styles.container}>
      <Spinner
          visible={this.state.inProgress}
          textContent={'Loading...'}
          color={primaryColor}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
            source={{ uri: this.state.previewImage }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={{ height: 50, marginTop: 10, marginStart: 15 }}>
            <ScrollView horizontal>
              {this.state.item.images &&
                this.state.item.images.map((image, index) => (
                  <ImagePreview
                    key={index}
                    onPress={() => this._onImagePress(index)}
                    viewImageIndex={this.state.viewImageIndex}
                    id={image.id}
                    src={image.src}
                  />
                ))}
            </ScrollView>
          </View>

          {/* <View>
              {this.state.inProgress ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator size="large" color={primaryColor}/>
                </View>
              ) : null}
            </View> */}

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.5, paddingStart: 10 }}>
              <Text style={{ fontSize: 18, width: "80%", fontWeight: "bold" }}>
                {this.state.item.title}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: primaryColor,
                  fontWeight: "bold"
                }}>
                {this.state.item.price}
              </Text>

              <Rating
                readonly
                fractions={5}
                imageSize={30}
                startingValue={Number(this.state.item.average_rating || 0)}
                style={styles.ratingStyle}
              />
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Product Detail
              </Text>
              <Text>N/A</Text>
            </View>
            <View
              style={{
                flex: 0.5,
                alignItems: "flex-end",
                justifyContent: "space-around",
                paddingEnd: 10
              }}>
              <View key="counter" style={{ flexDirection: "row" }}>
                <Counter
                  iconName="ios-remove"
                  onPress={this._productDecrement}
                />
                <View
                  style={{ backgroundColor: "white", width: 1, height: "100%" }}
                />
                <Text style={styles.counterText}>
                  {this.state.productCounter}
                </Text>
                <View
                  style={{ backgroundColor: "white", width: 1, height: "100%" }}
                />

                <Counter iconName="ios-add" onPress={this._productIncrement} />
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    alignSelf: "flex-end"
                  }}>
                  Reviews
                </Text>
                <Text
                  onPress={this._contactSeller}
                  style={{
                    fontSize: 20,
                    color: primaryColor,
                    fontWeight: "bold"
                  }}>
                  Contact Seller
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.optionsContainer}>
          <Button onPress={this._share} title="SHARE" />
          {/* <Button onPress={this._addToWishList} title="ADD TO WISHLIST" /> */}
          <Button onPress={() => this._addToCart(this.state.item)} loader={this.state.loading} title="ADD TO CART" />
        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    flex: 0.32,
    backgroundColor: "#ddd"
  },
  detailsContainer: {
    flex: 0.36
  },
  ratingStyle: {
    
    alignSelf: "flex-start", 
    marginTop: 10,
    marginBottom: 5
                
  },
  optionsContainer: {
    flex: 0.25,
    justifyContent: "space-evenly", 
  },
  counterText: {
    width: 40,
    height: 35,
    textAlignVertical: "center",
    color: "white",
    backgroundColor: primaryColor,
    fontSize: 22,
    textAlign: "center"
  },
  buttonContainer: {
    backgroundColor: primaryColor, 
    height: 45,
    elevation: 1,
    marginStart: 5,
    marginEnd: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: { fontSize: 18, color: "#fff", fontWeight: "bold" }
});
 
const mapStateToProps = ( state ) => {
  return {
    user: state
  };
};
 
export default connect(mapStateToProps, null)(ItemDetail);



