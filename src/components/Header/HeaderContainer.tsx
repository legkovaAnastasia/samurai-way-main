import React, {useEffect} from "react";
import {Header} from "./Header";
import {getAuthUserDataTC, logoutTC} from "../redux/authReducer";
import {useAppDispatch, useAppSelector} from "../redux/redux-store";

export const HeaderContainer = () => {
    let dispatch = useAppDispatch()

    let state = useAppSelector(state => state.auth)
    useEffect(() => {
        dispatch(getAuthUserDataTC())
    }, [state.isAuth])
    return <Header login={state.login} email={state.email} userId={state.userId} isAuth={state.isAuth} />
}