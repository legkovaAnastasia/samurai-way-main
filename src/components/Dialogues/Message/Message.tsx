import s from './../Dialogues.module.css'

type MessagePropsType = {
    text: string
    id:number
}
export const Message = (props: MessagePropsType) => {
    return <div className={s.message}>{props.text}</div>

}