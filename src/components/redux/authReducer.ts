export type AuthType = {
    userId: number | null,
    email: string | null,
    login: string | null
    isAuth: boolean
}
let initialState: AuthType = {
    userId: null,
    email: null,
    login: null,
    isAuth:false
}
export const authReducer = (state: AuthType = initialState, action: ActionUsersType) => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return {
                ...state, ...action.data, isAuth:true
            }
        }
        default:
            return state
    }
}

export type ActionUsersType = ReturnType<typeof setAuthUserDataAC>

export const setAuthUserDataAC = (userId: number, email: string, login: string) => {
    return {
        type: "SET_USER_DATA",
        data: {userId, email, login}
    } as const
}
