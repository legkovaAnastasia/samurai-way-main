import React from 'react';
import s from './Users.module.css'
import {MapDispatchToPropsType, MapStateToPropsType, UsersPageType} from "./UsersContainer";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {UsersAPI} from "../../api/api";

const Users = (props: UsersPageType & MapDispatchToPropsType & MapStateToPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        {pages.map(p => {
            return <span className={props.currentPage === p ? s.selectedPage : s.page}
                         onClick={() => props.onPageChanged(p)}>{p} </span>
        })}
        {props.users.map(u => <div key={u.id + 1}>
                <span>
                    <div className={s.photo}>
                        <NavLink to={'/profile/' + u.id}>
                        <img className={s.img} alt={'user'} src={u.photos.small ? u.photos.small
                            : 'https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-82.jpg?w=2000'
                        }/>
                    </NavLink>
                    </div>
                    {/*<div><button onClick={()=>{}}>{u.followed===true?'unfollow':'follow'}</button></div>*/}
                    <div>
                        {u.followed ? <button onClick={() => {
                                UsersAPI.unfollowUser(u.id)
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                    })
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                UsersAPI.followUser(u.id)
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                    })
                            }}>Follow</button>}
                    </div>
                </span>
            <span>
                    <span>
                        <div>{u.name}</div><div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.city'}</div>
                        <div>{'u.location.country'}</div>
                    </span>
                </span>
        </div>)}
    </div>
}

export default Users;