import {connect} from "react-redux";
import {StorePropsType} from "../redux/redux-store";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC, toggleIsFetchingAC,
    unfollowAC
} from "../redux/usersReducer";
import React from "react";
import axios from "axios";
import Users from "./Users";
import preloader from '../../assets/preloader.svg'

export type MapStateToPropsType = {
    users: UsersType[]
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
}
export type MapDispatchToPropsType = {
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    setUsers: (users: UsersType[]) => void,
    setCurrentPage: (currentPage: number) => void,
    setTotalUsersCount: (count: number) => void,
    toggleIsFetching: (isFetching: boolean) => void
}

export type UsersPageType = {
    users: Array<UsersType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    isFetching: boolean
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

class UsersAPIComponent extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    componentDidMount() {
        this.props.toggleIsFetching(true)
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
                .then(response => {
                    this.props.toggleIsFetching(false)
                    this.props.setUsers(response.data.items)
                    this.props.setTotalUsersCount(response.data.totalCount)
                })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
            })
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
                       toggleIsFetching={this.props.toggleIsFetching}
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
        isFetching: state.usersPage.isFetching
    }
}
// const mapDispatchToProps = (dispatch: (action: ActionUsersType) => void) => {
//     return {
//         follow: (userId: number) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId: number) => {
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users: UsersType[]) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (currentPage: number) => {
//             dispatch(setCurrentPageAC(currentPage))
//         },
//         setTotalUsersCount: (count: number) => {
//             dispatch(setTotalUsersCountAC(count))
//         },
//         toggleIsFetching: (isFetching: boolean) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }
export const UsersContainer = connect(mapStateToProps,  {
        follow: followAC,
        unfollow: unfollowAC,
        setUsers: setUsersAC,
        setCurrentPage: setCurrentPageAC,
        setTotalUsersCount: setTotalUsersCountAC,
        toggleIsFetching: toggleIsFetchingAC // можно переименовать AC в просто  follow(вместо followAC
    }                                        // и таким образом оставить только follow (тк ключ-значение совпадают
    )(UsersAPIComponent)