import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {dialoguesReducer} from "./dialoguesReducer";
import {profileReducer} from "./profileReducer";
import {usersReducer} from "./usersReducer";
import {authReducer} from "./authReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const reducers = combineReducers({
    profilePage: profileReducer,
    dialoguesPage: dialoguesReducer,
    usersPage: usersReducer,
    auth: authReducer
})
export type AppRootStateType = ReturnType<typeof reducers>
// создаем тип диспатча который принимает как AC так и TC
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const store = createStore(reducers, applyMiddleware(thunk))
export type StorePropsType = ReturnType<typeof reducers>

