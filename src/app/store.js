import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";;
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import orderReducer from "./orderSlice";
import thunk from 'redux-thunk';

const combinedReducers = combineReducers({ reduser: userReducer, cartReducer: cartReducer, orderReducer: orderReducer });

const persistConfig = {
    key: 'root', 
    storage, 
  };

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({reducer:persistedReducer,
    middleware: [thunk]})

export const persistor = persistStore(store);