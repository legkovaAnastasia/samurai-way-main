import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
export const MyPosts = () => {
    return <div className={s.content}>
        <div>my posts
            <div>
                <textarea></textarea>
                <button>add post</button>
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