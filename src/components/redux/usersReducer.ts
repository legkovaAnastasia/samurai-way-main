import {UsersPageType, UsersType} from "../Users/UsersContainer";

let initialState: UsersPageType = {
    users: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    onPageChanged: (pageNumber: number) => pageNumber,
    isFetching: false,
    followingInProgress:[]
}
export const usersReducer = (state: UsersPageType = initialState, action: ActionUsersType) => {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state, users: state.users.map(
                    u => u.id === action.id ? {...u, followed: true} : u)
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state, users: state.users.map(
                    u => u.id === action.id ? {...u, followed: false} : u)
            }
        }
        case 'SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case "SET_TOTAL_USERS_COUNT": {
            return {...state, totalUsersCount: action.count}
        }
        case "TOGGLE_IS_FETCHING": {
            return {...state, isFetching: action.isFetching}
        }
        case "TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {...state, followingInProgress: action.isFetching
                   ?[...state.followingInProgress, action.id]
                    :state.followingInProgress.filter(id=>id!==action.id)}
        }
        default:
            return state
    }
}

export type ActionUsersType = ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof toggleIsFetchingAC>
    | ReturnType<typeof toggleFollowingProgressAC>
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
export const setUsersAC = (users: UsersType[]) => {
    return {
        type: 'SET_USERS',
        users: users
    } as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: 'SET_CURRENT_PAGE',
        currentPage: currentPage
    } as const
}
export const setTotalUsersCountAC = (count: number) => {
    return {
        type: 'SET_TOTAL_USERS_COUNT',
        count: count
    } as const
}
export const toggleIsFetchingAC = (isFetching: boolean) => {
    return {
        type: 'TOGGLE_IS_FETCHING',
        isFetching: isFetching
    } as const
}
export const toggleFollowingProgressAC = (isFetching: boolean, id:number) => {
    return {
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        id, isFetching
    } as const
}