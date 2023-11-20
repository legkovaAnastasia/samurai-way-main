import React, {useEffect} from "react";
import {Header} from "./Header";
import {getAuthUserDataTC} from "../redux/authReducer";
import {useAppDispatch, useAppSelector} from "../redux/redux-store";

export const HeaderContainer = () => {
    let dispatch = useAppDispatch()
    let state = useAppSelector(state => state.auth)
    useEffect(() => {
        dispatch(getAuthUserDataTC())
    }, [dispatch])
    return <Header isLoggedIn={state.isLoggedIn} login={state.login} email={state.email} userId={state.userId} isAuth={state.isAuth} error={state.error} />
}