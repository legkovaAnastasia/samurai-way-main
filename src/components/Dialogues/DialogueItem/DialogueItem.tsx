import {NavLink} from "react-router-dom";
import s from './../Dialogues.module.css'


type PropsType = {
    name:string
    id:number
}
export const DialogueItem = (props: PropsType) => {
    let path = '/dialogue/' + props.id
    return(
        <div className={s.dialogue}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}