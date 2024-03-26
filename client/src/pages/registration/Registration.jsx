import React, { useState } from "react";
import './Registration.css';
import { useNavigate } from 'react-router-dom'
import InputAuth from "../../components/input-auth/InputAuth";
import Button from "../../components/button/Button";
import MessageBox from '../../components/messageBox/MessageBox';
import { LOGIN_ROUTE } from "../../pathRouter";
import { userRegistration } from "../../http/userAPI";

const Registration = () => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    const [showMessageBox, setShowMessageBox] = useState(false);
    const [messageBoxMessage, setMessageBoxMessage] = useState("");

    const navigate = useNavigate()

    const registrationUser = async () => {
        if (login && password) {
            const response = await userRegistration(login, password, email, phone, 'USER', "")

            if (typeof response === 'number') {
                setMessageBoxMessage('Ошибка! Пользователь с такими данными уже существует!')
                setShowMessageBox(true)
            } else { // ошибок нет, все норм  
                setMessageBoxMessage('Аккаунт успешно зарегистрирован!')
                setShowMessageBox(true)
    
                setLogin("")
                setPhone("")
                setEmail("")
                setPassword("")
            }
        } else {
            setMessageBoxMessage('Ошибка! Некорректное заполнение полей!');
            setShowMessageBox(true);
        }
    }

    const handleCloseMessageBox = () => {
        setShowMessageBox(false);
    }

    return (
        <div className='registration'>
            <div className='registration__content'>
                <h3 className='registration__title'>Регистрация</h3>
                <InputAuth 
                    value={login} 
                    setValue={setLogin} 
                    type="text" 
                    required={true} 
                    label={'Логин'}
                    maxLength={45}
                />
                <InputAuth
                    value={password} 
                    setValue={setPassword} 
                    type="text" 
                    required={true} 
                    label={'Пароль'}
                    maxLength={30}
                />
                <InputAuth 
                    value={phone} 
                    setValue={setPhone} 
                    type="text" 
                    required={true} 
                    label={'Телефон'}
                    maxLength={45}
                    mask="+7 (999) 999-99-99"
                />
                <InputAuth 
                    value={email} 
                    setValue={setEmail} 
                    type="text" 
                    required={true} 
                    label={'Емаил'}
                    maxLength={45}
                    mask={/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/}
                />
                <Button
                    text={'Зарегистрироваться'}
                    onClick={registrationUser}
                />
                <div className='registration__register'>
                    <p>Уже есть аккаунт?&nbsp;
                        <span onClick={() => navigate(LOGIN_ROUTE)}>Авторизоваться!</span>
                    </p>
                </div>
                {showMessageBox && (
                    <MessageBox message={messageBoxMessage} onClose={handleCloseMessageBox} />
                )}
            </div>
        </div>
    )
}

export default Registration;
