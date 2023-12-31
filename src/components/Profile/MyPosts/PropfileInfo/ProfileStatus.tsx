import React, {ChangeEvent, useEffect, useState} from 'react';
import {MapDispatchToPropsType, MapStateToPropsType} from "../../ProfileContainer";

export const ProfileStatus = (props: MapStateToPropsType & MapDispatchToPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatusTC(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            {!editMode &&
                <div> <div style={{fontWeight:'bold'}}>Status </div>
                    <span onDoubleClick={activateEditMode}>
                        {props.status || '-----'}
                    </span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
                </div>}
        </div>
    )
}
