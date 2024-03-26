import React, { useEffect, useState } from "react";
import './EditProduct.css';
import Button from "../../components/button/Button";
import InputAuth from '../../components/input-auth/InputAuth';
import CreateType from '../../components/createType/CreateType';
import CreateProduct from "../../components/createProduct/CreateProduct";
import { getAll, deleteProduct } from '../../http/productAPI'
import StarImg from '../../assets/star.png'
import deleteImg from '../../assets/delete.png'
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
    const [search, setSearch] = useState("");

    const navigate = useNavigate()

    const [showModalCreateType, setShowModalCreateType] = useState(false);
    const [showModalCreateProduct, setShowModalCreateProduct] = useState(false);

    const [listProduct, setListProduct] = useState([])
    const [sortListProduct, setSortListProduct] = useState([])

    const getProducts = async () => {
        getAll().then((item) => setListProduct(item))
    }

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        setSortListProduct(listProduct)
    }, [listProduct])

    const handleOpeneModalCreateType = () => {
        setShowModalCreateType(true);
    }

    const handleCloseModalCreateType = () => {
        setShowModalCreateType(false);
    }

    const handleOpeneModalCreateProduct = () => {
        setShowModalCreateProduct(true);
    }

    const handleCloseModalCreateProduct = () => {
        setShowModalCreateProduct(false);
        getProducts();
    }

    const deleteProductHandler = async (id) => {
        await deleteProduct(id).then((item) => console.log(item))
        await getProducts()
    }

    useEffect(() => {
        // Фильтрация списка продуктов при изменении значения поиска
        const filteredProducts = listProduct.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
        setSortListProduct(filteredProducts);
    }, [search]);

    return (
        <div className="edit-product-menu">
            <div className="shadow-container">
                <div className="edit-product-menu-top">
                    <div className="edit-product-menu-top-search">
                        <InputAuth 
                            value={search} 
                            setValue={setSearch} 
                            type="text" 
                            required={true} 
                            label={'Поиск'}
                            maxLength={55}
                        />
                    </div>
                    <div className="edit-product-menu-top-add-product">
                        <Button
                            text="Добавить продукт"
                            onClick={handleOpeneModalCreateProduct}
                        />
                    </div>
                    <div className="edit-product-menu-top-add-type">
                        <Button
                            text="Добавить тип"
                            onClick={handleOpeneModalCreateType}
                        />
                    </div>
                </div>
                <div className="edit-product-menu-list">
                    {sortListProduct.length > 0 ? (
                        sortListProduct.map((item) => (
                            <div className="edit-product-menu-list-item" key={item.id} onClick={() => navigate(`/productCard/${item.id}/${false}`)}>
                                <div className="edit-product-menu-list-item-img">
                                    <img src={process.env.REACT_APP_API_URL + item.img} alt="Куда-то делась рейтинговая звезда:(" />
                                </div>
                                <div className="edit-product-menu-list-item-name">
                                    {item.name}
                                </div>
                                <div className="edit-product-menu-list-item-price">
                                    {item.price}₽
                                </div>
                                <div className="edit-product-menu-list-item-rating">
                                    <img src={StarImg} alt="Куда-то делась рейтинговая звезда:(" />
                                    <div className="edit-product-menu-list-item-rating-score">
                                        {item.rating}
                                    </div>
                                </div>
                                <div className="edit-product-menu-list-item-delete" onClick={(e) => e.stopPropagation()}>
                                    <img src={deleteImg} alt="Куда-то делась рейтинговая звезда:(" onClick={() => deleteProductHandler(item.id)} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="edit-product-menu-list-not-found">
                            Продукты не найдены
                        </div>
                    )}
                </div>
            </div>
            {showModalCreateProduct && (
                <CreateProduct
                    onClose={handleCloseModalCreateProduct} 
                />
            )}
            {showModalCreateType && (
                <CreateType
                    onClose={handleCloseModalCreateType} 
                />
            )}
        </div>
    )
}

export default EditProduct;
