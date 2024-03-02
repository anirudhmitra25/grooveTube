
import { createStore } from 'redux';
import videoReducer from './reducer';

const store = createStore(videoReducer);

export default store;
