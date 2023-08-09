import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {rename} from "fs";

// export type PostDataType ={
//     postData: Array<PostsType>
// }
// export type PostsType = {
//     message:string,
//     id:number,
//     likesCount:number
// }
// export type DialoguesDataType={
//     dialoguesData: Array<{ name: string, id: number }>
// }
// export type MessageDataType ={
//     messageData: Array<{ message:string, id: number }>
//
// }
//
// export type PropsType={
//     postData?: Array<{ message:string,id:number, likesCount:number }>
//     dialoguesData?: Array<{ name: string, id: number }>
//     messageData?: Array<{ message:string, id: number }>
//
// }
// const postData = [
//     {message: 'hi', id:1, likesCount:2},
//     {message: 'nice', id:2, likesCount:3},
//     {message: "its's okey", id:3, likesCount:1},
//     {message: 'sdddvsdww', id:4, likesCount:45}
// ]
//
// let dialoguesData = [
//     {name: 'Nastya', id:1},
//     {name: 'Katya', id:2},
//     {name: 'Sveta', id:3},
//     {name: 'Olya', id:4},
//     {name: 'Masha', id:5}
// ]
// let messageData = [
//     {message: 'hi', id:1},
//     {message: 'hello', id:2},
//     {message: 'good', id:3}
// ]
ReactDOM.render(
    // <App />
    <App />,
  document.getElementById('root')
);