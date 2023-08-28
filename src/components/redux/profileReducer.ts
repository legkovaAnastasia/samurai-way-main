import {ActionType, PostsType, ProfilePageType} from "./state";

let initialState: ProfilePageType = {
    newPostText: 'pipiska',
    postData: [
        {message: 'hi', id: 1, likesCount: 2},
        {message: 'nice', id: 2, likesCount: 3},
        {message: "its's okey", id: 3, likesCount: 1},
        {message: 'sdddvsdww', id: 4, likesCount: 45}
    ]
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
        default:
            return state
    }
}

export type ActionProfileType = ReturnType<typeof addPostAC> | ReturnType<typeof changeNewTextAC>
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