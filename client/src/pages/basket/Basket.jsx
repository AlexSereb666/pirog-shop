import React, { useEffect, useState } from 'react';
import './Basket.css'
import { observer } from 'mobx-react-lite'
import { jwtDecode } from 'jwt-decode'
import { getBasket, removeFromBasket } from '../../http/basketAPI'
import { addToOrder } from '../../http/orderAPI';
import Button from '../../components/button/Button'
import { fetchOneProduct } from '../../http/productAPI'
import StarImg from '../../assets/star.png'
import CustomCheckbox from '../../components/customCheckbox/CustomCheckbox';
import MessageBox from '../../components/messageBox/MessageBox';

const Basket = observer(() => {
    const [basketProducts, setBasketProducts] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])

    const [showModalMessageBox, setShowModalMessageBox] = useState(false);
    const [messageBoxMessage, setMessageBoxMessage] = useState("")

    const [priceOrder, setPriceOrder] = useState(0)

    const handleOpeneModalMessageBox = () => {
        setShowModalMessageBox(true)
    }

    const handleCloseModalMessageBox = () => {
        setShowModalMessageBox(false)
    }

    const fetchData = async () => {
        const { id } = jwtDecode(localStorage.getItem('token'));
        const data = await getBasket(id);
        const products = await Promise.all(data.basket_products.map(item => fetchOneProduct(item.productId)));
        setBasketProducts(products);
        setSelectedProducts([])
        products.map((data, index) => setSelectedProducts((prevSelected) => [...prevSelected, data]))
    }

    useEffect(() => {
        let price = 0
        selectedProducts.map(item => price += Number(item.price))
        setPriceOrder(price)
    }, [selectedProducts])

    useEffect(() => {
        fetchData();
    }, []);

    const handleCheckboxChange = (productId, isChecked) => {
        if (isChecked) {
            setSelectedProducts((prevSelected) => [...prevSelected, productId]);
        } else {
            setSelectedProducts((prevSelected) => {
                const indexToRemove = prevSelected.indexOf(productId);
                if (indexToRemove !== -1) {
                    const newSelected = [...prevSelected];
                    newSelected.splice(indexToRemove, 1);
                    return newSelected;
                }
                return prevSelected;
            });
        }
    };

    const clearSelectedProduct = async () => {
        const { id } = jwtDecode(localStorage.getItem('token'));
        const data = await getBasket(id);
        const basket_products = await Promise.all(data.basket_products.map(item => item));
        
        basket_products.forEach(product => {
            const selectedProduct = selectedProducts.find(selected => selected.id === product.productId);
            if (selectedProduct) {
                removeFromBasket(id, product.id).then((item) => console.log(item))
                selectedProducts.splice(selectedProduct, 1);
            }
        });

        // Обновляем состояние basketProducts после удаления продуктов
        setBasketProducts(prevProducts => prevProducts.filter(product => !selectedProducts.includes(product)));

        // Очищаем выбранные продукты
        setSelectedProducts([]);

        window.location.reload();
    }

    const deleteProductsBasket = async () => {
        if (selectedProducts.length > 0) {
            clearSelectedProduct()
            return
        }
        setMessageBoxMessage("Выберите продукт")
        handleOpeneModalMessageBox()
    }

    const addOrder = async () => {
        if (selectedProducts.length > 0) {
            const { id } = jwtDecode(localStorage.getItem('token'));
            selectedProducts.forEach(item => {
                addToOrder(id, item.id, "В ожидании")
            })

            setMessageBoxMessage("Заказ успешно оформлен")
            handleOpeneModalMessageBox()
            clearSelectedProduct()
            return
        }
        setMessageBoxMessage("Выберите продукт")
        handleOpeneModalMessageBox()
    }

    return (
        <div className='basket-container'>
            <div className='basket-container__products'>
                {basketProducts.map((data, index) => (
                    <div key={index} className='basket-container__line'>
                        <div className='basket-container__line__img'>
                            <img src={process.env.REACT_APP_API_URL + data.img} alt="Нет изображения"/>
                        </div>
                        <div className='basket-container__line__name'>
                            {data.name}
                        </div>
                        <div className='basket-container__line__rating'>
                            {data.rating}
                        </div>
                        <div className='basket-container__line__star'>
                            <img src={StarImg} alt="Нет изображения"/>
                        </div>
                        <div className='basket-container__line__price'>
                            {data.price}₽
                        </div>
                        <div className='basket-container__line__checkbox'>
                            <CustomCheckbox productId={data} onChange={handleCheckboxChange} />
                        </div>
                    </div>
                ))}
            </div>
            <div className='basket-container__price'>
                    Итоговая стоимость:{priceOrder}₽
            </div>
            <div className='basket-container__menu'>
                <Button 
                    text="Удалить выбранные" 
                    onClick={deleteProductsBasket}
                />
                <Button 
                    text="Оформить заказ"
                    onClick={addOrder}
                />
            </div>
            {showModalMessageBox && (
                <MessageBox
                    onClose={handleCloseModalMessageBox} 
                    message={messageBoxMessage}
                />
            )}
        </div>
    );
})

export default Basket;
