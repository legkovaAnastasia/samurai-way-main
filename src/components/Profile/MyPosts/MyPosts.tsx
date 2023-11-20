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
type FormikErrorType = {
    post?: string
}

const areEqual = (prevProps: PropsType, nextProps:PropsType) => {
    // Custom comparison logic based on prevProps and nextProps
    // Return true if props are equal, return false otherwise
    return prevProps.postData === nextProps.postData;
};

export const MyPosts = React.memo((props: PropsType) => {
    console.log('render')
    const formik = useFormik({
        initialValues: {
            post: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.post.trim()) {
                errors.post = 'Type something before sending'
            }
            return errors
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
                    {formik.errors.post && formik.touched.post && <div style={{color: 'red'}}>{formik.errors.post}</div>}
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
}, areEqual)