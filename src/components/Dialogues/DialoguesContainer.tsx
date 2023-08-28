import s from './Dialogues.module.css'
import {DialogueItem} from "./DialogueItem/DialogueItem";
import {Message} from "./Message/Message";
import {
    ActionType,
    DialoguesPageType,
    sendMessageAC, StateType, StoreType,
    updateNewMessageBodyAC
} from "../../components/redux/state";
import {ChangeEvent} from "react";
import {Dialogues} from "./Dialogues";
import {connect} from "react-redux";
import {ActionProfileType} from "../redux/profileReducer";
import {ActionDialoguesType} from "../redux/dialoguesReducer";
import {StorePropsType} from "../redux/redux-store";

// export const DialoguesContainer = (props: DialoguesPageType & { dispatch: (action: ActionType) => void }) => {
//     const onSendMessage = () => {
//         props.dispatch(sendMessageAC())
//     }
//     const onNewMessage = (text:string) => {
//         props.dispatch(updateNewMessageBodyAC(text))
//     }
//     return <Dialogues dialoguesData={props.dialoguesData}
//                       messageData={props.messageData}
//                       newMessageBody={props.newMessageBody}
//                       sendMessage={onSendMessage}
//                       newMessage={onNewMessage}/>
// }


const mapStateToProps = (state: StorePropsType) => {
    return {
        dialoguesData: state.dialoguesPage.dialoguesData,
        messageData: state.dialoguesPage.messageData,
        newMessageBody: state.dialoguesPage.newMessageBody
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
export const DialoguesContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogues)