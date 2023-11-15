import {ActionType, DialoguesPageType} from "./state";

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
    ]
}
export const dialoguesReducer = (state: DialoguesPageType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-BODY': {
            return {...state, newMessageBody: action.body};
        }
        case 'SEND-MESSAGE': {
            return {...state,  messageData: [...state.messageData, {message:action.newMessage, id:4}]};
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
export const sendMessageAC = (message:string) => {
    return {
        type: 'SEND-MESSAGE',
        newMessage: message
    } as const
}