import React from 'react';
import s from './Users.module.css'
import {UsersType} from "./UsersContainer";
import {NavLink} from "react-router-dom";

type PropsType = {
    user: UsersType
    followingInProgress: number[]
    followTC: (userId: number) => void
    unfollowTC: (userId: number) => void
}
export const User = (props: PropsType) => {
    return <div>
                <span>
                    <div className={s.photo}>
                        <NavLink to={`/profile/${props.user.id}`}>
                        <img className={s.img} alt={'user'} src={props.user.photos.small ? props.user.photos.small
                            : 'https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-82.jpg?w=2000'
                        }/>
                    </NavLink>
                    </div>
                    <div>
                        {props.user.followed ? <button
                                disabled={props.followingInProgress.some(id => id === props.user.id)}
                                onClick={() => props.unfollowTC(props.user.id)
                                }>Unfollow</button>
                            : <button
                                disabled={props.followingInProgress.some(id => id === props.user.id)}
                                onClick={() => props.followTC(props.user.id)
                                }>Follow</button>}
                    </div>
                </span>
        <span>
                    <span>
                        <div>{props.user.name}</div><div>{props.user.status}</div>
                    </span>
                    <span>
                        <div>{'user.location.city'}</div>
                        <div>{'user.location.country'}</div>
                    </span>
                </span>
    </div>
}








