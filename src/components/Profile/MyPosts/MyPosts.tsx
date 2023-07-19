import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
export const MyPosts = () => {
    return <div className={s.content}>
        <div className={s.postsBlock}>
            <h3>my posts</h3>
            <div>
               <div><textarea></textarea></div>
                <div><button>add post</button></div>
            </div>
            <div>new posts
                <div className={s.posts}>
                    <Post message='hi' like='1'/>
                    <Post message='nice' like='2'/>
                    <Post message="its's okey" like='2'/>
                    <Post message='sdddvsdww' like='45'/>
                </div>
            </div>
        </div>
    </div>
}