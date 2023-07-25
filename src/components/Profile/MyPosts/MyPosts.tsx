import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
export const MyPosts = () => {
    let postData = [
        {message: 'hi', id:1, likesCount:2},
        {message: 'nice', id:2, likesCount:3},
        {message: "its's okey", id:3, likesCount:1},
        {message: 'sdddvsdww', id:4, likesCount:45}
    ]
    return <div className={s.content}>
        <div className={s.postsBlock}>
            <h3>my posts</h3>
            <div>
               <div><textarea></textarea></div>
                <div><button>add post</button></div>
            </div>
            <div>new posts
                <div className={s.posts}>
                    {postData.map(el=>{
                        <Post message={el.message} like={el.likesCount} id={el.id}/>
                    })}
                    {/*<Post message={postData[0].message} like={postData[0].likesCount} id={postData[0].id}/>*/}
                    {/*<Post message={postData[1].message} like={postData[1].likesCount} id={postData[1].id}/>*/}
                    {/*<Post message={postData[2].message} like={postData[2].likesCount} id={postData[2].id}/>*/}
                    {/*<Post message={postData[3].message} like={postData[3].likesCount} id={postData[3].id}/>*/}
                </div>
            </div>
        </div>
    </div>
}