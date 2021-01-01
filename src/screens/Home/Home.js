  import React, { Component } from 'react'
  import { Text, TextInput,ScrollView, Image, TouchableOpacity, View ,AsyncStorage} from "react-native";
  //import styles from './styles'

  import EStyleSheet from "react-native-extended-stylesheet";
  import { Ionicons as Icon} from '@expo/vector-icons'; 
  import { get } from '../../local_storage/auth_storage';
  import storage_keys from '../../utils/storage_keys';
  import actions from '../../redux/user/actions';
  import { connect } from 'react-redux'
  import Axios from 'axios';
  import urls from '../../utils/urls';
  import showToast from '../../utils/toast'; 
  import LatestItems from './LatestItems';
  const log = console.log
  const primaryColor = "#008577";

  import { getCart } from '../localStorage/cart'; 

  import IconBadge from 'react-native-icon-badge';

  var wishlistcount = 0
  SearchComponent = props => {

    if(props.showSearchResults ){

        return (
          <View
            style={{
              position: "absolute",
              width: "80%",
              borderRadius: 5,
              paddingHorizontal: 15,
              height: 220,
              backgroundColor: "white",
              top: props.top
            }}>
            <ScrollView>
              {props.results.map(item => (
                <Text 
                  key={item.id}
                  onPress={() => props.onItemPress(item)} 
                  numberOfLines={1} 
                  style={{fontSize: 16, height: 30, color: '#aaaaaa'}}>
                  {item.name} 
                </Text>
              ))}
            </ScrollView>
          </View>
        ); 
    }else return null

  }
  class Home extends Component {
    static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state
      return {
        headerTitle: () => (
          <Text
            style={{
              fontSize: 23,
              marginStart: 10,
              color: "#fff"
            }}>
            E-Dental Mart
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
        ),
        headerRight: () => (
          <>
            
            <IconBadge
              MainElement={
                <Icon
                onPress={() => navigation.navigate("wishlist")}
                style={{ marginStart: 10, marginEnd: 10 }}
                name="md-heart"
                size={30}
                color="#fff"
                />
              }
              BadgeElement={ 
                <Text style={{color:'#FFFFFF'}}>{params.WishlistCount}</Text>
              }
              IconBadgeStyle={
                {width:20,
                height:20,
                marginTop:-6,
                backgroundColor: '#ff0000'}
              }
              Hidden={params.WishlistCount==0}

            />

            <IconBadge
              MainElement={
                <Icon
                  onPress={() => navigation.navigate("cart")}
                  style={{ marginStart: 10, marginEnd: 10 }}
                  name="md-cart"
                  size={30}
                  color="#fff"
                />
              }
              BadgeElement={
                <Text style={{color:'#FFFFFF'}}>{params.CartCount}</Text>
              }
              IconBadgeStyle={
                {width:20,
                height:20,
                marginTop:-8,
                backgroundColor: '#ff0000'}
              }
              Hidden={params.CartCount==0}
            />
          </>
        )
      };
    };

    constructor(props) {
      super(props);
    
    }

    state = {
      searchLayout_Y: 0,
      searchLayout_Height: 0,
      showSearchResults: false,
      searchResults :[],
      latestProducts: [],
      wishlist: [],
      WishlistCount : 0,
      CartCount : 0,
      wishlistFlag : true
    };

    componentDidMount(){

      this.checkId();
      this.getLatestProducts()
      this.getCartCount()   
        this.props.navigation.setParams({
          WishlistCount : 0,
          CartCount :0
        })
    
    }

    getCartCount = async() =>{

      const value = await getCart();
      var tempCartArray =[]
      tempCartArray = value
  
      var tempCount = 0


    if(value!=null && value!= "" && value!= [] )
    {
      tempCartArray.map((item)=>{
       // console.log("gettt " + JSON.stringify(item))
        tempCount = parseInt(tempCount) +parseInt(item.quantity)
      })

      this.props.navigation.setParams({
        CartCount :tempCount 
      })
    }
    else{
      this.props.navigation.setParams({
        CartCount :0 
      })
    }
    }

    getWishlistCount = async (id) => {

      log("userss " + this.props.user.userId)

      try {
        const res = await Axios.get(urls.wishlist(id)); 
        log("wishlist " + JSON.stringify(res.data.length))
  
        this.props.navigation.setParams({
          WishlistCount : res.data.length
        })
  
      }catch(e) {
        console.log("error " + e)
      }
    }

    componentWillMount()
    {
      if(this.props.user.userId!="" && this.props.user.userId!= null && this.props.user.userId!= 0)
      {
      this.getWishlistCount(this.props.user.userId)
      }
    }

      checkId =  async() =>{

        const userId = await  get(storage_keys.USER_ID)
        log("homeeeee user id : ", userId);    

      if(userId != '') {
        log(" user id : ", userId);
        this.props.saveId(userId)
      }
  
    };

    onSearchItemPress = item => {
      log('item press', item)
    }

    loadSearchResults = async (searchValue) => { 

      log(searchValue) 
      const value = searchValue.trim().length > 0
      if(!value) return
      const result = await Axios.get(urls.searchProduct(searchValue)) 
      log(result)
      if(!result.data.error)
        this.setState({
                      searchResults : result.data,
                      showSearchResults: result.data.length > 0})
  
    }

    onSearchChange = searchValue => {

        this.setState({
          searchValue,
          showSearchResults: searchValue.length > 0
        }); 
        
        this.loadSearchResults(searchValue)

    }

    getLatestProducts = async () => {

      const res = await Axios.get(urls.latestProducts)
            log(res);
            if (res.data.error) {
              showToast(res.data.error); 
              return;
            }

            this.setState({
              latestProducts : res.data
            });
    }

    onItemPress = page => {
      this.props.navigation.navigate("ProductList", { type: page });
    };

    onLatestItemPress = id => {
      log("onLatestItemPress", id)
      this.props.navigation.navigate("ProductDetails", { id });
    }

    _searchLayout = ({ nativeEvent }) => {
      const searchLayout_Height = nativeEvent.layout.height;
      const searchLayout_Y = nativeEvent.layout.y;
      if (!this.state.searchLayout_Height)
        this.setState({ searchLayout_Height, searchLayout_Y });
    };
    
    render() {

      if(this.props.user.userId!="" && this.props.user.userId!= null && this.props.user.userId!= 0)
      {
        if(this.state.wishlistFlag )
        {
          this.setState({
            wishlistFlag:false
          })
         this.getWishlistCount(this.props.user.userId)
        }
      }


      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{ width: "100%" }}>
            <View style={{width: '100%', height: '100%', backgroundColor: '#da0',paddingTop: 20,
                    backgroundColor: "#eee",
                    alignItems: "center"}}>
              <View onLayout={this._searchLayout} style={styles.inputContainer}>
                <TextInput
                  style={{ flex: 1, fontSize: 15 }}
                  value={this.state.searchValue}
                  onChangeText={this.onSearchChange}
                  numberOfLines={1}
                  placeholder="search"
                />
                <Icon name="md-search" size={30} color="#000" />
              </View>
              <View style={[styles.row, { marginTop: 10,  }]}>
                <TouchableOpacity
                  onPress={() => this.onItemPress("orthodontics")}
                  style={styles.imageContainer}>
                  <Image
                    style={styles.imageStyle}
                    resizeMode="contain"
                    source={require("../../../assets/orthodontics.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onItemPress("equipments")}
                  style={styles.imageContainer}>
                  <Image
                    style={styles.imageStyle}
                    resizeMode="contain"
                    source={require("../../../assets/equipments.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => this.onItemPress("oral-surgery")}
                  style={styles.imageContainer}>
                  <Image
                    style={styles.imageStyle}
                    resizeMode="contain"
                    source={require("../../../assets/oralsyrgery.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onItemPress("disposables")}
                  style={styles.imageContainer}>
                  <Image
                    style={styles.imageStyle}
                    resizeMode="contain"
                    source={require("../../../assets/disposables.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => this.onItemPress("periodontics")}
                  style={styles.imageContainer}>
                  <Image
                    style={styles.imageStyle}
                    resizeMode="contain"
                    source={require("../../../assets/periodontics.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onItemPress("prosthodontics")}
                  style={styles.imageContainer}>
                  <Image
                    style={styles.imageStyle}
                    resizeMode="contain"
                    source={require("../../../assets/prosthodonics.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => this.onItemPress("restoration")}
                  style={styles.imageContainer}>
                  <Image
                    onPress={() => alert("This is a button!")}
                    style={styles.imageStyle}
                    resizeMode="contain"
                    source={require("../../../assets/restoration.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.onItemPress("others")}
                  style={styles.imageContainer}>
                  <Image
                    style={styles.imageStyle}
                    resizeMode="contain"
                    source={require("../../../assets/others.png")}
                  />
                </TouchableOpacity>
              </View>

              <SearchComponent
                onItemPress={this.onSearchItemPress}
                top={this.state.searchLayout_Height + this.state.searchLayout_Y}
                showSearchResults={this.state.showSearchResults}
                results={this.state.searchResults}
              />

              <LatestItems
                  style={{marginTop: 30, marginBottom: 20,  paddingHorizontal: '5%', paddingTop: 15, backgroundColor: '#eee'}}
                  onPress={this.onLatestItemPress}
                  data={this.state.latestProducts}
                />

            </View>
          </ScrollView>
        </View>
      );
    }
  }


  const styles = EStyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: "#eee",
      alignItems: "center"
    },

    inputContainer: { 
          width: "80%",
          padding: 5,
          paddingStart: 15,
          paddingEnd: 10,
          flexDirection: "row",
          backgroundColor: "#fff",
          borderRadius: 10 
    },

    imageStyle: {
      width: "100%",
      height: "100%"
    },
    imageContainer: {
      width: "46%",
      height: "100%", 
    },

    row: {
      flex: 0,
      flexDirection: "row",
      width: "60%",   
      height: 120,
      marginTop: 5,
      justifyContent: "space-around"
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
  

  export default connect(mapStateToProps,mapDispatchToProps,null)(Home); 