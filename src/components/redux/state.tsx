export type PostDataType = {
    postData: Array<PostsType>
}
export type PostsType = {
    message: string,
    id: number,
    likesCount: number
}

export type DialoguesDataType = {
    dialoguesData: Array<DialoguesType>
}
export type DialoguesType = {
    name: string, id: number
}
export type MessageDataType = {
    messageData: Array<MessageType>
}
type MessageType = { message: string, id: number }
export type StateType = ProfilePageType&DialoguesPageType
export type ProfilePageType={
    profilePage: PostDataType
}
export type DialoguesPageType={
    dialoguesPage: DialoguesDataType & MessageDataType
}
let state: StateType = {
    profilePage: {
        postData: [
            {message: 'hi', id: 1, likesCount: 2},
            {message: 'nice', id: 2, likesCount: 3},
            {message: "its's okey", id: 3, likesCount: 1},
            {message: 'sdddvsdww', id: 4, likesCount: 45}
        ]
    },
    dialoguesPage: {
        dialoguesData: [
            {name: 'Nastya', id: 1},
            {name: 'Katya', id: 2},
            {name: 'Sveta', id: 3},
            {name: 'Olya', id: 4},
            {name: 'Masha', id: 5}
        ],
        messageData: [
            {message: 'hi', id: 1},
            {message: 'hello', id: 2},
            {message: 'good', id: 3}
        ]
    }

}

export default state