import React, { useState,useEffect } from "react";
import {View,Text,StyleSheet,TextInput,Button,Alert,} from "react-native";
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import {getStartTime,getEndTime,clearSlotsData} from "../redux/parkingSlice";
import {useDispatch,useSelector} from "react-redux";
import moment from "moment";

const RegistractionScreen=({route,navigation})=>{
	const [registrationNumber,setRegistrationNumber]=useState("")
	const [stopwatchStart,setStopWatchStart]=useState(false);
	const [stopwatchReset,setstopwatchReset] = useState(false);
	const [totalTime,setTotalTime]= useState(0);
	const [showTime,setShowTime]=useState(false);
    const selectedLotData=useSelector((state)=>state.parking.selectedLotData)
    console.log("selectedLotData--->>>",selectedLotData)
    const endTime=useSelector((state)=>state.parking.endTime)
    const dispatch=useDispatch();

    useEffect(()=>{
        calculateTotal();
    },[]);

const calculateTotal=()=>{
    let start=selectedLotData.startTime.slice(0,2);
    let end=selectedLotData.endTime.slice(0,2);
    const totalHours=end-start;
    setTotalTime(totalHours);
    //const hourDiff=moment.duration().subtract(end,start,"hours").asSeconds();
    console.log("diff-->>",totalHours);
}

	return(
		<View style={styles.container} >
    		<Text>Start Time:-{selectedLotData.startTime}</Text>
            <Text>End Time:-{selectedLotData.endTime}</Text>
            {totalTime<=2?<Text>Total price-$20</Text>:<Text>{`Total price-$ ${10*totalTime}`}</Text>}
            <Button
                title="Pay"
                onPress={()=>{
                    dispatch(clearSlotsData(selectedLotData.id));
                    navigation.goBack();
                }
            }
            />
		</View>
		)
}

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
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
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
    },
    stopWatch:{
    	marginTop:20 ,
    	height:200,
    	backgroundColor:"powderblue",
    alignItems:"center",
    	 justifyContent:"center"
    	}
})

export default RegistractionScreen;