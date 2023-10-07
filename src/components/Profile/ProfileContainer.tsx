import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {StorePropsType} from "../redux/redux-store";
import {addPostAC, changeNewTextAC, getUserProfileTC} from "../redux/profileReducer";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom"
import {withAuthRedirect} from "../HOC/withAuthRedirect";

export type UserProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ''
    photos: PhotosType
}
type PhotosType = {
    small: string | undefined
    large: string | undefined
}
// type ContactsType = {
//     github: string
//     vk: string
//     facebook: string
//     instagram: string
//     twitter: string
//     website: string
//     youtube: string
//     mainLink: string
// }
export type MapStateToPropsType = {
    profile: UserProfileType,
    newPostText: string,
    postData: Array<PostsType>,
}
type PostsType = {
    message: string,
    id: number,
    likesCount: number
}
export type MapDispatchToPropsType = {
    getUserProfileTC: (userId:string|undefined)=>void
}

export function ProfileAPIComponent (props:MapStateToPropsType & MapDispatchToPropsType) {
    let params = useParams()
    let userId = params.userId
props.getUserProfileTC(userId)

    return <div>
            <Profile {...props} contacts={props.profile.contacts}
                     userId={props.profile.userId} fullName={props.profile.fullName}
                     lookingForAJob={props.profile.lookingForAJob}
                     lookingForAJobDescription={props.profile.lookingForAJobDescription}
                     photos={props.profile.photos}/>
        </div>

}

let mapStateToProps = (state: StorePropsType) => {
    return {
        profile: state.profilePage.profile,
        newPostText: state.profilePage.newPostText,
        postData: state.profilePage.postData,
    }
}

function withRouter(Component: any) {

    function ComponentWithRouterProp(props:any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

export const ProfileContainer = withAuthRedirect(connect(mapStateToProps, {
    addPost: addPostAC,
    changeNewText: changeNewTextAC,
    getUserProfileTC: getUserProfileTC
})(withRouter(ProfileAPIComponent)))