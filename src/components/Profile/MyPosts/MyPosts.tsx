import s from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {ProfilePageType} from "../../redux/state";
import React from "react";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import Button from "@mui/material/Button";


type PropsType = ProfilePageType&{
    addPost: (newPostText:string)=>void
}

export const MyPosts = (props: PropsType) => {

    const formik = useFormik({
        initialValues: {
            post: ''
        },
        onSubmit: values => {
            props.addPost(values.post)
            formik.resetForm()
        }
    })
    let postsElements = props.postData.map(el =>
        <Post message={el.message} like={el.likesCount} id={el.id}/>)

    return <div className={s.content}>
        <div className={s.postsBlock}>
            <h3>my posts</h3>
            <form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <TextField label="post"
                               margin="normal"
                               placeholder="Enter new post"
                               {...formik.getFieldProps("post")}/>
                </FormGroup>
                <Button type={'submit'} variant={'contained'} color={'primary'} >
                    Post
                </Button>
            </form>
            <div>new posts
                <div className={s.posts}>
                    {postsElements}
                </div>
            </div>
        </div>
    </div>
}