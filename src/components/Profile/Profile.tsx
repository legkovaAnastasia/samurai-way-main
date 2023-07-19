import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import ProfileInfo from "./MyPosts/PropfileInfo/ProfileInfo";

export const Profile = () => {
    return <div>
        <ProfileInfo/>
        <MyPosts/>
    </div>
}