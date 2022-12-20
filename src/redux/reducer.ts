import {combineReducers} from 'redux';
import HomeReducer from './homeReducer/reducer';

export const RootReducer = combineReducers({
  HomeReducer,
});
