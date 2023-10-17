// import {rerenderEntireTree} from "../../index";

import {ActionProfileType, profileReducer} from "./profileReducer";
import {ActionDialoguesType, dialoguesReducer} from "./dialoguesReducer";
import {UsersType} from "../Users/UsersContainer";
import {UserProfileType} from "../Profile/ProfileContainer";

export type PostsType = {
    message: string,
    id: number,
    likesCount: number
}
export type DialoguesPageType = {
    dialoguesData: Array<DialoguesType>
    messageData: Array<MessageType>
    newMessageBody: string
}
export type DialoguesType = {
    name: string, id: number
}
export type MessageType = {
    message: string,
    id: number
}
export type ProfilePageType = {
    newPostText: string
    postData: Array<PostsType>
    profile: UserProfileType,
    status: string
}
export type StateType = {
    profilePage: ProfilePageType
    dialoguesPage: DialoguesPageType
}

export type StoreType = {
    _state: StateType
    _callSubscriber: () => void
    subscribe: (callback: () => void) => void
    getState: () => StateType
    dispatch: (action: ActionProfileType | ActionDialoguesType) => void
}

type AddPostAT = ReturnType<typeof addPostAC>
type ChangeNewTextAT = ReturnType<typeof changeNewTextAC>
type UpdateNewMessageBodyAT = ReturnType<typeof updateNewMessageBodyAC>
type SendMessageAT = ReturnType<typeof sendMessageAC>

export type ActionType = ActionDialoguesType | ActionProfileType
export const addPostAC = (newPostText: string) => {
    return {
        type: "ADD-POST", newPostText: newPostText
    } as const
}
export const changeNewTextAC = (newText: string) => {
    return {
        type: 'CHANGE-NEW-TEXT',
        newText: newText
    } as const
}
export const updateNewMessageBodyAC = (body: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-BODY',
        body: body
    } as const
}
export const sendMessageAC = () => {
    return {
        type: 'SEND-MESSAGE'
    } as const
}

const store: StoreType = {
    _state: {
        profilePage: {
            newPostText: 'pipiska',
            postData: [
                {message: 'hi', id: 1, likesCount: 2},
                {message: 'nice', id: 2, likesCount: 3},
                {message: "its's okey", id: 3, likesCount: 1},
                {message: 'sdddvsdww', id: 4, likesCount: 45}
            ],
            profile: {
                userId: 1,
                lookingForAJob: false,
                lookingForAJobDescription: '',
                fullName: 'ASDDF',
                photos: {small: undefined, large: undefined},
                contacts: '',
            },
            status: ''
        },
        dialoguesPage: {
            dialoguesData: [
                {name: 'Nastya', id: 1},
                {name: 'Katya', id: 2},
                {name: 'Sveta', id: 3},
                {name: 'Olya', id: 4},
                {name: 'Masha', id: 5}
            ],
            messageData: [
                {message: 'hi', id: 1},
                {message: 'hello', id: 2},
                {message: 'good', id: 3}
            ],
            newMessageBody: ''
        }
    },
    // changeNewText(newText: string) {
    //     this._state.profilePage.newPostText = newText
    //     this._callSubscriber()
    // },
    // addPost() {
    //     let newPost: PostsType = {id: 5, message: this._state.profilePage.newPostText, likesCount: 300}
    //     this._state.profilePage.postData.push(newPost)
    //     this._state.profilePage.newPostText = ''
    //     this._callSubscriber()
    // },
    _callSubscriber() {
        console.log('state changed')
    },
    subscribe(callback) {
        this._callSubscriber
            = callback
    },
    getState() {
        return this._state
    },
    // dispatch(action: ActionProfileType|ActionDialoguesType) {
    dispatch(action) {
        profileReducer(this._state.profilePage, action)
        dialoguesReducer(this._state.dialoguesPage, action)
        // dialoguesReducer(this._state.dialoguesPage, {type: 'UPDATE-NEW-MESSAGE-BODY', body: ''} )
        // dialoguesReducer(this._state.dialoguesPage, {type: 'SEND-MESSAGE'} )
        this._callSubscriber()
        // if (action.type === 'ADD-POST') {
        //     let newPost: PostsType = {id: new Date().getTime(), message: action.newPostText, likesCount: 300}
        //     this._state.profilePage.postData.push(newPost)
        //     this._state.profilePage.newPostText = ''
        //     this._callSubscriber()
        // } else
        if (action.type === 'CHANGE-NEW-TEXT') {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber()
        } else if (action.type === 'UPDATE-NEW-MESSAGE-BODY') {
            this._state.dialoguesPage.newMessageBody = action.body
            this._callSubscriber()
        } else if (action.type === 'SEND-MESSAGE') {
            let body = this._state.dialoguesPage.newMessageBody
            this._state.dialoguesPage.newMessageBody = ''
            this._state.dialoguesPage.messageData.push({message: body, id: 4})
            this._callSubscriber()
        }
    }
}


export default store