import {configureStore} from "@reduxjs/toolkit";
import {persistStore,persistReducer} from "redux-persist";
import {combineReducers} from "redux";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import parkingReducers from "./parkingSlice";

const reducers=combineReducers({
	parking:parkingReducers
});

const persistConfig={
	key:"root",
	storage:AsyncStorage
};

const persistedReducer=persistReducer(persistConfig,reducers);

export const store = configureStore({
	reducer:persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export const persistor=persistStore(store);