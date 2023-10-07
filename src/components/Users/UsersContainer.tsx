import {connect} from "react-redux";
import {StorePropsType} from "../redux/redux-store";
import {
    followSuccessAC, followTC, getUsersTC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC, toggleFollowingProgressAC,
    unfollowSuccessAC, unfollowTC
} from "../redux/usersReducer";
import React from "react";
import Users from "./Users";
import preloader from '../../assets/preloader.svg'

export type MapStateToPropsType = {
    users: UsersType[]
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: number[]
}
export type MapDispatchToPropsType = {
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    setUsers: (users: UsersType[]) => void,
    setCurrentPage: (currentPage: number) => void,
    setTotalUsersCount: (count: number) => void,
    toggleFollowingProgress: (isFetching: boolean, id: number) => void
    getUsersTC:(currentPage:number, pageSize:number)=>void
    unfollowTC:(userId:number)=>void
    followTC:(userId:number)=>void
}

export type UsersPageType = {
    users: UsersType[],
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    isFetching: boolean,
    followingInProgress: number[]
}
export type UsersType = {
    id: number,
    photos: PhotosType,
    uniqueURL: string
    followed: boolean,
    name: string,
    status: string,
    // location: Location
}
type PhotosType = {
    small: string | null
    large: string | null
}

class UsersAPIComponent extends React.Component<MapStateToPropsType & MapDispatchToPropsType > {
    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersTC(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <img src={preloader}/> :
                <Users users={this.props.users}
                       pageSize={this.props.pageSize}
                       totalUsersCount={this.props.totalUsersCount}
                       currentPage={this.props.currentPage}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       setUsers={this.props.setUsers}
                       setCurrentPage={this.props.setCurrentPage}
                       setTotalUsersCount={this.props.setTotalUsersCount}
                       onPageChanged={this.onPageChanged.bind(this)}
                       isFetching={this.props.isFetching}
                       toggleFollowingProgress={this.props.toggleFollowingProgress}
                       followingInProgress={this.props.followingInProgress}
                       getUsersTC={this.props.getUsersTC}
                       unfollowTC={this.props.unfollowTC}
                       followTC={this.props.followTC}
                />
            }
        </>
    }
}

const mapStateToProps = (state: StorePropsType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}
export const UsersContainer = connect(mapStateToProps, {
    follow: followSuccessAC,
    unfollow: unfollowSuccessAC,
    setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC,
    setTotalUsersCount: setTotalUsersCountAC,
    toggleFollowingProgress: toggleFollowingProgressAC,
    getUsersTC:getUsersTC,
    unfollowTC: unfollowTC,
    followTC: followTC                                    // можно переименовать AC в просто  follow(вместо followAC
})                                                       // и таким образом оставить только follow (тк ключ-значение совпадают
    (UsersAPIComponent)