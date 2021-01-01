import { createStackNavigator } from "react-navigation-stack";
import { StyleSheet, Text, Image, View } from "react-native";
import Home from "../screens/Home/Home"; 
import ItemList from '../screens/Items/ItemList'
import ItemDetails from '../screens/Items/ItemDetails'
import { Ionicons as Icon, FontAwesome } from "@expo/vector-icons";  
import Account from "../screens/user/Account";
import EditAccount from '../screens/user/EditAccount'  
import React from "react"; 
import OrderReceipt from '../screens/order/OrderReceipt'
import OrderTrack from "../screens/order/OrderTrack";
import OrderHistory from "../screens/order/OrderHistory"; 
import Cart from "../screens/Items/Cart";
import Checkout from "../screens/Items/Checkout";

const primaryColor = "#008577";

export const HomeNavigator = createStackNavigator(
         {
           Home: {
             screen: Home
           },
           ProductList: {
             screen: ItemList
           },
           ProductDetails: {
             screen: ItemDetails
           }
         },
         {
           navigationOptions: {
             drawerIcon: () => null,
             drawerLabel: () => null, 
           }
         }
       );

export const AccountNavigator = createStackNavigator(
         {
           Account: {
             screen: Account
           },
           EditAccount: {
             screen: EditAccount
           }
         },
         {
           navigationOptions: {
             drawerIcon: ({ tintColor }) => (
               
               <FontAwesome
                 name="user-circle"
                 size={22}
                 color={tintColor}
               />
             ),
             drawerLabel: "My Account",
             headerStyle: {
               height: 150,
               backgroundColor: primaryColor,
               opacity: 1
             }
           }
         }
       );


export const OrderNavigator = createStackNavigator(
         {
           Orders: {
             screen: OrderHistory
           }, 
           OrderReceipt: {
             screen: OrderReceipt
           },
           OrderTrack: {
             screen: OrderTrack
           }
         },
         {
           navigationOptions: {
             drawerIcon: ({ tintColor }) => (
               <FontAwesome name="shopping-bag" size={20} color={tintColor} />
             ),
             drawerLabel: "My Orders",
             headerStyle: {
               height: 150,
               backgroundColor: primaryColor,
               opacity: 1
             }
           }
         }
       );

export const CartNavigator =  createStackNavigator(
  {
    Cart: {
      screen: Cart 
    },
    Checkout: {
      screen: Checkout
    }
  },
  {
    navigationOptions: {
      drawerLabel: "My Cart",
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-cart" size={25} color={tintColor} />
      ),
      headerStyle: {
        backgroundColor: primaryColor
      }
    }
  }
);       

