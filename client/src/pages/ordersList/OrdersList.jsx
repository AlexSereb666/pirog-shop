import React, {useState, useEffect} from "react";
import './OrdersList.css'
import Button from '../../components/button/Button';
import {getOrdersByUserId} from '../../http/orderAPI'
import { jwtDecode } from 'jwt-decode';

const OrdersList = () => {
    const [sortDate, setSortDate] = useState("📆")

    const [listOrder, setListOrder] = useState([])

    const [user, setUser] = useState(jwtDecode(localStorage.getItem('token')))

    useEffect(() => {
        getOrdersByUserId(user.id).then((item) => setListOrder(item))
    }, []);

    const sortedDate = () => {
        if (sortDate === "📆") {
            setSortDate("📆 ⬆")
            listOrder.sort((a, b) => new Date(a.date) - new Date(b.date))
        } else if (sortDate === "📆 ⬆") {
            setSortDate("📆 ⬇")
            listOrder.sort((a, b) => new Date(b.date) - new Date(a.date))
        } else if (sortDate === "📆 ⬇") {
            setSortDate("📆 ⬆")
            listOrder.sort((a, b) => new Date(a.date) - new Date(b.date))
        }
    }

    const parseDate = (date) => {
        const originalDate = new Date(date);
        const formattedDate = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1)
            .toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours()
                .toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}`;
        
        return formattedDate;
    }

    return (
        <div className="orders-list">
            <div className="shadow-container">
                <div className="Feedback-list-top">
                    <div className="Feedback-list-top-sort">
                        <Button
                            text={sortDate}
                            onClick={sortedDate}
                        />
                    </div>
                </div>
                <div className="orders-list-list">
                    {listOrder.length > 0 ? (
                        listOrder.map((item) => (
                            <div className="orders-list-item" key={item.id}>
                                <div className="orders-list-item-img">
                                    <img src={process.env.REACT_APP_API_URL + item.product.img} alt="ыыы" />
                                </div>
                                <div className="orders-list-item-name">
                                    {item.product.name}
                                </div>
                                <div className="orders-list-item-date">
                                    {parseDate(item.date)}
                                </div>
                                <div className="orders-list-item-price">
                                    {item.product.price}₽
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="edit-product-menu-list-not-found">
                            Заказов не было!
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OrdersList;
