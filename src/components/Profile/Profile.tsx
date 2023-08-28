import s from './Profile.module.css'
import {MyPosts} from "./MyPosts/MyPosts";
import ProfileInfo from "./MyPosts/PropfileInfo/ProfileInfo";
import {ActionType, ProfilePageType} from "../redux/state";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

type PropsType = ProfilePageType
    & { dispatch: (action:ActionType) => void }
    // & {changeNewTextCallback:(newText:string)=>void}
export const Profile = () => {

    return <div>
        <ProfileInfo/>
        {/*<MyPostsContainer postData={props.postData} dispatch={props.dispatch}  newPostText={props.newPostText}/>*/}
        <MyPostsContainer />
    </div>
}