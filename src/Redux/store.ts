import { combineReducers, createStore } from 'redux';
import orderReducer from './reducers/orderReducer';
import productReducer from './reducers/productReducer';
import selectedOrderReduser from './reducers/selectedOrderReduser';

const reducer = combineReducers({
  product: productReducer,
  order: orderReducer,
  selectedOrder: selectedOrderReduser,
});

const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;

export default store;
