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
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string | null
    contacts: string
    photos: PhotosType
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
    getUserProfileTC: (userId: string | undefined) => void
    getUserStatusTC: (userId: string | undefined) => void
    updateUserStatusTC: (status: string) => void
    getAuthUserDataTC: () => void
    savePhotoTC: (file: File) => void
}

export function ProfileContainer(props: MapStateToPropsType & MapDispatchToPropsType & AuthType) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const params = useParams()
    let userId = params.id

    useEffect(() => {
        if (!userId) {
            navigate(`/profile/${props.userId}`)
            dispatch(getUserProfileTC(props.userId?.toString()))
            dispatch(getUserStatusTC(props.userId?.toString()))
        }
        dispatch(getUserProfileTC(userId))
        dispatch(getUserStatusTC(userId))
    }, [dispatch])

    return <div>
        <Profile {...props} profile={props.profile}
                 isOwner={userId === props.userId?.toString()}
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
