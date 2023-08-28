import {ActionType, DialoguesPageType, StateType} from "./state";

// type InitialStateType = {
//     dialoguesData: Array<DialoguesType>
//     messageData: Array<MessageType>
//     newMessageBody: string
// }
// export type DialoguesType = {
//     name: string, id: number
// }
// export type MessageType = {
//     message: string,
//     id: number
// }
let initialState: DialoguesPageType = {
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
export const dialoguesReducer = (state: DialoguesPageType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-BODY': {
            return {...state, newMessageBody: action.body};
        }
        case 'SEND-MESSAGE': {
            return {...state,  messageData: [...state.messageData, {message:state.newMessageBody, id:4}], newMessageBody: '',};
        }
        default :
            return state
    }
}
export type ActionDialoguesType = ReturnType<typeof updateNewMessageBodyAC> | ReturnType<typeof sendMessageAC>

// type UpdateNewMessageBodyAT = ReturnType<typeof updateNewMessageBodyAC>
// type SendMessageAT = ReturnType<typeof sendMessageAC>
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