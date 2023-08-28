import {Post} from "./Post/Post";
import state, {ProfilePageType, sendMessageAC, updateNewMessageBodyAC} from "../../redux/state";
import {ActionProfileType, addPostAC, changeNewTextAC} from "../../redux/profileReducer";
import React from "react";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {StorePropsType} from "../../redux/redux-store";


// type PropsType = ProfilePageType
//     & { dispatch: (action:ActionProfileType) => void }
//
// export const MyPostsContainer1 = (props: PropsType) => {
//     // const addPost = () => {
//     //     props.dispatch(addPostAC(props.newPostText))
//     // }
//     // const onPostChange=(text:string)=>{
//     //     let action = changeNewTextAC(text)
//     //     props.dispatch(action)
//     // }
//     return <StoreContext.Consumer>{
//         (store)=> {
//             const addPost = () => {
//                 props.dispatch(addPostAC(props.newPostText))
//             }
//             const onPostChange=(text:string)=>{
//                 let action = changeNewTextAC(text)
//                 props.dispatch(action)
//             }
//            return <MyPosts updateNewPostText={onPostChange}
//                      addPost={addPost}
//                      newPostText={store.getState().newPostText}
//                      postData={store.getState().postData}/>
//         }
//     }
//     </StoreContext.Consumer>
// }
const mapStateToProps = (state: StorePropsType) => {
    return{
        newPostText: state.profilePage.newPostText,
        postData:state.profilePage.postData
    }
}
const mapDispatchToProps = (dispatch: (action: ActionProfileType) => void) => {
    return {
        updateNewPostText: (text:string)=>{
            dispatch(changeNewTextAC(text))
        },
        addPost: ()=>{
          dispatch(addPostAC(state._state.profilePage.newPostText))
        }
    }
}
export const MyPostsContainer= connect(mapStateToProps, mapDispatchToProps) (MyPosts)