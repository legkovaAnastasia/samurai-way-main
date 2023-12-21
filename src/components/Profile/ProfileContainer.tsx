import React, {useEffect} from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {StorePropsType, useAppDispatch} from "../redux/redux-store";
import {getUserProfileTC, getUserStatusTC, updateUserStatusTC} from "../redux/profileReducer";
import {
    useNavigate,
    useParams,
} from "react-router-dom"
import {compose} from "redux";
import {AuthType, getAuthUserDataTC} from "../redux/authReducer";

export type UserProfileType = {
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string | null
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
    getAuthUserDataTC: () => void
}

export function ProfileContainer(props: MapStateToPropsType & MapDispatchToPropsType & AuthType) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const params = useParams()
    let userId = params.id
    console.log(userId)
    useEffect(() => {
        if (!userId) {
            navigate(`/profile/${props.userId}`)
        }
            dispatch(getUserProfileTC(userId))
            dispatch(getUserStatusTC(userId))
    }, [dispatch, params, navigate, userId])

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
// function withRouter(Component: ComponentType) {
//     function ComponentWithRouterProp(props: any) {
//         let location = useLocation();
//         let navigate = useNavigate();
//         let params = useParams<{id: string}>();
//         let userId = params.id
//
//         useEffect(() => {
//             if (!props.isAuth) {
//                 navigate("/login");
//             }
//         }, [props.isAuth, navigate]);
//
//         const dispatch = useAppDispatch()
//         useEffect(() => {
//             // if (!userId) {
//             //     // getAuthUserDataTC()
//             //     userId = userId?.toString()
//             // }
//             dispatch(getAuthUserDataTC())
//             navigate(`/profile/${userId}`)
//             dispatch(getUserProfileTC(userId))
//             dispatch(getUserStatusTC(userId))
//         }, [dispatch, userId, navigate])
//         return (
//             <Component
//                 {...props}
//                 router={{location, navigate, params}}
//             />
//         );
//     }
//
//     return ComponentWithRouterProp;
// }

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getAuthUserDataTC: getAuthUserDataTC,
        getUserProfileTC: getUserProfileTC,
        getUserStatusTC: getUserStatusTC,
        updateUserStatusTC: updateUserStatusTC
    }),
)(ProfileContainer)
