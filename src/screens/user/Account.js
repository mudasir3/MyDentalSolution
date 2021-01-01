import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet ,ActivityIndicator} from 'react-native';
const primaryColor = "#008577";
import { Ionicons as Icon, MaterialIcons as MIcon } from "@expo/vector-icons";
import { connect } from "react-redux";
import Axios from 'axios';
import urls from '../../utils/urls';
import showToast from '../../utils/toast';
import actions from '../../redux/user/actions';

import { remove } from '../..//local_storage/auth_storage';
import storage_keys from '../../utils/storage_keys';

const log = console.log
class Account extends Component {
  constructor(props) {
    super(props);
    this.focusListener = this.props.navigation.addListener(
      "willFocus",
      payload => {
        if (!this.props.user.userId) {
          this.props.navigation.dangerouslyGetParent().navigate("Auth");
        }
      }
    );
  }

  state = {
    userData : undefined,
    inProgress:false
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => (
        <Text
          style={{
            fontSize: 23,
            marginStart: 10,
            color: "#fff"
          }}>
          Account
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

  _editAccount = () => {
    if (this.state.userData)
      this.props.navigation.navigate("EditAccount", { userData: this.state.userData });
    else
      this.props.navigation.dangerouslyGetParent().navigate("Auth");

  };

  componentDidMount(){
    this.getUserData(this.props.user.userId)
  }

  getUserData = async (id) => {

    this.setState({
      inProgress: true
    });

    try {
      log('getUserData')
      const res = await Axios.get(urls.userData(id))
            log('getUserData' + JSON.stringify(res.data) )

      this.setState({userData: res.data})
      log(res)
      this.setState({
        inProgress: false
      });

    } catch (error) {
      log(error) 
      this.setState({
        inProgress: false
      });
    }
       
  }

  _signOut = async () => {

    try {
        log("_signOut");
        const res = await Axios.get(urls.logout);
        await remove(storage_keys.USER_ID)

        this.props.saveId("")

        log(res)
        if(res.data.error){
          showToast(res.data.error)
          return
        }

        showToast("res.data")
        //TODO : clear local asyncstorage
        //TODO : clear redux store
        this.props.navigation.dangerouslyGetParent().goBack()

    } catch (error) {
        log(error)
    }

  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "space-between"
            }}>
            <Text style={styles.headerText}>ACCOUNT</Text>
            <TouchableOpacity
              onPress={this._editAccount}
              style={{ flexDirection: "row" }}>
              <Text style={styles.headerText}>EDIT</Text>
              <MIcon name="edit" size={13} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", marginTop: 40 }}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.headerText}>First Name</Text>
              <Text style={styles.regularText}>
                {this.state.userData && this.state.userData.first_name}
              </Text>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.headerText}>Last Name</Text>
              <Text style={styles.regularText}>
                {this.state.userData && this.state.userData.last_name}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={styles.headerText}>Company Name</Text>
            <Text style={styles.regularText}>
              {this.state.userData && this.state.userData.billing.company}
            </Text>
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={styles.headerText}>Email</Text>
            <Text style={styles.regularText}>
              {this.state.userData && this.state.userData.email}
            </Text>
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={styles.headerText}>Country</Text>
            <View>
              {this.state.inProgress ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator size="large" color={primaryColor} />
                </View>
              ) : <Text style={styles.regularText}>
              {this.state.userData && this.state.userData.billing.country}
            </Text>}
            
            </View> 
            {/* <Text style={styles.regularText}>
              {this.state.userData && this.state.userData.billing.country}
            </Text> */}
          </View>

            {/* <View>
              {this.state.inProgress ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator size="large" color={primaryColor} />
                </View>
              ) : null}
            </View> */}

          <View style={{ marginTop: 15 }}>
            <Text style={styles.headerText}>Address</Text>
            <Text style={styles.regularText}>
              {this.state.userData &&
                this.state.userData.billing.address_1 +
                  " " +
                  this.state.userData.billing.address_2}
            </Text>
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={styles.headerText}>City</Text>
            <Text style={styles.regularText}>
              {this.state.userData && this.state.userData.billing.city}
            </Text>
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={styles.headerText}>State</Text>
            <Text style={styles.regularText}>
              {this.state.userData && this.state.userData.billing.state}
            </Text>
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={styles.headerText}>Phone</Text>
            <Text style={styles.regularText}>
              {this.state.userData && this.state.userData.billing.phone}
            </Text>
          </View>

          <TouchableOpacity
            onPress={this._signOut}
            style={styles.signOutButton}>
            <Text style={{ color: "#fff", fontWeight: "500" }}>SIGN OUT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 15
    },
    headerText: {
        fontSize: 13,
        fontWeight: '500'
    },
    signOutButton: {
        width: '60%', alignSelf: 'center', 
        height: 40, 
        justifyContent:'center', 
        marginTop: 40,
        backgroundColor: primaryColor, 
        alignItems: 'center'
    },
    regularText: {
        fontSize: 13,
        color: '#999',
        marginTop: 10

    }
});
   
const mapStateToProps = (state) => {
 
  return {
    user: state 
  };
}; 

const mapDispatchToProps = dispatch => {
  return {
    saveId: id => dispatch({ type: actions.SAVE_ID, userId: id })
  };
};

export default connect(mapStateToProps,mapDispatchToProps, null)(Account); 