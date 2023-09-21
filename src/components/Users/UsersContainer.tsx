import {connect} from "react-redux";
import {StorePropsType} from "../redux/redux-store";
import {
    ActionUsersType,
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unfollowAC
} from "../redux/usersReducer";
import React from "react";
import axios from "axios";
import Users from "./Users";

export type MapStateToPropsType = {
    users: UsersType[]
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
}
export type MapDispatchToPropsType = {
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    setUsers: (users: UsersType[]) => void,
    setCurrentPage: (currentPage: number) => void,
    setTotalUsersCount: (count:number)=>void
}

export type UsersPageType = {
    users: Array<UsersType>,
    pageSize: number,
    totalUsersCount:number,
    currentPage:number,
    onPageChanged: (pageNumber: number) => void
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

// let Users = (props: UsersPageType & MapDispatchToPropsType & MapStateToPropsType) => {
// // if(props.users.length===0){
// //     props.setUsers([
// //         {id: 1, photoUrl: 'https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-82.jpg?w=2000',
// //             followed: true, fullName: 'Nastya', status: 'Ulala', location: {city: 'Minsk', country: 'Belarus'}},
// //         {id: 2, photoUrl: 'https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-82.jpg?w=2000',
// //             followed: false, fullName: 'Ksyusha', status: 'Ulala', location: {city: 'Moscow', country: 'Russia'}},
// //         {id: 3, photoUrl: 'https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-82.jpg?w=2000',
// //             followed: true, fullName: 'Olga', status: 'Ulala', location: {city: 'Gomel', country: 'Belarus'}}
// //
// //     ])
// // }
//     let getUsers = () => {
//         if (props.users.length === 0) {
//             axios.get("https://social-network.samuraijs.com/api/1.0/users")
//                 .then(response => {
//                     props.setUsers(response.data.items)
//                 })
//         }
//     }
//     console.log(props.users.flat()[1])
//
//     return <div>
//         <button onClick={getUsers}>Get Users</button>
//
//         {props.users.flat().map(u => <div key={u.id + 1}>
//                 <span>
//                     <div className={s.photo}>
//                         <img alt={'user'} src={u.photos.small? u.photos.small
//                             :'https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-82.jpg?w=2000'
//                              }/></div>
//                     {/*<div><button onClick={()=>{}}>{u.followed===true?'unfollow':'follow'}</button></div>*/}
//                     <div>
//                         {u.followed ? <button onClick={() => {
//                                 props.unfollow(u.id)
//                             }}>Unfollow</button>
//                             : <button onClick={() => {
//                                 props.follow(u.id)
//                             }}>Follow</button>}
//                     </div>
//                 </span>
//             <span>
//                     <span>
//                         <div>{u.name}</div><div>{u.status}</div>
//                     </span>
//                     <span>
//                         <div>{'u.location.city'}</div>
//                         <div>{'u.location.country'}</div>
//                     </span>
//                 </span>
//         </div>)}
//     </div>
//         ;
// };

class UsersAPIComponent extends React.Component<MapStateToPropsType& MapDispatchToPropsType> {
    componentDidMount() {
        if(this.props.users.length===0) {
            axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
                .then(response => {
                    debugger
                    this.props.setUsers(response.data.items)
                    this.props.setTotalUsersCount(response.data.totalCount)
                })
        }
    }
    onPageChanged = (pageNumber:number)=>{
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                debugger
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return <Users users={this.props.users}
                      pageSize={this.props.pageSize}
                      totalUsersCount={this.props.totalUsersCount}
                      currentPage={this.props.currentPage}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      setUsers={this.props.setUsers}
                      setCurrentPage={this.props.setCurrentPage}
                      setTotalUsersCount={this.props.setTotalUsersCount}
                      onPageChanged={this.onPageChanged.bind}/>
    }
}
const mapStateToProps = (state: StorePropsType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}
const mapDispatchToProps = (dispatch: (action: ActionUsersType) => void) => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: UsersType[]) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUsersCount: (count: number) => {
            dispatch(setTotalUsersCountAC(count))
        }
    }
}
export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent)