import { combineReducers, createStore } from 'redux';

const reducer = combineReducers({
});

const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;

export default store;
