import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {AuthType} from "../redux/authReducer";
import preloader from '../../assets/preloader.svg'

export const Header = (props: AuthType) => {
    return <>
    <header className={s.header}>
        <img
            src="https://w7.pngwing.com/pngs/973/11/png-transparent-phoenix-logo-design-mark-phoenix-fire-thumbnail.png"/>
        <div className={s.loginBlock}>
            {props.isAuth ?
                props.login :
                <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
    </>
}