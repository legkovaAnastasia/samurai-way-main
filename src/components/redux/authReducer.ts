import {Dispatch} from "redux";
import {securityAPI, UsersAPI} from "../../api/api";
import {LoginDataType} from "../Login/Login";
import {setInitializedAC} from "./appReducer";
import {AppThunkDispatch} from "./redux-store";

export type AuthType = {
    userId: null | number,
    email: string | null,
    login: string | null
    isAuth: boolean,
    error: string | null
    isLoggedIn: boolean,
    captchaUrl: string | null
}
let initialState: AuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    error: null,
    isLoggedIn: false,
    captchaUrl: null
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
        case "SET_IS_LOGGED_IN": {
            return {
                ...state, isLoggedIn: action.isLoggedIn
            }
        }
        case "SET_CAPTCHA_URL": {
            return {
                ...state, captchaUrl: action.captchaUrl
            }
        }
        default:
            return state
    }
}

export type ActionUsersType =
    ReturnType<typeof setAuthUserDataAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setCaptchaUrlAC>

export const setAuthUserDataAC = (userId: null | number, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: "SET_USER_DATA",
        data: {userId, email, login, isAuth}
    } as const
}
export const setErrorAC = (error: string) => {
    return {
        type: "SET_ERROR",
        error
    } as const
}
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: "SET_IS_LOGGED_IN",
        isLoggedIn
    } as const
}
export const setCaptchaUrlAC = (captchaUrl: string | null) => {
    return {
        type: "SET_CAPTCHA_URL",
        captchaUrl
    } as const
}

export const getAuthUserDataTC = () => async (dispatch: Dispatch) => {
    let response = await UsersAPI.me()
    try {
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserDataAC(response.data.data.id, response.data.data.email, response.data.data.login, true))
            dispatch(setIsLoggedInAC(true))
        }
    } finally {
        dispatch(setInitializedAC())
    }
}

export const loginTC = (data: LoginDataType) => async (dispatch: AppThunkDispatch) => {
    let response = await UsersAPI.login(data)
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(response.data.data.id, response.data.data.email, response.data.data.login, true))
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrlTC())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error'
        dispatch(setErrorAC(message))
    }
}
export const logoutTC = () => async (dispatch: Dispatch<ActionUsersType>) => {
    let response = await UsersAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}
export const getCaptchaUrlTC = () => async (dispatch: Dispatch<ActionUsersType>) => {
    const response = await securityAPI.getCaptchaUrl()
    dispatch(setCaptchaUrlAC(response.data.url))
}