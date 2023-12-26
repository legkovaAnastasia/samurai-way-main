import React, {useEffect} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {StorePropsType, useAppDispatch} from "../redux/redux-store";
import {getUserProfileTC, getUserStatusTC, savePhotoTC, updateUserStatusTC} from "../redux/profileReducer";
import {
    useNavigate,
    useParams,
} from "react-router-dom"
import {compose} from "redux";
import {AuthType, getAuthUserDataTC} from "../redux/authReducer";

export type UserProfileType = {
    isOwner: boolean | null,
    userId: number | null
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string | null
    contacts: ContactsType
    photos: PhotosType
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type PhotosType = {
    small: string | null
    large: string | null
}

export type MapStateToPropsType = {
    profile: UserProfileType,
    postData: Array<PostsType>,
    status: string,
    isAuth: boolean
    isOwner: boolean
}
type PostsType = {
    message: string,
    id: number,
    likesCount: number
}
export type MapDispatchToPropsType = {
    getUserProfileTC: (userId: number | null) => void
    getUserStatusTC: (userId: number | null) => void
    updateUserStatusTC: (status: string) => void
    getAuthUserDataTC: () => void
    savePhotoTC: (file: File) => void
}

export function ProfileContainer(props: MapStateToPropsType & MapDispatchToPropsType & AuthType) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const params = useParams()
    const userId = Number(params.id)

    useEffect(() => {
        if (!userId) {
            navigate(`/profile/${props.userId}`)
            dispatch(getUserProfileTC(props.userId))
            dispatch(getUserStatusTC(props.userId))
        }
        dispatch(getUserProfileTC(Number(userId)))
        dispatch(getUserStatusTC(Number(userId)))
    }, [dispatch, props.userId, userId])
    return <div>
        <Profile {...props} profile={props.profile}
                 isOwner={userId === props.userId}
                 status={props.status}
                 updateUserStatusTC={props.updateUserStatusTC}
                 savePhotoTC={props.savePhotoTC}
        />
    </div>
}

let mapStateToProps = (state: StorePropsType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        userId: state.auth.userId,
        isOwner: state.profilePage.profile.isOwner
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getAuthUserDataTC: getAuthUserDataTC,
        getUserProfileTC: getUserProfileTC,
        getUserStatusTC: getUserStatusTC,
        updateUserStatusTC: updateUserStatusTC,
        savePhotoTC: savePhotoTC
    }),
)(ProfileContainer)
