import React, {useState, useEffect} from "react";
import './FeedbackList.css'
import Button from "../../components/button/Button";
import { getAll, updateStatus, deleteById } from "../../http/feedbackAPI";
import CustomDropdown from "../../components/customDropdown/CustomDropdown";
import deleteImg from '../../assets/delete.png'
import MessageBox from '../../components/messageBox/MessageBox';

const FeedbackList = () => {

    const [sortDate, setSortDate] = useState("📆")

    const [listFeedback, setListFeedback] = useState([])

    const [showMessageBox, setShowMessageBox] = useState(false);
    const [messageBoxMessage, setMessageBoxMessage] = useState("");

    const initList = async () => {
        getAll().then((item) => setListFeedback(item))
    }

    useEffect(() => {
        initList()
    }, [])

    const sortedDate = () => {
        if (sortDate === "📆") {
            setSortDate("📆 ⬆")
            listFeedback.sort((a, b) => new Date(a.date) - new Date(b.date))
        } else if (sortDate === "📆 ⬆") {
            setSortDate("📆 ⬇")
            listFeedback.sort((a, b) => new Date(b.date) - new Date(a.date))
        } else if (sortDate === "📆 ⬇") {
            setSortDate("📆 ⬆")
            listFeedback.sort((a, b) => new Date(a.date) - new Date(b.date))
        }
    }

    const parseDate = (date) => {
        const originalDate = new Date(date);
        const formattedDate = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1)
            .toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours()
                .toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}`;
        
        return formattedDate;
    }

    const deleteFeedback = (id) => {
        // Удаляем объект из списка по его id
        const updatedList = listFeedback.filter(item => item.id !== id);
        // Обновляем состояние listFeedback
        setListFeedback(updatedList);
        // Затем выполните удаление в базе данных или другом месте
        deleteById(id).then((item) => console.log(item))
    }

    const handleCloseMessageBox = () => {
        setShowMessageBox(false);
    }

    const openMessage = (message) => {
        setMessageBoxMessage(message)
        setShowMessageBox(true);
    }

    return (
        <div className="Feedback-list">
            <div className="shadow-container">
                <div className="Feedback-list-top">
                    <div className="Feedback-list-top-sort">
                        <Button
                            text={sortDate}
                            onClick={sortedDate}
                        />
                    </div>
                </div>
                <div className="Feedback-list-list">
                    {listFeedback.length > 0 ? (
                        listFeedback.map((item) => (
                            <div className="Feedback-list-item" key={item.id} onClick={() => openMessage(item.message)}>
                                <div className="Feedback-list-item-name">
                                    {item.user.login}
                                </div>
                                <div className="Feedback-list-item-title">
                                    {item.title}
                                </div>
                                <div className="Feedback-list-item-date">
                                    {parseDate(item.date)}
                                </div>
                                <div className="Feedback-list-item-delete" onClick={(e) => e.stopPropagation()}>
                                    <img src={deleteImg} alt="Куда-то делась рейтинговая звезда:(" onClick={() => deleteFeedback(item.id)}/>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="edit-product-menu-list-not-found">
                            Жалоб нет!
                        </div>
                    )}
                </div>
            </div>
            {showMessageBox && (
                <MessageBox message={messageBoxMessage} onClose={handleCloseMessageBox} />
            )}
        </div>
    )
}

export default FeedbackList;
