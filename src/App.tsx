import './App.css';
import {Header} from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import {DialoguesContainer} from "./components/Dialogues/DialoguesContainer";
import {UsersContainer} from "./components/Users/UsersContainer";


const App = () => {
    // const state = store.getState()
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar/>

                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/profile/" element={<Profile/>}/>
                        <Route path="/dialogues/*" element={<DialoguesContainer/>}/>
                        <Route path="/users/*" element={<UsersContainer/>}/>

                        <Route path="/news" element={<Header/>}/>
                        <Route path="/music" element={<Header/>}/>
                        <Route path="/settings" element={<NavBar/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
