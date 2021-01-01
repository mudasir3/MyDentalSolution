import React from 'react'
import { StyleSheet, Image, View, Text, TouchableOpacity, FlatList } from 'react-native'
import { ForceTouchGestureHandler } from 'react-native-gesture-handler'
const log = console.log;
const primaryColor = "#008577";

const Item = props => {

    let image;
    if(props.item.images.length > 0)
        image = props.item.images[0].src
    else image = null
        return (
        <View style={{width: 200, marginVertical: 5, elevation: 2, justifyContent: 'center', alignItems: 'center'}} >
            <TouchableOpacity
                style={{
                    width: "98%", 
                    aspectRatio: 1,
                    backgroundColor: "white",
                    borderRadius: 5, 
                    justifyContent: 'space-between',
                    alignItems: "center"
                    }}
                onPress={()=>props.onPress(props.item.id)}>
                <Image
                resizeMode="cover"
                style={{ width: "95%", height: "70%" }}
                source={image ? {uri : image }: require("../../../assets/equipments.png")}
                />
                <Text style={{ alignSelf: "flex-start", marginStart: 10, fontSize: 13 }}>{props.item.name}</Text>
                <Text style={{ alignSelf: "flex-start", marginStart: 10, fontWeight: 'bold', color: primaryColor }}>Rs. {props.item.price}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default LatestItems = props => {

    return (
      <FlatList
        style={props.style}
        data={props.data}
        horizontal 
        renderItem={({ item }) => <Item onPress={props.onPress} item={item} />}
      />
    );
}
const styles = StyleSheet.create({
    
})