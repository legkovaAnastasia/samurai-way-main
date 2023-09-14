import {
    sendMessageAC,
    updateNewMessageBodyAC
} from "../../components/redux/state";
import {Dialogues} from "./Dialogues";
import {connect} from "react-redux";
import {ActionDialoguesType} from "../redux/dialoguesReducer";
import {StorePropsType} from "../redux/redux-store";

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