import { configureStore } from '@reduxjs/toolkit';
import orderBookReducer from './orderBookSlice';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux";


const persistConfig = {
  key: 'root',
  storage
};
const reducers= combineReducers({
  orderBook: orderBookReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);
export default configureStore({
  reducer: persistedReducer
});
