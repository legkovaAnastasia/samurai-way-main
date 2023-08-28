import { combineReducers, createStore, Store} from "redux";
import {dialoguesReducer} from "./dialoguesReducer";
import {profileReducer} from "./profileReducer";

export const reducers = combineReducers({
    profilePage: profileReducer,
    dialoguesPage: dialoguesReducer
})

export const store = createStore(reducers)
export type StorePropsType = ReturnType<typeof reducers>

