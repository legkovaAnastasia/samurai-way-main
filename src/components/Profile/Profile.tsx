import ProfileInfo from "./MyPosts/PropfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {MapDispatchToPropsType, MapStateToPropsType, UserProfileType} from "./ProfileContainer";
import {ProfilePageType} from "../redux/state";

export const Profile = (props: ProfilePageType|UserProfileType&MapStateToPropsType&MapDispatchToPropsType) => {

    return <div>
        <ProfileInfo  newPostText={props.newPostText} profile={props.profile} postData={props.postData} />
        <MyPostsContainer profile={props.profile}/>
    </div>
}