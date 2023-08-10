import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {ProfilePageType} from "../../redux/state";
import React, {ChangeEvent} from "react";

type PropsType = ProfilePageType
    & { addPostCallback: () => void }
    & {changeNewTextCallback:(newText:string)=>void}


export const MyPosts = (props: PropsType) => {

    let postsElements = props.postData.map(el =>
        <Post message={el.message} like={el.likesCount} id={el.id}/>)
    const addPost = () => {
        props.addPostCallback()
    }
    const onPostChange=(e:ChangeEvent<HTMLTextAreaElement>)=>{
        props.changeNewTextCallback(e.currentTarget.value)
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
                    {/*<Post message={postData[0].message} like={postData[0].likesCount} id={postData[0].id}/>*/}
                    {/*<Post message={postData[1].message} like={postData[1].likesCount} id={postData[1].id}/>*/}
                    {/*<Post message={postData[2].message} like={postData[2].likesCount} id={postData[2].id}/>*/}
                    {/*<Post message={postData[3].message} like={postData[3].likesCount} id={postData[3].id}/>*/}
                </div>
            </div>
        </div>
    </div>
}