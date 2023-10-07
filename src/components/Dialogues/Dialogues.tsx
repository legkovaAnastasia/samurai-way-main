import s from './Dialogues.module.css'
import {DialogueItem} from "./DialogueItem/DialogueItem";
import {Message} from "./Message/Message";

import {ChangeEvent} from "react";
import {MapStateToPropsType} from "./DialoguesContainer";

export const Dialogues = (props: MapStateToPropsType & {
    sendMessage: () => void
    newMessage: (text: string) => void
}) => {
    const onSendMessage = () => {
        props.sendMessage()
    }
    const onNewMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.newMessage(e.currentTarget.value)
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