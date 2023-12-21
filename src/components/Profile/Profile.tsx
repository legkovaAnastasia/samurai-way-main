import ProfileInfo from "./MyPosts/PropfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {MapDispatchToPropsType, MapStateToPropsType} from "./ProfileContainer";
import React from "react";

export const Profile = (props: MapStateToPropsType&MapDispatchToPropsType) => {

    return <div>
        <ProfileInfo  {...props}/>
        <MyPostsContainer profile={props.profile} status={props.status}/>
    </div>
}