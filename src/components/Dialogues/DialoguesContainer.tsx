
import {Dialogues} from "./Dialogues";
import {connect} from "react-redux";
import {ActionDialoguesType, sendMessageAC, updateNewMessageBodyAC} from "../redux/dialoguesReducer";
import {StorePropsType} from "../redux/redux-store";
import {withAuthRedirect} from "../HOC/withAuthRedirect";
import React from "react";

export type MapStateToPropsType = {
    dialoguesData: DialoguesType[],
    messageData: MessageType[],
    // newMessageBody:string
}
export type MapDispatchToPropsType = {
    sendMessage:(message:string)=>void,
    newMessage: (text: string)=>void
}
export type DialoguesType = {
    name: string, id: number
}
export type MessageType = {
    message: string,
    id: number
}
const mapStateToProps = (state: StorePropsType) => {
    return {
        dialoguesData: state.dialoguesPage.dialoguesData,
        messageData: state.dialoguesPage.messageData,
        // newMessageBody: state.dialoguesPage.newMessageBody
    }
}
const mapDispatchToProps = (dispatch: (action: ActionDialoguesType) => void) => {
    return {
        sendMessage: (message:string) => {
            dispatch(sendMessageAC(message))
        },
        newMessage: (text: string) => {
            dispatch(updateNewMessageBodyAC(text))
        }
    }
}

// export  default compose<React.ComponentType>(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogues)
export const DialoguesContainer = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogues))