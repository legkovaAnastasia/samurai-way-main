import React from 'react';
import s from "./ProfileInfo.module.css";
import preloader from '../../../../assets/preloader.svg'
import {ProfileStatus} from "./ProfileStatus";
import {MapDispatchToPropsType, MapStateToPropsType} from "../../ProfileContainer";

export const ProfileInfo = (props: MapStateToPropsType&MapDispatchToPropsType) => {
     if(!props.profile){
           return <img src={preloader}/>
     }
    return (
        <div>
            <div>
                <img className={s.img} src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.small}/>ava + description</div>
            {props.profile.fullName}
            <ProfileStatus status={props.status} updateUserStatusTC={props.updateUserStatusTC}/>
        </div>
    );
};

export default ProfileInfo;