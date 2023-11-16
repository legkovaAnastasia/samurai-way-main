import {Dispatch} from "redux";
import {UsersAPI} from "../../api/api";
import preloader from '../../assets/preloader.svg'
import {LoginDataType} from "../Login/Login";

export type AuthType = {
    userId: null|number,
    email: string | null,
    login: string | null
    isAuth: boolean
}
let initialState: AuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}
export const authReducer = (state: AuthType = initialState, action: ActionUsersType) => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return {
                ...state, ...action.data, isAuth: true
            }
        }
        default:
            return state
    }
}

export type ActionUsersType = ReturnType<typeof setAuthUserDataAC>

export const setAuthUserDataAC = (userId: number|null, email: string|null, login: string|null, isAuth: boolean) => {
    return {
        type: "SET_USER_DATA",
        data: {userId, email, login, isAuth}
    } as const
}

export const getAuthUserDataTC = () => (dispatch: Dispatch) => {
    UsersAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(response.data.data.id, response.data.data.email, response.data.data.login, response.data.data.true))
            }
        })
}

export const loginTC = (data: LoginDataType) => (dispatch: Dispatch<ActionUsersType>) => {
    UsersAPI.login(data)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(response.data.data.id, response.data.data.email, response.data.data.login, response.data.data.true))
            }
        })
}
export const logoutTC = (data: LoginDataType) => (dispatch: Dispatch<ActionUsersType>) => {
    UsersAPI.login(data)
        .then(response => {
            if (response.data.resultCode === 0) {
                    dispatch(setAuthUserDataAC(null, null, null,false ))
            }
        })
}