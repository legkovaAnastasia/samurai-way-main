import {Dispatch} from "redux";
import {UsersAPI} from "../../api/api";
import preloader from '../../assets/preloader.svg'
import {LoginDataType} from "../Login/Login";
import {getAuthUserDataTC} from "./authReducer";

export type AppInitialType = {
initialized: boolean
}
let initialState: AppInitialType = {
    initialized: false
}
export const appReducer = (state: AppInitialType = initialState, action: ActionAppType) => {
    switch (action.type) {
        case 'SET_INITIALIZED': {
            return {
                ...state, initialized: true
            }
        }
        default:
            return state
    }
}

export type ActionAppType = ReturnType<typeof setInitializedAC>

export const setInitializedAC = () => {
    return {
        type: "SET_INITIALIZED"
    } as const
}
