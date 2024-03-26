import React, { useEffect, useState } from "react";
import './Navbar.css';
import Logo from '../../assets/logo.png';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { BASKET, FEEDBACK, MENU, MENU_ADMIN, ORDERS_LIST } from "../../pathRouter";

const Navbar = () => {
    const [user, setUser] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
        }
    }, []);

    const backAccount = () => {
        localStorage.removeItem('token');
        navigate('/')
        window.location.reload();
    }

    return (
        <div className="navbar-container">
            <div className="navbar-container-logo">
                <img src={Logo} alt="Ой, лого убежало:(" />
            </div>
            <div className="navbar-container-choice">
                <div className="navbar-container-choice-menu" onClick={() => navigate(MENU)}>
                    Меню
                </div>
                <div className="navbar-container-choice-basket" onClick={() => navigate(BASKET)}>
                    Корзина
                </div>
                <div className="navbar-container-choice-profile" onClick={() => navigate('/')}>
                    О нас
                </div>
                <div className="navbar-container-choice-history" onClick={() => navigate(ORDERS_LIST)}>
                    История заказов
                </div>
                <div className="navbar-container-choice-feedback" onClick={() => navigate(FEEDBACK)}>
                    Тех.поддержка
                </div>
                {user.role === "ADMIN" && (
                    <div className="navbar-container-choice-admin" onClick={() => navigate(MENU_ADMIN)}>
                        Администратор
                    </div>
                )}
                <div className="navbar-container-choice-back" onClick={backAccount}>
                    Выйти из аккаунта
                </div>
            </div>
        </div>
    )
}

export default Navbar;
