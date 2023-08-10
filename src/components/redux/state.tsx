// import {rerenderEntireTree} from "../../index";

export type PostsType = {
    message: string,
    id: number,
    likesCount: number
}
export type DialoguesPageType = {
    dialoguesData: Array<DialoguesType>
    messageData: Array<MessageType>
}
export type DialoguesType = {
    name: string, id: number
}
export type MessageType = {
    message: string,
    id: number
}
export type ProfilePageType = {
    newPostText:string
    postData: Array<PostsType>
}
export type StateType={
    profilePage: ProfilePageType
        dialoguesPage: DialoguesPageType
}

export type StoreType={
    _state: StateType
    changeNewText: (newText:string)=>void
    addPost: ()=>void
    _callSubscriber
        : ()=>void
    subscribe:(callback: ()=>void)=>void
    getState: ()=>StateType
}
const store: StoreType = {
    _state:  {
    profilePage: {
        newPostText: 'pipiska',
        postData: [
            {message: 'hi', id: 1, likesCount: 2},
            {message: 'nice', id: 2, likesCount: 3},
            {message: "its's okey", id: 3, likesCount: 1},
            {message: 'sdddvsdww', id: 4, likesCount: 45}
        ],
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
},
    changeNewText(newText:string){
        this._state.profilePage.newPostText=newText
        this._callSubscriber
        ()
    },
    addPost() {
        let newPost: PostsType = {id: 5, message: this._state.profilePage.newPostText, likesCount: 300}
        this._state.profilePage.postData.push(newPost)
        this._state.profilePage.newPostText=''
        this._callSubscriber
        ()
    },
    _callSubscriber
    () {
        console.log('state changed')
    },
    subscribe(callback){
        this._callSubscriber
            =callback
    },
    getState(){
        return this._state
    }
}
export default store