import {ActionType, PostsType, ProfilePageType} from "./state";
import {UserProfileType} from "../Profile/ProfileContainer";
import {Dispatch} from "redux";
import {ProfileAPI} from "../../api/api";

let initialState: ProfilePageType = {
    newPostText: 'pipiska',
    postData: [
        {message: 'hi', id: 1, likesCount: 2},
        {message: 'nice', id: 2, likesCount: 3},
        {message: "its's okey", id: 3, likesCount: 1},
        {message: 'sdddvsdww', id: 4, likesCount: 45}
    ],
    profile: { userId:1, lookingForAJob: false, lookingForAJobDescription:'', fullName: 'ASDDF', photos: {small: undefined, large:undefined}, contacts:''},
    status: ''
}
export const profileReducer = (state: ProfilePageType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'ADD-POST':{
            let newPost: PostsType = {id: new Date().getTime(), message: state.newPostText, likesCount: 300}
            return {...state, postData:[...state.postData, newPost], newPostText:''};
        }
        case 'CHANGE-NEW-TEXT': {
            return {...state, newPostText: action.newText}
        }
        case 'SET_USER_PROFILE':{
            return  {...state, profile:action.profile}
        }
        case 'SET_USER_STATUS': {
            return  {...state, status:action.status}
        }
        default:
            return state
    }
}

export type ActionProfileType = ReturnType<typeof addPostAC>
    | ReturnType<typeof changeNewTextAC>
    | ReturnType<typeof setUserProfileAC>
|ReturnType<typeof setUserStatusAC>
export const addPostAC = (newPostText: string) => {
    return {
        type: "ADD-POST",
        newPostText: newPostText
    } as const
}
export const changeNewTextAC = (newText: string) => {
    return {
        type: 'CHANGE-NEW-TEXT',
        newText: newText
    } as const
}
export const setUserProfileAC = (profile: UserProfileType) => {
    return {
        type: 'SET_USER_PROFILE',
        profile: profile
    } as const
}
export const setUserStatusAC = (status:string)=>{
    return {
        type: 'SET_USER_STATUS' as const,
        status
    }
}

export const getUserProfileTC = (userId:string|undefined) => (dispatch: Dispatch) => {
    return ProfileAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfileAC(response.data))
        })
}
export const getUserStatusTC = (userId:string|undefined)=>(dispatch:Dispatch)=>{
    ProfileAPI.getStatus(userId)
        .then(res=> {
            dispatch(setUserStatusAC(res.data))
        })
}
export const updateUserStatusTC = (status:string)=>(dispatch:Dispatch)=>{
    ProfileAPI.updateStatus(status)
        .then(res=> {
            dispatch(setUserStatusAC(status))
        })
}