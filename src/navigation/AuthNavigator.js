import { createStackNavigator } from "react-navigation-stack";
import { StyleSheet, Text, Image, View } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
import ResetPassword from "../screens/auth/ResetPassword";

import React from "react";

export default MainScreenNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    SignUp: {
      screen: SignUp
    },
    ResetPassword: {
      screen: ResetPassword
    }
  },
  {
    navigationOptions: {
      drawerIcon: () => null,
      drawerLabel: () => null, 
    }
  }
);
