import {Navigate} from "react-router-dom";
import React, {ComponentType} from "react";
import {connect} from "react-redux";
import {StorePropsType} from "../redux/redux-store";


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

        if (!isAuth) return <Navigate to={'/login'}/>

        return <Component  {...restProps as T} />
    }

    let ConnectRedirectComponent = connect(mapStateToProps)(RedirectComponent)
    return ConnectRedirectComponent
}