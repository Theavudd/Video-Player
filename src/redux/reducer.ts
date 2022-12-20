import {combineReducers} from 'redux';
import homeReducer from './homeReducer/reducer';

export const RootReducer = combineReducers({
  homeReducer,
});
