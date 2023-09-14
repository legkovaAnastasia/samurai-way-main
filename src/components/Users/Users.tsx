import React from 'react';
import s from './Users.module.css'
import {useDispatch} from "react-redux";
import {followAC} from "../redux/usersReducer";
import {MapDispatchToPropsType} from "./UsersContainer";

export type UsersPageType = {
    users: Array<Users>
}
type Users = {
    id: number,
    photoUrl: string,
    followed: boolean,
    fullName: string,
    status: string,
    location: Location
}
type Location = {
        city: string,
        country: string
}
const Users = (props: UsersPageType & MapDispatchToPropsType) => {
// if(props.users.length===0){
//     props.setUsers([
//         {id: 1, photoUrl: 'https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-82.jpg?w=2000',
//             followed: true, fullName: 'Nastya', status: 'Ulala', location: {city: 'Minsk', country: 'Belarus'}},
//         {id: 2, photoUrl: 'https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-82.jpg?w=2000',
//             followed: false, fullName: 'Ksyusha', status: 'Ulala', location: {city: 'Moscow', country: 'Russia'}},
//         {id: 3, photoUrl: 'https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-82.jpg?w=2000',
//             followed: true, fullName: 'Olga', status: 'Ulala', location: {city: 'Gomel', country: 'Belarus'}}
//
//     ])
// }

    return (
        <div>
            {props.users.map(u=><div key={u.id}>
                <span>
                    <div className={s.photo}><img src={u.photoUrl}/></div>
                    {/*<div><button onClick={()=>{}}>{u.followed===true?'unfollow':'follow'}</button></div>*/}
                    <div>
                        {u.followed?<button onClick={() => {props.unfollow(u.id)}}>
                            Unfollow</button>
                            :<button onClick={() => {props.follow(u.id)}}>
                                Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div><div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.city}</div><div>{u.location.country}</div>
                    </span>
                </span>
            </div>)}
        </div>
    );
};

export default Users;