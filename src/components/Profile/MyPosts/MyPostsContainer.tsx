import {ActionProfileType, addPostAC} from "../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {StorePropsType} from "../../redux/redux-store";

const mapStateToProps = (state: StorePropsType) => {
    return{
        postData:state.profilePage.postData
    }
}
const mapDispatchToProps = (dispatch: (action: ActionProfileType) => void) => {
    return {

        addPost: (newPostText:string)=>{
          dispatch(addPostAC(newPostText))
        }
    }
}
export const MyPostsContainer= connect(mapStateToProps, mapDispatchToProps) (MyPosts)