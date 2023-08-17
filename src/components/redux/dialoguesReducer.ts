import {DialoguesPageType, StateType} from "./state";


export const dialoguesReducer = (state: DialoguesPageType, action: ActionDialoguesType) => {
    switch (action.type) {
        case 'UPDATE-NEW-MESSAGE-BODY':
            state.newMessageBody = action.body
            return state;
        case 'SEND-MESSAGE':
            let body = state.newMessageBody
            state.newMessageBody = ''
            state.messageData.push({message: body, id: 4})
            return state;
        default :
            return state
    }
}
export type ActionDialoguesType = UpdateNewMessageBodyAT | SendMessageAT

type UpdateNewMessageBodyAT = ReturnType<typeof updateNewMessageBodyAC>
type SendMessageAT = ReturnType<typeof sendMessageAC>
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