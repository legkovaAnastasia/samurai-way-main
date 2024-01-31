import {ActionType, PostsType, ProfilePageType} from "./state";
import {UserProfileType} from "../Profile/ProfileContainer";
import {Dispatch} from "redux";
import {ProfileAPI} from "../../api/api";
import {ProfileUpdateDataType} from "../Profile/MyPosts/PropfileInfo/PropfileDataForm";
import {AppThunkDispatch, store} from "./redux-store";


let initialState: ProfilePageType = {
    postData: [
        {message: 'hi', id: 1, likesCount: 2},
        {message: 'nice', id: 2, likesCount: 3},
        {message: "it is okey", id: 3, likesCount: 1},
        {message: 'sdddvsdww', id: 4, likesCount: 45}
    ],
    profile: {
        isOwner: false,
        userId: null,
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: 'qqq',
        aboutMe: '',
        photos: {small: null, large: null},
        contacts: {
            github: 'string',
            vk: 'string',
            facebook: 'string',
            instagram: 'string',
            twitter: 'string',
            website: 'string',
            youtube: 'string',
            mainLink: 'string',
        }
    },
    editMode: false,
    status: '',
    error: ''
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
        case 'SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: {...state.profile.photos, small: action.photos}}}
        }
        case 'SAVE_PROFILE': {
            return {
                ...state, profile: {
                    ...state.profile,
                    lookingForAJob: action.profileData.lookingForAJob,
                    lookingForAJobDescription: action.profileData.lookingForAJobDescription,
                    contacts: {
                        ...state.profile.contacts, ...action.profileData.contacts
                    }
                }
            }
        }
        case 'SET_ERROR': {
            return {
                ...state, error: action.error
            }
        }
        case 'SET_EDIT_MODE': {
            return {
                ...state, editMode: action.editMode
            }
        }
        default:
            return state
    }
}

export type ActionProfileType = ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setUserStatusAC>
    | ReturnType<typeof savePhotoSuccessAC>
    | ReturnType<typeof saveProfileAC>
    | ReturnType<typeof setErrorContactsAC>
    | ReturnType<typeof setEditModeAC>

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
export const savePhotoSuccessAC = (photos: string | null) => {
    return {
        type: 'SAVE_PHOTO_SUCCESS' as const,
        photos
    }
}

export const saveProfileAC = (profileData: ProfileUpdateDataType) => {
    return {
        type: 'SAVE_PROFILE' as const,
        profileData
    }
}
export const setErrorContactsAC = (error: string) => {
    return {
        type: "SET_ERROR",
        error: error
    } as const
}
export const setEditModeAC = (editMode: boolean) => {
    return {
        type: "SET_EDIT_MODE",
        editMode: editMode
    } as const
}
export const getUserProfileTC = (userId: number | null) => async (dispatch: Dispatch) => {
    let response = await ProfileAPI.getProfile(userId)
    dispatch(setUserProfileAC(response.data))
}
export const getUserStatusTC = (userId: number | null) => async (dispatch: Dispatch) => {
    let response = await ProfileAPI.getStatus(userId)
    dispatch(setUserStatusAC(response.data))
}
export const updateUserStatusTC = (status: string) => async (dispatch: Dispatch) => {
    let response = await ProfileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatusAC(status))
    }
}
export const savePhotoTC = (file: File) => async (dispatch: Dispatch) => {
    let response = await ProfileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccessAC(response.data.photos))
    }
}

export const saveProfileTC = (profileData: ProfileUpdateDataType) => async (dispatch: AppThunkDispatch) => {
    const userId: number | null = store.getState().auth.userId
    const response = await ProfileAPI.saveProfile(profileData)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfileTC(userId))
        dispatch(setEditModeAC(false))
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error'
        dispatch(setErrorContactsAC(message))
        dispatch(setEditModeAC(true))
    }
}