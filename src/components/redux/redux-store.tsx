import { combineReducers, createStore, Store} from "redux";
import {dialoguesReducer} from "./dialoguesReducer";
import {profileReducer} from "./profileReducer";
import {usersReducer} from "./usersReducer";

export const reducers = combineReducers({
    profilePage: profileReducer,
    dialoguesPage: dialoguesReducer,
    usersPage: usersReducer
})

export const store = createStore(reducers)
export type StorePropsType = ReturnType<typeof reducers>

console.log(typeof reducers)