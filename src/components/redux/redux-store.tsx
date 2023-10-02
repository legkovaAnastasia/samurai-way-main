import { combineReducers, createStore} from "redux";
import {dialoguesReducer} from "./dialoguesReducer";
import {profileReducer} from "./profileReducer";
import {usersReducer} from "./usersReducer";
import {authReducer} from "./authReducer";

export const reducers = combineReducers({
    profilePage: profileReducer,
    dialoguesPage: dialoguesReducer,
    usersPage: usersReducer,
    auth: authReducer
})

export const store = createStore(reducers)
export type StorePropsType = ReturnType<typeof reducers>

