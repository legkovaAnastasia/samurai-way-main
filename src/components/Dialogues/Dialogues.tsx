import s from './Dialogues.module.css'
import {DialogueItem} from "./DialogueItem/DialogueItem";
import {Message} from "./Message/Message";
import {DialoguesPageType} from "../../components/redux/state";
export const Dialogues = (props:DialoguesPageType) => {
    debugger
    // let dialoguesData = [
    //     {name: 'Nastya', id:1},
    //     {name: 'Katya', id:2},
    //     {name: 'Sveta', id:3},
    //     {name: 'Olya', id:4},
    //     {name: 'Masha', id:5}
    // ]
    // let messageData = [
    //     {message: 'hi', id:1},
    //     {message: 'hello', id:2},
    //     {message: 'good', id:3}
    // ]
    return (
        <div className={s.dialogues}>
            <div className={s.dialogueItems}>
                {props.dialoguesData.map(el=>{
                    return <DialogueItem name={el.name} id={el.id}/>
                })}
            </div>
            <div className={s.messages}>
                {props.messageData.map(el=>{
                    return <Message text={el.message} id={el.id}/>})}
            </div>
        </div>
    )
}