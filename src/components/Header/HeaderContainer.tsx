import React, {useEffect} from "react";
import {Header} from "./Header";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {AuthType, setAuthUserDataAC} from "../redux/authReducer";
import {StorePropsType} from "../redux/redux-store";
import {UsersAPI} from "../../api/api";

export const HeaderContainer = () => {
    let dispatch = useDispatch()
    let state = useSelector<StorePropsType, AuthType>(state => state.auth)
    useEffect(() => {
        UsersAPI.getAuth()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserDataAC(response.data.data.id, response.data.data.email, response.data.data.login))
                }
            })
    }, [])
    return <Header login={state.login} email={state.email} userId={state.userId} isAuth={state.isAuth}/>
}