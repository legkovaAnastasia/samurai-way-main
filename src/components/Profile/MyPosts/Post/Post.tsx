import s from './Post.module.css'

type PropsType = {
    message: string
    like: string
}
export const Post = (props: PropsType) => {
    return <div>
        <div className={s.item}>
            <img
                src='https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png'/>
            {props.message}
        </div>
        <div><span>{props.like} likes</span></div>
    </div>
}