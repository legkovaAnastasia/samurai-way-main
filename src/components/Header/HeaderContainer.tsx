import React, {useEffect} from "react";
import {Header} from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {AuthType, getAuthUserDataTC} from "../redux/authReducer";
import {StorePropsType} from "../redux/redux-store";

export const HeaderContainer = () => {
    let dispatch = useDispatch()
    let state = useSelector<StorePropsType, AuthType>(state => state.auth)
    useEffect(() => {
        dispatch(getAuthUserDataTC())
    }, [])
    return <Header login={state.login} email={state.email} userId={state.userId} isAuth={state.isAuth} />
}