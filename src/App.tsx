import './App.css';
import {Header} from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";
import {Dialogues} from "./components/Dialogues/Dialogues";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import {StoreType} from "./components/redux/state";
type PropsType={
    store:StoreType
}
const App: React.FC<PropsType> = (props) => {
    const state=props.store.getState()
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar/>

                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/profile/" element={<Profile postData={state.profilePage.postData} dispatch={props.store.dispatch.bind(props.store)} newPostText={state.profilePage.newPostText} />}/>
                        <Route path="/dialogues/*" element={<Dialogues dialoguesData={state.dialoguesPage.dialoguesData} dispatch={props.store.dispatch.bind(props.store)} messageData={state.dialoguesPage.messageData} newMessageBody={state.dialoguesPage.newMessageBody}/>}/>
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
