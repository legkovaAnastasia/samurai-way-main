import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {dialoguesReducer} from "./dialoguesReducer";
import {profileReducer} from "./profileReducer";
import {usersReducer} from "./usersReducer";
import {authReducer} from "./authReducer";
import thunk, {ThunkDispatch} from "redux-thunk";

export const reducers = combineReducers({
    profilePage: profileReducer,
    dialoguesPage: dialoguesReducer,
    usersPage: usersReducer,
    auth: authReducer
})
export type ThunkType = ThunkDispatch<StorePropsType, any, AnyAction>

export const store = createStore(reducers, applyMiddleware(thunk))
export type StorePropsType = ReturnType<typeof reducers>

