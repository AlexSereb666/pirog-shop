import * as React from "react";
import { Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from './routes';
import { observer } from "mobx-react-lite";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";

const AppRouter = observer(() => {
    return (
        <Routes>
            {!!localStorage.getItem('token') && authRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={<route.Component />} />
            ))}
            {publicRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={<route.Component />} />
            ))}
            <Route path="/" element={!!localStorage.getItem('token') ? <Profile/> : <Login/>} />
        </Routes>
    );
})

export default AppRouter;
