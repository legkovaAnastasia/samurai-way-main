import s from './Dialogues.module.css'
import {NavLink} from "react-router-dom";
type PropsType = {
    name:string
    id:string
}
const DialogueItem = (props: PropsType) => {
    let path = '/dialogue/' + props.id
    return(
        <div className={s.dialogue}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

type MessagePropsType = {
    text: string
}
const Message = (props: MessagePropsType) => {
    return <div className={s.message}>{props.text}</div>

}
export const Dialogues = () => {
    return (
        <div className={s.dialogues}>
            <div className={s.dialogueItems}>
                <DialogueItem name='Nastya' id='1'/>
                <DialogueItem name='Katya' id='2'/>
                <DialogueItem name='Sveta' id='3'/>
                <DialogueItem name='Olya' id='4'/>
                <DialogueItem name='Masha' id='5'/>
            </div>
            <div className={s.messages}>
                <Message text='hi'/>
                <Message text='hello'/>
                <Message text='good morning'/>
            </div>
        </div>
    )
}