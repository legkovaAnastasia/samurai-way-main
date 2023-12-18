import React, {useEffect} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {StorePropsType, useAppDispatch} from "../redux/redux-store";
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
    contacts: string
    photos: PhotosType,
}
type PhotosType = {
    small: string | undefined
    large: string | undefined
}

export type MapStateToPropsType = {
    profile: UserProfileType,
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

export function ProfileContainer(props: MapStateToPropsType & MapDispatchToPropsType) {
    const params = useParams()
    const userId = params.userId
    // console.log(params)
    // let userId=+userId
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAuthUserDataTC())
        // const userId = params.userId
        // console.log(params)
        dispatch(getUserProfileTC(userId))
        dispatch(getUserStatusTC(userId))
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
        isAuth: state.auth.isAuth,
        userId: state.auth.userId
    }
}
console.log('rerender profile')
function withRouter(Component: any) {

    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        useEffect(() => {
            if (!props.isAuth) {
                navigate("/login");
            }
        }, [props.isAuth, navigate]);
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
        getUserProfileTC: getUserProfileTC,
        getUserStatusTC: getUserStatusTC,
        updateUserStatusTC: updateUserStatusTC
    }),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)
