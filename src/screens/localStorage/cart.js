import { AsyncStorage } from 'react-native';
import keys from './keys'

const log = console.log

export const getCart = async () => {
  try {
    const value = await AsyncStorage.getItem(keys.CART_ITEMS);
    
    if (value != null &&value!=[] ) { 
      var converted = JSON.parse(value)
      return converted
    }
  } catch (error) {
      log(error)
  }
};

export const remove = async () => {
  try {
    const value = await AsyncStorage.removeItem(keys.CART_ITEMS); 
    log("removedd ");

    return true
  } catch (error) {
    log(error);
    return false;
  }
};
 
export const setCartArray = async (data) => {
  try {
    var value =[]
    value = [...data]
   // value.push(data)
      await AsyncStorage.setItem(keys.CART_ITEMS, JSON.stringify(value));
      
    //return true

  } catch (error) {
    log(" catch " +error);
    return false
  }
};

export const set = async (data) => {
    try {
      var value =[]
      var savedObj = []
      var savedData = await AsyncStorage.getItem(keys.CART_ITEMS);

      if(savedData!= null && savedData!= "")
        {
          savedObj =JSON.parse(savedData)
          savedData = [...savedObj, data ]
          await AsyncStorage.setItem(keys.CART_ITEMS, JSON.stringify(savedData));
        }
        else
        {
          value.push(data)
          await AsyncStorage.setItem(keys.CART_ITEMS, JSON.stringify(value));
        }
        return true

    } catch (error) {
      log(" catch " +error);
      return false
    }
  };
