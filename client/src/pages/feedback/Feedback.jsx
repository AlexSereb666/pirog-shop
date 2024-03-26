import React, { useState, useEffect } from "react";
import './Feedback.css';
import CustomDropdown from '../../components/customDropdown2/CustomDropdown';
import Button from "../../components/button/Button";
import { feedbackCreate } from '../../http/feedbackAPI'
import { jwtDecode } from 'jwt-decode';
import MessageBox from '../../components/messageBox/MessageBox';

const Feedback = () => {
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [user, setUser] = useState({})

    const [showMessageBox, setShowMessageBox] = useState(false);
    const [messageBoxMessage, setMessageBoxMessage] = useState("");

    const listTitle = [
        {id: 1, name: "Обслуживание"},
        {id: 2, name: "Технические ошибки"},
        {id: 3, name: "Продукты"},
        {id: 4, name: "Предложения и пожелания"},
        {id: 5, name: "Другое"},
    ]

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
        }
    }, []);

    const handleSelectTitle = (value) => {
        setTitle(value)
    }

    const addFeedback = () => {
        if (!message) {
            setMessageBoxMessage("Введите сообщение!")
            setShowMessageBox(true)
            return
        }
        feedbackCreate(user.id, title, message).then((item) => console.log(item))
        setMessage("")

        setMessageBoxMessage("Спасибо за обращение!\nМы ответим в близжайшее время")
        setShowMessageBox(true)
    }

    const handleCloseMessageBox = () => {
        setShowMessageBox(false);
    }

    return (
        <div className="feedback">
            <div className="shadow-container">
                <div className="feedback-title">
                    <CustomDropdown
                        options={listTitle }
                        onSelect={(value) => handleSelectTitle(value)}
                        text="Статус..."
                        containerStyle={{ width: '100%' }}
                    />
                </div>
                <div className="feedback-message">
                    <textarea
                        placeholder="Ваше сообщение"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                    />
                </div>
                <div className="feedback-button">
                    <Button
                        text="Отправить"
                        onClick={addFeedback}
                    />
                </div>
            </div>
            {showMessageBox && (
                <MessageBox message={messageBoxMessage} onClose={handleCloseMessageBox} />
            )}
        </div>
    )
}

export default Feedback;
