import s from './Dialogues.module.css'
import {DialogueItem} from "./DialogueItem/DialogueItem";
import {Message} from "./Message/Message";
import {
    ActionType,
    DialoguesPageType,
    sendMessageAC,
    updateNewMessageBodyAC
} from "../../components/redux/state";
import {ChangeEvent} from "react";

export const Dialogues = (props: DialoguesPageType & { dispatch: (action: ActionType) => void }) => {
    const onSendMessage = () => {
        props.dispatch(sendMessageAC())
    }
    const onNewMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(updateNewMessageBodyAC(e.currentTarget.value))
    }
    return (
        <div className={s.dialogues}>
            <div className={s.dialogueItems}>
                {props.dialoguesData.map(el => {
                    return <DialogueItem name={el.name} id={el.id}/>
                })}
            </div>
            <div className={s.messages}>
                {props.messageData.map(el => {
                    return <Message text={el.message} id={el.id}/>
                })}
                <div>
                    <div><textarea value={props.newMessageBody} onChange={onNewMessage}
                                   placeholder='Enter your message'></textarea></div>
                    <div>
                        <button onClick={onSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}