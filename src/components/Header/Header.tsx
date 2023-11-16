import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {AuthType, logoutTC} from "../redux/authReducer";
import {useAppDispatch, useAppSelector} from "../redux/redux-store";

export const Header = (props: AuthType) => {

    let dispatch = useAppDispatch()
    let state = useAppSelector(state => state.auth)

    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    return <>
        <header className={s.header}>
            <img
                src="https://w7.pngwing.com/pngs/973/11/png-transparent-phoenix-logo-design-mark-phoenix-fire-thumbnail.png"/>
            <div className={s.loginBlock}>
                {props.isAuth ?
                    <div> {props.login} <button onClick={logoutHandler}>Logout</button> </div>:
                    <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    </>
}