import ProfileInfo from "./MyPosts/PropfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {MapDispatchToPropsType, MapStateToPropsType, UserProfileType} from "./ProfileContainer";
import {ProfilePageType} from "../redux/state";

export const Profile = (props: MapStateToPropsType&MapDispatchToPropsType) => {

    return <div>
        <ProfileInfo  {...props}/>
        <MyPostsContainer profile={props.profile} status={props.status}/>
    </div>
}