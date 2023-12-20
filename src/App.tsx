import './App.css';
import {NavBar} from "./components/NavBar/NavBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, {Suspense, useEffect} from "react";
// import {DialoguesContainer} from "./components/Dialogues/DialoguesContainer";
// import {UsersContainer} from "./components/Users/UsersContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";
// import ProfileContainer from "./components/Profile/ProfileContainer";
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
    }, [])
    if (!isInitialized) {

        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    // if (!!isLoggedIn){
    //     console.log(isLoggedIn)
    //     return <NavLink to={'/profile/'+userId}/>
    // }
    // function withRouter(Component:any) {
    //     function ComponentWithRouterProp(props:any) {
    //         let location = useLocation();
    //         let navigate = useNavigate();
    //         let params = useParams();
    //         return (
    //             <Component {...props} router={{ location, navigate, params }} />
    //         );
    //     }
    //     return ComponentWithRouterProp;
    // }

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavBar/>

                <div className='app-wrapper-content'>
                    <Suspense fallback={<img alt={'preloader'} src={preloader}/>}>
                        <Routes>
                            <Route path="/*" element={<ProfileContainer/>}/>
                            <Route path="/profile/:userId" element={<ProfileContainer/>}/>
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
