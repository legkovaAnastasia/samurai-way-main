import React, {Component} from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {StorePropsType} from "../redux/redux-store";
import {addPostAC, changeNewTextAC, setUserProfileAC} from "../redux/profileReducer";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom"
import {UsersAPI} from "../../api/api";

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
    postData: Array<PostsType>
}
type PostsType = {
    message: string,
    id: number,
    likesCount: number
}
export type MapDispatchToPropsType = {
    setUserProfile: (profile: UserProfileType) => void
}

export function ProfileAPIComponent (props:MapStateToPropsType & MapDispatchToPropsType) {
        // let userId = props.router.params.userId.toString()
    // debugger
    let params = useParams()
    let userId = params.userId
UsersAPI.getProfile(userId)
    .then(response => {
                props.setUserProfile(response.data)
            })


        return <div>
            <Profile {...props} contacts={props.profile.contacts}
                     userId={props.profile.userId} fullName={props.profile.fullName}
                     lookingForAJob={props.profile.lookingForAJob}
                     lookingForAJobDescription={props.profile.lookingForAJobDescription}
                     photos={props.profile.photos}/>
        </div>

}
// export class ProfileAPIComponent extends React.Component<MapStateToPropsType & MapDispatchToPropsType&RouterPropsType &PathParamType> {
//     componentDidMount() {
//         let userId = this.props.router.params.userId.toString()
//         axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
//             .then(response => {
//                 this.props.setUserProfile(response.data)
//             })
//     }
//
//     render() {
//         return <div>
//             <Profile {...this.props} contacts={this.props.profile.contacts}
//                      userId={this.props.profile.userId} fullName={this.props.profile.fullName}
//                      lookingForAJob={this.props.profile.lookingForAJob}
//                      lookingForAJobDescription={this.props.profile.lookingForAJobDescription}
//                      photos={this.props.profile.photos}/>
//         </div>
//     }
// }

let mapStateToProps = (state: StorePropsType) => {
    return {
        profile: state.profilePage.profile,
        newPostText: state.profilePage.newPostText,
        postData: state.profilePage.postData
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

export const ProfileContainer = connect(mapStateToProps, {
    setUserProfile: setUserProfileAC,
    addPost: addPostAC,
    changeNewText: changeNewTextAC
})(withRouter(ProfileAPIComponent))