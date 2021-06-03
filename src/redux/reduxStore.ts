import { searchReducer } from './searchReducer';
import { combineReducers, createStore } from 'redux';


const reducers = combineReducers({
    searchReducer
})
export const store = createStore(reducers)

type ReducerType = typeof reducers
export type StateType = ReturnType<ReducerType>
export type InferActionType<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U : never