import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import "./App.scss";
import { MainPage } from './ui/main/MainPage';
import { TestView } from './ui/main/sublayouts/TestView';
import { LoginPage } from './ui/etc/LoginPage';

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
            <Route path="/main" element={<TestView/>}/>
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
