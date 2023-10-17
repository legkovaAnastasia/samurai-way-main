import {Navigate} from "react-router-dom";
import React, {ComponentType, useEffect} from "react";
import {connect, useDispatch} from "react-redux";
import {StorePropsType} from "../redux/redux-store";
import {getAuthUserDataTC} from "../redux/authReducer";

type MapStateToPropsType = {
    isAuth: boolean
}
const mapStateToProps = (state: StorePropsType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}
export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: MapStateToPropsType) => {
        let {isAuth, ...restProps} = props
        console.log(props.isAuth)

        if (!isAuth) return <Navigate to={'/login'}/>
        return <Component  {...restProps as T} />

    }

    return  connect(mapStateToProps)(RedirectComponent)
}
