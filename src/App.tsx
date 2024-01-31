import './App.css';
import {NavBar} from "./components/NavBar/NavBar";
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom";
import React, {Suspense, useEffect} from "react";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";
import {useAppDispatch, useAppSelector} from "./components/redux/redux-store";
import {CircularProgress} from "@mui/material";
import {getAuthUserDataTC} from "./components/redux/authReducer";
import preloader from "./assets/preloader.svg";

const DialoguesContainer: React.FC = React.lazy(() => import('./components/Dialogues/DialoguesContainer')
    .then(({DialoguesContainer}) => (
        {default: DialoguesContainer}))
)
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer')
    .then(({UsersContainer}) => (
        {default: UsersContainer}))
)

const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector((state) => state.app.initialized)
    const isAuth = useAppSelector((state) => state.auth.isAuth)
    const userId = useAppSelector(state => state.auth.userId)
    useEffect(() => {
        dispatch(getAuthUserDataTC())
    }, [isAuth, userId])

    if (!isInitialized) {

        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavBar/>

                <div className='app-wrapper-content'>
                    <Suspense fallback={<img alt={'preloader'} src={preloader}/>}>
                        <Routes>
                            <Route path="/*" element={<DialoguesContainer/>}/>
                            <Route path="/profile/:id?" element={<ProfileContainer/>}/>
                            <Route path="/dialogues/" element={<DialoguesContainer/>}/>
                            <Route path="/users/" element={<UsersContainer/>}/>
                            <Route path="/login/" element={<Login/>}/>

                            <Route path="/news" element={<HeaderContainer/>}/>
                            <Route path="/music" element={<HeaderContainer/>}/>
                            <Route path="/settings" element={<NavBar/>}/>
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
