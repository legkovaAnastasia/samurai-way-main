import axios, {AxiosResponse} from "axios";


type LoginDataType = {
    email: string,
    password: string,
    rememberMe: boolean
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
})

export const UsersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    me() {
        return instance.get('auth/me')
    },
    login(data: LoginDataType) {
        return instance.post('auth/login', data);
    },
    logout() {
        return instance.delete('auth/login')
    },
    followUser(userId: number) {
        return instance.post<any, AxiosResponse<ResponseType>>(`follow/${userId}`)
    },
    unfollowUser(userId: number) {
        return instance.delete(`follow/${userId}`)
    }

}
export const ProfileAPI = {
    getProfile(userId: string | undefined) {
        return instance.get<any, AxiosResponse>(`profile/${userId}`)
    },
    getStatus(userId: string | undefined) {
        return instance.get<any, AxiosResponse>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status})
    },
    savePhoto(file: File) {
        const formData = new FormData()
        formData.append('image', file)
        return instance.put<any, AxiosResponse>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/firm-data'
            }
        })
    }

}
