import React from 'react';
import s from "./ProfileInfo.module.css";
import {ProfilePageType} from "../../../redux/state";
import preloader from '../../../../assets/preloader.svg'


 export const ProfileInfo = (props: ProfilePageType) => {
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
        </div>
    );
};

export default ProfileInfo;