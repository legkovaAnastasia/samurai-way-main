import {PostsType, ProfilePageType} from "./state";

export const profileReducer = (state: ProfilePageType, action: ActionProfileType) => {
    switch (action.type) {
        case 'ADD-POST':
            let newPost: PostsType = {id: new Date().getTime(), message: action.newPostText, likesCount: 300}
            state.postData.push(newPost)
            state.newPostText = ''
            return state;
        case 'CHANGE-NEW-TEXT':
            state.newPostText = action.newText
            return state;
        default:
            return state
    }
    return state
}

export type ActionProfileType = AddPostAT | ChangeNewTextAT
type AddPostAT = ReturnType<typeof addPostAC>
type ChangeNewTextAT = ReturnType<typeof changeNewTextAC>
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