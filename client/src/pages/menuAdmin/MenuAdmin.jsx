import React from "react";
import './MenuAdmin.css';
import Button from "../../components/button/Button";
import { useNavigate } from 'react-router-dom'
import { EDIT_PRODUCT, FEEDBACK_LIST, USER_LIST } from "../../pathRouter";

const MenuAdmin = () => {
    const navigate = useNavigate()

    return (
        <div className="admin-menu-container">
            <div className="admin-menu-container-product">
                <Button
                    text={'Управление продуктами'}
                    onClick={() => navigate(EDIT_PRODUCT)}
                />
            </div>
            <div className="admin-menu-container-user">
                <Button
                    text={'Управление пользователями'}
                    onClick={() => navigate(USER_LIST)}
                />
            </div>
            <div className="admin-menu-container-feedback">
                <Button
                    text={'Просмотр жалоб'}
                    onClick={() => navigate(FEEDBACK_LIST)}
                />
            </div>
        </div>  
    )
}

export default MenuAdmin;
