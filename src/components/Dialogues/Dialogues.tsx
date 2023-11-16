import s from './Dialogues.module.css'
import {DialogueItem} from "./DialogueItem/DialogueItem";
import {Message} from "./Message/Message";

import React, {ChangeEvent} from "react";
import {MapDispatchToPropsType, MapStateToPropsType} from "./DialoguesContainer";
import {useFormik} from "formik";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const Dialogues = (props: MapStateToPropsType & MapDispatchToPropsType) => {
    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values.message));
            props.sendMessage(values.message)
        },
    })
    return (
        <div className={s.dialogues}>
            <div className={s.dialogueItems}>
                {props.dialoguesData.map(el => {
                    return <DialogueItem name={el.name} id={el.id}/>
                })}
            </div>
            <div className={s.messages}>
                {props.messageData.map(el => {
                    return <Message text={el.message} id={el.id}/>
                })}
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField label="message"
                                   margin="normal"
                                   placeholder="Enter your message"
                                   {...formik.getFieldProps('message')}
                        />
                    </FormGroup>
                    <Button type={'submit'} variant={'contained'} color={'primary'} >
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}