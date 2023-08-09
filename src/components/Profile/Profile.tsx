import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import ProfileInfo from "./MyPosts/PropfileInfo/ProfileInfo";
import {ProfilePageType} from "../redux/state";


export const Profile = (props: ProfilePageType) => {

    return <div>
        <ProfileInfo/>
        <MyPosts postData={props.profilePage.postData}/>
    </div>
}