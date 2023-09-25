import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {StorePropsType} from "../redux/redux-store";
import {addPostAC, changeNewTextAC, setUserProfileAC} from "../redux/profileReducer";

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

export class ProfileAPIComponent extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return <div>
            <Profile {...this.props} contacts={this.props.profile.contacts}
                     userId={this.props.profile.userId} fullName={this.props.profile.fullName}
                     lookingForAJob={this.props.profile.lookingForAJob}
                     lookingForAJobDescription={this.props.profile.lookingForAJobDescription}
                     photos={this.props.profile.photos}/>
        </div>
    }
}

let mapStateToProps = (state: StorePropsType) => {
    return {
        profile: state.profilePage.profile,
        newPostText:state.profilePage.newPostText,
        postData:state.profilePage.postData
    }
}

export const ProfileContainer = connect(mapStateToProps, {
    setUserProfile: setUserProfileAC,
    addPost: addPostAC,
    changeNewText: changeNewTextAC
})(ProfileAPIComponent)