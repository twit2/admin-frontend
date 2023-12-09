import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import "./App.scss";
import { MainPage } from './ui/main/MainPage';
import { UsersView } from './ui/main/sublayouts/UsersView';
import { LoginPage } from './ui/etc/LoginPage';
import "@twit2/std-library-fe/dist/global.css";
import { APIConfiguration } from '@twit2/std-library-fe';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<LoginPage/>} />
          </Route>
          <Route element={<MainPage />} >
            <Route path="/main" element={<UsersView/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

root.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
);

// Update API url
const host = window.location.host.substring(window.location.host.indexOf('.') + 1);
APIConfiguration.apiGwUrl = `${window.location.protocol}//api.${host}/api/v1`;
APIConfiguration.apiCdnUrl = `${window.location.protocol}//cdn.${host}`;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
