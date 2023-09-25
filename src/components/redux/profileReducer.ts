import {ActionType, PostsType, ProfilePageType} from "./state";
import {UserProfileType} from "../Profile/ProfileContainer";

let initialState: ProfilePageType = {
    newPostText: 'pipiska',
    postData: [
        {message: 'hi', id: 1, likesCount: 2},
        {message: 'nice', id: 2, likesCount: 3},
        {message: "its's okey", id: 3, likesCount: 1},
        {message: 'sdddvsdww', id: 4, likesCount: 45}
    ],
    profile: { userId:1, lookingForAJob: false, lookingForAJobDescription:'', fullName: 'ASDDF', photos: {small: undefined, large:undefined}, contacts:''}
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
        default:
            return state
    }
}

export type ActionProfileType = ReturnType<typeof addPostAC>
    | ReturnType<typeof changeNewTextAC>
    | ReturnType<typeof setUserProfileAC>
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