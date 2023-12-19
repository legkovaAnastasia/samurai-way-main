import React from 'react';
import {MapDispatchToPropsType, MapStateToPropsType, UsersPageType} from "./UsersContainer";
import {Paginator} from "../common/Paginator";
import {User} from "./User";

const Users = (props: UsersPageType & MapDispatchToPropsType & MapStateToPropsType) => {
    return <div>
        <Paginator pageSize={props.pageSize} totalItemsCount={props.totalUsersCount} currentItem={props.currentPage}
                   onPageChanged={props.onPageChanged} portionSize = {10}/>
        {props.users.map(u => <User key={u.id}
                                    user={u}
                                    followTC={props.followTC}
                                    unfollowTC={props.unfollowTC}
                                    followingInProgress={props.followingInProgress}
        />)}
    </div>
}

export default Users;







