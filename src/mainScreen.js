import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, FlatList, Modal } from "react-native";
import {useSelector,useDispatch} from "react-redux";
import {addSlots,selectRandomSlots,clearSlots,getEndTime,getTotalPrice,getSelectedParkingData} from "../redux/parkingSlice"

const MainScreen = ({navigation}) => {
    const [number, setNumber] = useState(null);
    const [registration, setRegistration] = useState("");
    const slots=useSelector((state)=>state.parking.lots);
    const status=useSelector((state)=>state.parking.status);
    const id=useSelector((state)=>state.parking.randomId);
    const startTime=useSelector((state)=>state.parking.startTime);
    const endTime=useSelector((state)=>state.parking.endTime);
    const dispatch=useDispatch();

    console.log("data--->>",slots);
    
    return (
        <View style={styles.container}>
            <TextInput
            style={styles.input}
                placeholder="Number of lots"
                value={number}
                onChangeText={(text) => setNumber(text)}
            />
            <Button
                title="Submit"
                onPress={()=>{
                    dispatch(addSlots(number));
                    setNumber("");
                }}
            />
            <TextInput
            style={styles.input}
                placeholder="Registration N0"
                value={registration}
                onChangeText={(text)=>setRegistration(text)}
            />
            <Button
                title="Random slots"
                disabled={registration===""?true:false}
                onPress={()=>{
                    setRegistration("");
                    dispatch(selectRandomSlots());
                }}
            />
            <FlatList
                data={slots}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item,index)=>item+index}
                renderItem={({item,index})=>{
                  return(
                    <View style={[styles.item,{backgroundColor:item.status===true?"red":"powderblue"}]}>
                      <View style={{ flexDirection:"row",
                                     justifyContent:"space-between",
                                     alignItems:"center"}}>
                          <Text style={{fontSize:16,fontWeight:"bold"}}>{`Slot no- ${item.id}`}</Text>
                          {item.status?<Button
                            title="End"
                            onPress={()=> {
                                dispatch(getEndTime(item.id));
                                dispatch(getSelectedParkingData(item.id));
                                navigation.navigate("RegistractionScreen")}
                            }
                            //onPress={()=>dispatch(getStartTime())}
                            />
                            :null}
                      </View>
                       {item.selected && item.status?<Text>Start Time:-{item.startTime}</Text>:null}
                    </View>
                  )  
                }}
            />
            <Button
title="Clear Slots"
onPress={()=>dispatch(clearSlots())}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 16,
        paddingTop: 26,
    },
    input:{
        borderWidth:1,
        height:40,
        marginVertical:16,
        paddingLeft:8,
        borderRadius:6
    },
    item:{
        borderWidth:1,
        padding:12,
        marginTop:8,
        borderRadius:6,
        backgroundColor:"powderblue",
        // flexDirection:"row",
        // justifyContent:"space-between",
        // alignItems:"center"
    },
    modalCont:{
        backgroundColor:"rgba(0,0,0,0.5)",
        flex:1,
        justifyContent:"center"
    },
    modal:{
        backgroundColor:"#ffffff",
        marginHorizontal:16,
        height:140,
        borderRadius:6  ,
        paddingHorizontal:16,
        justifyContent:"center",
        paddingBottom:16
    }
})

export default MainScreen;