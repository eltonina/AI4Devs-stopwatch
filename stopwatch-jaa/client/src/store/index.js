// client/src/store/index.js
import { createStore, combineReducers } from 'redux';
import stopwatchReducer from './reducers/stopwatchReducer';

const rootReducer = combineReducers({
  stopwatch: stopwatchReducer,
});

const store = createStore(rootReducer);

export default store;
