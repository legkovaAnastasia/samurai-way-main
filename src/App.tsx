import './App.css';
import {Header} from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import {DialoguesContainer} from "./components/Dialogues/DialoguesContainer";


const App = () => {
    // const state = store.getState()
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar/>

                <div className='app-wrapper-content'>
                    <Routes>
                        {/*<Route path="/profile/" element={<Profile*/}
                        {/*    postData={state.profilePage.postData}*/}
                        {/*    dispatch={store.dispatch.bind(store)}*/}
                        {/*    newPostText={state.profilePage.newPostText}/>}/>*/}
                        {/*<Route path="/dialogues/*" element={<DialoguesContainer*/}
                        {/*    dialoguesData={state.dialoguesPage.dialoguesData}*/}
                        {/*    dispatch={store.dispatch.bind(store)}*/}
                        {/*    messageData={state.dialoguesPage.messageData}*/}
                        {/*    newMessageBody={state.dialoguesPage.newMessageBody}/>}/>*/}
                        <Route path="/profile/" element={<Profile/>}/>
                        <Route path="/dialogues/*" element={<DialoguesContainer/>}/>

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
