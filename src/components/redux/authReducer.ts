import {Dispatch} from "redux";
import {UsersAPI} from "../../api/api";
import preloader from '../../assets/preloader.svg'
import {LoginDataType} from "../Login/Login";
import {setInitializedAC} from "./appReducer";

export type AuthType = {
    userId: null | number,
    email: string | null,
    login: string | null
    isAuth: boolean,
    error: string | null
}
let initialState: AuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    error: null
}
export const authReducer = (state: AuthType = initialState, action: ActionUsersType) => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return {
                ...state, ...action.data
            }
        }
        case "SET_ERROR": {
            return {
                ...state, error: action.error
            }
        }
        default:
            return state
    }
}

export type ActionUsersType = ReturnType<typeof setAuthUserDataAC> | ReturnType<typeof setErrorAC>

export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: "SET_USER_DATA",
        data: {userId, email, login, isAuth}
    } as const
}
export const setErrorAC = (error: string) => {
    return {
        type: "SET_ERROR",
        error: error
    } as const
}

export const getAuthUserDataTC = () => (dispatch: Dispatch) => {
    UsersAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(response.data.data.id, response.data.data.email, response.data.data.login, true))
            }
        })
        .finally(()=>{
            dispatch(setInitializedAC())
        })
}

export const loginTC = (data: LoginDataType) => (dispatch: Dispatch<ActionUsersType>) => {
    UsersAPI.login(data)
        .then(response => {
            console.log(response.data.messages)
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(response.data.data.id, response.data.data.email, response.data.data.login, true))
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error'
                dispatch(setErrorAC(message))
            }
        })
}
export const logoutTC = () => (dispatch: Dispatch<ActionUsersType>) => {
    UsersAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(null, null, null, false))
            }
        })
}