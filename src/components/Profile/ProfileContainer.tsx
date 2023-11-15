import React, {useEffect} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {StorePropsType} from "../redux/redux-store";
import {getUserProfileTC, getUserStatusTC, updateUserStatusTC} from "../redux/profileReducer";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom"
import {withAuthRedirect} from "../HOC/withAuthRedirect";
import {compose} from "redux";
import {getAuthUserDataTC} from "../redux/authReducer";

export type UserProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ''
    photos: PhotosType,
}
type PhotosType = {
    small: string | undefined
    large: string | undefined
}

export type MapStateToPropsType = {
    profile: UserProfileType,
    newPostText: string,
    postData: Array<PostsType>,
    status: string,
    isAuth: boolean
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
    getAuthUserDataTC:()=>void
}

export function ProfileAPIComponent(props: MapStateToPropsType & MapDispatchToPropsType) {
    let params = useParams()
    let userId = params.userId
    useEffect(() => {
        props.getUserProfileTC(userId)
        props.getUserStatusTC(userId)
        props.getAuthUserDataTC()
    }, [])

    return <div>
        <Profile {...props} profile={props.profile}
                 status={props.status}
                 updateUserStatusTC={props.updateUserStatusTC}
        />
    </div>
}

let mapStateToProps = (state: StorePropsType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth
    }
}

function withRouter(Component: any) {

    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getAuthUserDataTC:getAuthUserDataTC,
        getUserProfileTC: getUserProfileTC, getUserStatusTC: getUserStatusTC, updateUserStatusTC: updateUserStatusTC
    }),
    withRouter,
    withAuthRedirect
)(ProfileAPIComponent)
