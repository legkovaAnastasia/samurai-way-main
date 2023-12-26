import React from "react";
import {Header} from "./Header";
import {useAppSelector} from "../redux/redux-store";

export const HeaderContainer = () => {
    let state = useAppSelector(state => state.auth)

    return <Header isLoggedIn={state.isLoggedIn} login={state.login} email={state.email} userId={state.userId} isAuth={state.isAuth} error={state.error} />
}