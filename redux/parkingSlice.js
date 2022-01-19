import {createSlice} from "@reduxjs/toolkit";
import moment from "moment";
import {Alert} from "react-native"

const initialState={
	lots:[],
	status:false,
	randomId:null,
	startTime:null,
	endTime:null,
	totalPrice:0,
	selectedLotData:null
}

export const parkingSlice=createSlice({
	name:"parking",
	initialState,
	reducers:{
		addSlots:(state,action)=>{ 
			console.log("state-->>",state);
			console.log("action-->>",action.payload);
			//let arr=[...state.lots]
			 for(let i=1;i<=action.payload;i++){
			 	console.log('i--->>',i)
				state.lots.push({"id":i,"status":state.status,"startTime":"","endTime":""})
			 }
		},
		selectRandomSlots:(state,action)=>{
			let results=state.lots.filter((elem)=>{
				return elem.status===false
			})
			//console.log("results--[]>>",results);
			if(results.length!=0){
			const props=results[Math.floor(Math.random()*results.length)]
			//console.log("----",props.id)
			state.randomId=props.id;
			}else {
				Alert.alert("No slots are available right now!")
			}
			let renderData=[...state.lots];
		    for(let data of renderData){
		      if(data.id==state.randomId){
		        data.selected=(data.selected==null)?true:!data.selected;
		        data.status=true;
		        data.startTime=moment().format('LT');
		        break;
		      }
		    }  
		    state.lots=renderData
		},
		clearSlots:(state,action)=>{
			state.lots=[];
			console.log("startTime--->>",state.lots)
		},
		getEndTime:(state,action)=>{
			let renderData=[...state.lots];
		    for(let data of renderData){
		      if(data.id==action.payload){
		      	console.log("payload--->>",action.payload);
		      	data.endTime=moment().format('LT');
		        break;
		      }
		    }  
		    state.lots=renderData
		},
		getSelectedParkingData:(state,action)=>{
			state.selectedLotData=state.lots[action.payload-1]
			console.log("stateselectedLotData--->>>",state.selectedLotData)
		},
		clearSlotsData:(state,action)=>{
			let renderData=[...state.lots];
		    for(let data of renderData){
		      if(data.id==action.payload){
		      	console.log("payload--->>",action.payload);
		      	data.status=false;
		        data.selected=false;
		        break;
		      }
		    }  
		    state.status=renderData

		}
	}
})


export const {addSlots,selectRandomSlots,clearSlots,getEndTime,clearSlotsData,getSelectedParkingData}=parkingSlice.actions;
export default parkingSlice.reducer;