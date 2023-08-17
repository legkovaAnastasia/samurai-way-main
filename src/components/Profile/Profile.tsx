import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import ProfileInfo from "./MyPosts/PropfileInfo/ProfileInfo";
import {ActionType, ProfilePageType} from "../redux/state";

type PropsType = ProfilePageType
    & { dispatch: (action:ActionType) => void }
    // & {changeNewTextCallback:(newText:string)=>void}
export const Profile = (props: PropsType) => {

    return <div>
        <ProfileInfo/>
        <MyPosts postData={props.postData} dispatch={props.dispatch}  newPostText={props.newPostText}/>
    </div>
}