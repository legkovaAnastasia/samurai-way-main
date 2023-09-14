import {UsersPageType} from "../Users/Users";

let initialState: UsersPageType = {
    users: [
        {id: 1, photoUrl: 'https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-82.jpg?w=2000',
            followed: true, fullName: 'Nastya', status: 'Ulala', location: {city: 'Minsk', country: 'Belarus'}},
        {id: 2, photoUrl: 'https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-82.jpg?w=2000',
            followed: false, fullName: 'Ksyusha', status: 'Ulala', location: {city: 'Moscow', country: 'Russia'}},
        {id: 3, photoUrl: 'https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-82.jpg?w=2000',
            followed: true, fullName: 'Olga', status: 'Ulala', location: {city: 'Gomel', country: 'Belarus'}}
    ]
}
export const usersReducer = (state: UsersPageType = initialState, action: ActionUsersType) => {
    switch (action.type) {
        case 'FOLLOW': {
            return {...state, users: state.users.map(
                u => u.id === action.id ? {...u, followed: true} : u)}
        }
        case 'UNFOLLOW': {
            return {...state, users: state.users.map(
                u => u.id === action.id ? {...u, followed: false} : u)}
        }
        case 'SET_USERS': {
            return {...state, users: [...state.users, action.users ]}
        }
        default:
            return state
    }
}

export type ActionUsersType = ReturnType<typeof followAC> | ReturnType<typeof unfollowAC> | ReturnType<typeof setUsersAC>
export const followAC = (userId: number) => {
    return {
        type: "FOLLOW",
        id: userId
    } as const
}
export const unfollowAC = (userId: number) => {
    return {
        type: "UNFOLLOW",
        id: userId
    } as const
}
export const setUsersAC = (users: UsersPageType) => {
    return {
        type: 'SET_USERS',
        users:users
    }as const
}
// export const unfollowAC = (followed:boolean) => {
//     return {
//         type: 'UNFOLLOW',
//         followed: followed
//     } as const
// }