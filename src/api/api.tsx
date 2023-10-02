import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials:true
})

export const UsersAPI={
    getUsers (currentPage:number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res=>res.data)
    },
    getAuth() {
        return instance.get('auth/me')
    },
    getProfile(userId:string|undefined){
        return instance.get('profile/'+userId)
    },
    followUser(userId:number) {
        return instance.post(`follow/${userId}`, {})
    },
    unfollowUser(userId:number) {
        return instance.delete(`follow/${userId}`)
    }

}
