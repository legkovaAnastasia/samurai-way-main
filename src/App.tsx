import './App.css';
import {Header} from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import {DialoguesContainer} from "./components/Dialogues/DialoguesContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";


const App = () => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <HeaderContainer/>
                <NavBar/>

                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/profile" element={<ProfileContainer/>}/>
                        <Route path="/profile/:userId" element={<ProfileContainer/>}/>
                        <Route path="/dialogues/" element={<DialoguesContainer/>}/>
                        <Route path="/users/" element={<UsersContainer/>}/>

                        <Route path="/news" element={<HeaderContainer/>}/>
                        <Route path="/music" element={<HeaderContainer/>}/>
                        <Route path="/settings" element={<NavBar/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
