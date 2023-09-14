import {connect} from "react-redux";
import {StorePropsType} from "../redux/redux-store";
import Users, {UsersPageType} from "./Users";
import {ActionUsersType, followAC, setUsersAC, unfollowAC} from "../redux/usersReducer";
import users from "./Users";

export type MapDispatchToPropsType ={
    follow:(userId:number)=>void,
    unfollow:(userId:number)=>void,
    setUsers: (users:UsersPageType)=>void
}
const mapStateToProps = (state: StorePropsType):UsersPageType => {
    return {
            users: state.usersPage['users']
    }
}
const mapDispatchToProps = (dispatch: (action: ActionUsersType) => void):MapDispatchToPropsType => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users:UsersPageType) => {
            dispatch(setUsersAC(users))
        }
    }
}
export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)