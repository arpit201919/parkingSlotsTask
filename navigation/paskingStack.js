import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from "../src/mainScreen";
import RegistractionScreen from "../src/registrationScreen";


const stack=createNativeStackNavigator();

const PaskingStack=()=>{
	return(
		<stack.Navigator 
			screenOptions={{ headerShown: false}}
			initialRouteName={"MainScreen"}
		>
			<stack.Screen name="MainScreen" component={MainScreen} />
			<stack.Screen name="RegistractionScreen" component={RegistractionScreen} />
		</stack.Navigator>
		)
}

export default PaskingStack;