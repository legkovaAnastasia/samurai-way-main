import './App.css';
import {Header} from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";
import {Dialogues} from "./components/Dialogues/Dialogues";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import state from "./components/redux/state";

// type PropsType =StateType
const App = () => {


    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar/>

                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/profile/" element={<Profile profilePage={state.profilePage} />}/>
                        <Route path="/dialogues/*" element={<Dialogues dialoguesPage={state.dialoguesPage}/>}/>
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
