import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import ProfileInfo from "./MyPosts/PropfileInfo/ProfileInfo";
import {ProfilePageType} from "../redux/state";

type PropsType = ProfilePageType
    & { addPostCallback: () => void }
    & {changeNewTextCallback:(newText:string)=>void}
export const Profile = (props: PropsType) => {

    return <div>
        <ProfileInfo/>
        <MyPosts postData={props.postData} addPostCallback={props.addPostCallback} changeNewTextCallback={props.changeNewTextCallback} newPostText={props.newPostText}/>
    </div>
}