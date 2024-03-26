import React, { useContext, useState } from "react";
import './Login.css';
import { useNavigate } from 'react-router-dom'
import InputAuth from '../../components/input-auth/InputAuth';
import Button from "../../components/button/Button";
import MessageBox from '../../components/messageBox/MessageBox';
import { REGISTRATION_ROUTE } from '../../pathRouter'
import { loginFunc } from '../../http/userAPI'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'

const Login =  observer (() => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const [showMessageBox, setShowMessageBox] = useState(false);
    const [messageBoxMessage, setMessageBoxMessage] = useState("");

    const navigate = useNavigate()
    const { user } = useContext(Context)

    const inAuth = async () => {
        try {
            const data = await loginFunc(login, password)

            user.setUser(data)
            user.setIsAuth(true)

            setLogin('')
            setPassword('')

            navigate('/')
            window.location.reload();
        } catch (e) {
            setMessageBoxMessage(`${e.response.data.message}`)
            setShowMessageBox(true)
        }
    }

    const handleCloseMessageBox = () => {
        setShowMessageBox(false);
    }

    return (
        <div className='authorization'>
            <div className='authorization__content'>
                <h3 className='authorization__content__title'>Авторизация</h3>
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
                    type="password" 
                    required={true} 
                    label={'Пароль'}
                    maxLength={45}
                />
                <Button
                    text={'Войти в аккаунт'}
                    onClick={inAuth}
                />
                <div className='authorization__register'>
                    <p>Нет аккаунта?&nbsp;
                        <span onClick={() => navigate(REGISTRATION_ROUTE)}>Зарегистрироваться!</span>
                    </p>
                </div>
                {showMessageBox && (
                    <MessageBox message={messageBoxMessage} onClose={handleCloseMessageBox} />
                )}
            </div>
        </div>
    )
})

export default Login;
