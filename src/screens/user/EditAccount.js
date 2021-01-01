import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Picker,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator
} from "react-native";
const primaryColor = "#008577";
import { Ionicons as Icon, MaterialIcons as MIcon } from "@expo/vector-icons";
import countries from '../../utils/countries'
import Axios from "axios";
import urls from "../../utils/urls";
import showToast from "../../utils/toast";

const state = ["","Punjab", "Sindh", "Balochistan", "Khyber-Pakhtunkhwa"];
const cities = ["","Lahore", "Karachi", "Islamabad", "Peshawar", "Multan", "Quetta", "Faisalabad", "Rawalpindi", "Hyderabad",
            "Gujuranwala", "Sialkot", "Bahawalpur", "Sukkur", "Sargodha", "Abbottabad", "Kasur", "Gujrat", "Sheikhupura", "Larkana", "Sahiwal", "Mardan", "Gawader"];

const log = console.log
class EditAccount extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <Text
          style={{
            fontSize: 23,
            marginStart: 10,
            color: "#fff"
          }}>
          Edit Profile
        </Text>
      ),
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: primaryColor
      }, 
    };
  };

  state = {
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      country: '',
      address: '',
      city: '',
      state: '',
      phone: '',
      inProgress :false
  }

  constructor(props){
    super(props)
    const params = this.props.navigation.state.params 
    
    if(params) {
      
      const userData = params.userData
      this.state = {
        firstName: userData.first_name,
        lastName: userData.last_name,
        company: userData.billing.company,
        email: userData.email,
        country: userData.billing.country,
        address: userData.billing.address_1 + " " + userData.billing.address_2,
        city: userData.billing.city,
        state: userData.billing.state,
        phone: userData.billing.phone
      };
    }
  }
 
  _onTextChange = (key, value) => {
    this.setState({ [key] : value });
  }

  validateData = () => {
    
    if(this.state.firstName.trim().length == 0){
      showToast("First name cannot be empty")
      return false
    }
    if(this.state.lastName.trim().length == 0){
      showToast("Last name cannot be empty");

      return false
    }
    if(this.state.country.trim().length == 0){
      showToast("Country cannot be empty");
      return false
    }

    if(this.state.address.trim().length == 0){
      showToast("Address cannot be empty");
      return false
    }
    if(this.state.city.trim().length == 0){
      showToast("City cannot be empty");
      return false
    }
    if(this.state.state.trim().length == 0){
      showToast("State cannot be empty");
      return false
    }
    if(this.state.phone.trim().length == 0){
      showToast("Phone cannot be empty");
      return false
    }
    
    return true
  }

  _save = async () => {

    this.setState({
      inProgress: true
    });

    log('_save')
    if(!this.validateData()){
      return
    }
    const userId = 219;
 
    const billing = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      company: this.state.company,
      address_1: this.state.address,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      phone: this.state.phone
    };

    const shipping = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      company: this.state.company,
      address_1: this.state.address,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country
    };
 
    const data = JSON.stringify({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      billing,
      shipping
    });

    try {
       const res = await Axios.put(urls.saveProfile(userId), data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });

        log(res);

        this.setState({
          inProgress: false
        });
        
        if(res.data.error) {
          showToast(res.data.error)
          return
        }

        showToast("Data updated successfully.")
 
    }catch(error){
      console.log(error) 
      showToast("Update failed, try again.")
      this.setState({
        inProgress: false
      });
    } 

  }

  cityV = value => {
    log(value)
  }

  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={85}
        style={{ flex: 1 }}
        behavior='padding'>
        <ScrollView>
          <View style={styles.container}>
            <View style={{ flexDirection: "row", marginTop: 25 }}>
              <View style={{ flex: 0.5 }}>
                <Text style={styles.headerText}>First Name</Text>
                <TextInput
                  value={this.state.firstName}
                  onChangeText={text => this._onTextChange("firstName", text)}
                  style={styles.textInput}
                />
              </View>
              <View style={{ flex: 0.5 }}>
                <Text style={styles.headerText}>Last Name</Text>
                <TextInput
                  value={this.state.lastName}
                  onChangeText={text => this._onTextChange("lastName", text)}
                  style={styles.textInput}
                />
              </View>
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={styles.headerText}>Company Name(optional)</Text>
              <TextInput
                value={this.state.company}
                onChangeText={text => this._onTextChange("company", text)}
                style={styles.textInput}
              />
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={styles.headerText}>Email</Text>
              <TextInput
                value={this.state.email}
                onChangeText={text => this._onTextChange("email", text)}
                style={styles.textInput}
              />
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={styles.headerText}>Country</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={this.state.country}
                  style={styles.pickerStyles}
                  itemStyle={styles.itemStyles}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ country: itemValue })
                  }>
                  {countries.map((item, index) => (
                    <Picker.Item
                      key={"" + index}
                      label={item.name}
                      value={item.name}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={styles.headerText}>Address</Text>
              <TextInput
                value={this.state.address}
                onChangeText={text => this._onTextChange("address", text)}
                style={styles.textInput}
              />
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={styles.headerText}>City</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={this.state.city}
                  itemStyle={styles.itemStyles}
                  style={styles.pickerStyles}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ city: itemValue })
                  }>
                  {cities.map((item, index) => (
                    <Picker.Item key={"" + index} label={item} value={item} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={styles.headerText}>State</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={this.state.state}
                  style={styles.pickerStyles}
                  itemStyle={styles.itemStyles}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ state: itemValue })
                  }>
                  {state.map((item, index) => (
                    <Picker.Item key={"" + index} label={item} value={item} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={styles.headerText}>Phone</Text>
              <TextInput
                value={this.state.phone}
                keyboardType="phone-pad"
                onChangeText={text => this._onTextChange("phone", text)}
                style={styles.textInput}
              />
            </View>

            <View>
              {this.state.inProgress ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center",marginTop:10,marginBottom:10 }}>
                  <ActivityIndicator size="large" color={primaryColor} />
                </View>
              ) : null}
            </View>

            <TouchableOpacity onPress={this._save} style={styles.signOutButton}>
              <Text style={{ color: "#fff", fontWeight: "500" }}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  textInput: {
    width: "95%",
    borderBottomColor: "#444",
    fontSize: 16,
    marginTop: 10,
    borderBottomWidth: 1
  },
  headerText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500"
  },
  signOutButton: {
    width: "60%",
    alignSelf: "center",
    height: 40,
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: primaryColor,
    alignItems: "center"
  },
  regularText: {
    fontSize: 15,
    color: "#999",
    marginTop: 10
  },
  pickerContainer: {
    width: "95%",
    borderBottomColor: "#444",
    justifyContent: "flex-start",
    borderBottomWidth: 1
  },
  pickerStyles: {
    height: 40,
    width: "100%",
    marginStart: -5, 
    color: "#555",
    backgroundColor: "#fff"
  },
  itemStyles: {
    padding: 0,
    margin: 0
  }
});

export default EditAccount;
