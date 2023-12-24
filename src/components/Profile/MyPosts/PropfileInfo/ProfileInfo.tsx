import React, {ChangeEvent} from 'react';
import s from "./ProfileInfo.module.css";
import preloader from '../../../../assets/preloader.svg'
import {ProfileStatus} from "./ProfileStatus";
import {ContactsType, MapDispatchToPropsType, MapStateToPropsType} from "../../ProfileContainer";

export const ProfileInfo = (props: MapStateToPropsType & MapDispatchToPropsType) => {
    if (!props.profile) {
        return <img alt={'preloader'} src={preloader}/>
    }

    const onMainPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhotoTC(e.target.files[0])
        }
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
            {props.isOwner && <input type={'file'}
                                     onChange={onMainPhotoChange}/>}

            {props.profile.fullName}
            <ProfileStatus {...props} status={props.status} updateUserStatusTC={props.updateUserStatusTC}/>
            <div>
                <b>Contacts:</b> {Object.entries(props.profile.contacts).map(([key, value] )=> {
                    return <Contacts key={key} contactTitle={key} contactValue={value}/>
            })}
            </div>
        </div>
    );
};

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}
export const Contacts = (props: ContactPropsType) => {
    return <div><b>{props.contactTitle}</b>: <b>{props.contactValue}</b></div>
}

export default ProfileInfo;