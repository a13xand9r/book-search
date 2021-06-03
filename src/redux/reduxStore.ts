import { searchReducer } from './searchReducer';
import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';


const reducers = combineReducers({
    searchReducer
})
export const store = createStore(reducers, applyMiddleware(thunkMiddleware))

type ReducerType = typeof reducers
export type StateType = ReturnType<ReducerType>
export type BaseThunkType<AT extends Action> = ThunkAction<void, StateType, unknown, AT>
export type InferActionType<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U : never