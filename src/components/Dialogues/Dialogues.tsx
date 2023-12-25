import s from './Dialogues.module.css'
import {DialogueItem} from "./DialogueItem/DialogueItem";
import {Message} from "./Message/Message";
import React from "react";
import {MapDispatchToPropsType, MapStateToPropsType} from "./DialoguesContainer";
import {useFormik} from "formik";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


type FormikErrorType = {
    message?: string
}
export const Dialogues = (props: MapStateToPropsType & MapDispatchToPropsType) => {
    const formik = useFormik({
        initialValues: {
            message: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.message.trim()) {
                errors.message = 'Type something before sending'
            }
            return errors
        },
        onSubmit: values => {
            props.sendMessage(values.message)
        },
    })
    return (
        <div className={s.dialogues}>
            <div className={s.dialogueItems}>
                {props.dialoguesData.map(el => {
                    return <DialogueItem key={el.id} name={el.name} id={el.id}/>
                })}
            </div>
            <div className={s.messages}>
                {props.messageData.map(el => {
                    return <Message key={el.id}text={el.message} id={el.id}/>
                })}
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField label="message"
                                   margin="normal"
                                   placeholder="Enter your message"
                                   {...formik.getFieldProps('message')}
                        />
                        {formik.errors.message && formik.touched.message && <div style={{color: 'red'}}>{formik.errors.message}</div>}
                    </FormGroup>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}