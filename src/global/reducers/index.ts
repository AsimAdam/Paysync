import { combineReducers } from 'redux';
import folderReducer from './folderReducer'; 

const rootReducer = combineReducers({
  folders: folderReducer,
});

export default rootReducer;
