import {ActionType, PostsType, ProfilePageType} from "./state";
import {UserProfileType} from "../Profile/ProfileContainer";
import {Dispatch} from "redux";
import {ProfileAPI} from "../../api/api";


let initialState: ProfilePageType = {
    postData: [
        {message: 'hi', id: 1, likesCount: 2},
        {message: 'nice', id: 2, likesCount: 3},
        {message: "it is okey", id: 3, likesCount: 1},
        {message: 'sdddvsdww', id: 4, likesCount: 45}
    ],
    profile: {
        userId: null,
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: null,
        photos: {small: undefined, large: undefined},
        contacts: ''
    },
    status: ''
}
export const profileReducer = (state: ProfilePageType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost: PostsType = {id: new Date().getTime(), message: action.newPostText, likesCount: 300}
            return {...state, postData: [...state.postData, newPost], newPostText: ''};
        }
        case 'SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SET_USER_STATUS': {
            return {...state, status: action.status}
        }
        default:
            return state
    }
}

export type ActionProfileType = ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setUserStatusAC>
export const addPostAC = (newPostText: string) => {
    return {
        type: "ADD-POST",
        newPostText: newPostText
    } as const
}
export const setUserProfileAC = (profile: UserProfileType) => {
    return {
        type: 'SET_USER_PROFILE',
        profile
    } as const
}
export const setUserStatusAC = (status: string) => {
    return {
        type: 'SET_USER_STATUS' as const,
        status
    }
}
export const getUserProfileTC = (userId: string | undefined) => async (dispatch: Dispatch) => {
    let response = await ProfileAPI.getProfile(userId)
    dispatch(setUserProfileAC(response.data))
    console.log(response.data)
}
export const getUserStatusTC = (userId: string | undefined) => async (dispatch: Dispatch) => {
    let response = await ProfileAPI.getStatus(userId)
    dispatch(setUserStatusAC(response.data))
}
export const updateUserStatusTC = (status: string) => async (dispatch: Dispatch) => {
    let response = await ProfileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatusAC(status))
    }
}