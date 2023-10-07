import {
    sendMessageAC,
    updateNewMessageBodyAC
} from "../../components/redux/state";
import {Dialogues} from "./Dialogues";
import {connect} from "react-redux";
import {ActionDialoguesType} from "../redux/dialoguesReducer";
import {StorePropsType} from "../redux/redux-store";
import {withAuthRedirect} from "../HOC/withAuthRedirect";

export type MapStateToPropsType = {
    dialoguesData: DialoguesType[],
    messageData: MessageType[],
    newMessageBody:string,
    isAuth: boolean
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
        newMessageBody: state.dialoguesPage.newMessageBody,
        isAuth: state.auth.isAuth
    }
}
const mapDispatchToProps = (dispatch: (action: ActionDialoguesType) => void) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageAC())
        },
        newMessage: (text: string) => {
            dispatch(updateNewMessageBodyAC(text))
        }
    }
}
export const DialoguesContainer = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(Dialogues))