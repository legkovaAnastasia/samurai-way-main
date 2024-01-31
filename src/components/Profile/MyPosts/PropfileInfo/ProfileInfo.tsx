import React, {ChangeEvent} from 'react';
import s from "./ProfileInfo.module.css";
import preloader from '../../../../assets/preloader.svg'
import {ProfileStatus} from "./ProfileStatus";
import {MapDispatchToPropsType, MapStateToPropsType} from "../../ProfileContainer";
import {useAppDispatch, useAppSelector} from "../../../redux/redux-store";
import {ProfileDataForm} from "./PropfileDataForm";
import Button from "@mui/material/Button";
import {Input} from "@mui/material";
import {setEditModeAC} from "../../../redux/profileReducer";

export const ProfileInfo = (props: MapStateToPropsType & MapDispatchToPropsType) => {
    const dispatch = useAppDispatch()
    const editMode = useAppSelector(state => state.profilePage.editMode)
    if (!props.profile) {
        return <img alt={'preloader'} src={preloader}/>
    }

    const onMainPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhotoTC(e.target.files[0])
        }
    }

    const changeEditMode = () => {
        dispatch(setEditModeAC(!editMode))
    }

    return (
        <div>
            <div>
                <img alt={'background'} className={s.img}
                     src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                <img className={s.photo} alt={'user'} src={props.profile.photos.small ? props.profile.photos.small
                    : 'https://img.freepik.com/premium-vector/face-cute-girl-avatar-young-girl-portrait-vector-flat-illustration_192760-82.jpg?w=2000'}/>
            </div>
            {props.isOwner && <Input type={'file'}
                                     onChange={onMainPhotoChange}/>}
            <div>{props.profile.fullName}</div>

            <ProfileStatus {...props} status={props.status} updateUserStatusTC={props.updateUserStatusTC}/>

            {editMode ? <ProfileDataForm/> :
                <ProfileData isOwner={props.isOwner} changeEditModeHandler={changeEditMode}/>}

        </div>
    );
};

type PropsType = {
    changeEditModeHandler: () => void
    isOwner: boolean
}
const ProfileData = (props: PropsType) => {
    const contacts = useAppSelector(state => state.profilePage.profile.contacts)
    const profile = useAppSelector(state => state.profilePage.profile)

    return <div>
        <div style={{fontWeight: 'bold'}}>Looking For A Job: {profile.lookingForAJob ? 'yes' : 'no'}</div>
        <div style={{fontWeight: 'bold'}}>Looking For A Job
            Description: {profile.lookingForAJobDescription ? `${profile.lookingForAJobDescription}` : '-'}</div>
        <div><b>Contacts:</b></div>
        {Object.entries(contacts).map(([key, value]) => {
            return <Contacts key={key} contactTitle={key} contactValue={value}/>
        })}
        {props.isOwner && <div>
            <Button variant={'contained'} color={'primary'} onClick={props.changeEditModeHandler}>Edit</Button>
        </div>}
    </div>
}
type ContactPropsType = {
    contactTitle: string
    contactValue: string
}
export const Contacts = (props: ContactPropsType) => {
    return <div>
        <div><b>{props.contactTitle}</b>: <b>{props.contactValue}</b></div>
    </div>
}

export default ProfileInfo;