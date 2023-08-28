import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {ActionType,ProfilePageType} from "../../redux/state";
import {ActionProfileType, addPostAC, changeNewTextAC} from "../../redux/profileReducer";
import React, {ChangeEvent} from "react";

// type PropsType = ProfilePageType
//     & { dispatch: (action:ActionProfileType) => void }

type PropsType = ProfilePageType&{
    updateNewPostText: (text:string)=>void
    addPost: ()=>void
}

export const MyPosts = (props: PropsType) => {

    let postsElements = props.postData.map(el =>
        <Post message={el.message} like={el.likesCount} id={el.id}/>)
    const addPost = () => {
        props.addPost()
    }
    const onPostChange=(e:ChangeEvent<HTMLTextAreaElement>)=>{
        let newText=e.currentTarget.value
        props.updateNewPostText(newText)
    }
    return <div className={s.content}>
        <div className={s.postsBlock}>
            <h3>my posts</h3>
            <div>
                <div><textarea onChange={onPostChange} value={props.newPostText} /></div>
                <div>
                    <button onClick={addPost}>add post</button>
                </div>
            </div>
            <div>new posts
                <div className={s.posts}>
                    {postsElements}
                </div>
            </div>
        </div>
    </div>
}