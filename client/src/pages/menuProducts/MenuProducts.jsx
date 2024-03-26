import React, { useState, useEffect } from 'react';
import './MenuProducts.css';
import { getAll } from '../../http/productAPI'
import InputAuth from '../../components/input-auth/InputAuth';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';

function MenuProducts() {
  const [listProduct, setListProduct] = useState([])
  const [sortListProduct, setSortListProduct] = useState([])

  const [listType, setListType] = useState([])

  const [selectedType, setSelectedType] = useState("")
  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  const initListProduct = () => {
    getAll().then((item) => {
      setListProduct(item)
    })
  }

  useEffect(() => {
    initListProduct()
  }, [])

  useEffect(() => {
    setSortListProduct(listProduct)
  }, [listProduct])

  useEffect(() => {
    setListType([...new Set(listProduct.map(product => product.Product_type.name))]);
  }, [listProduct])

  const selectedSortType = (value) => {
    setSelectedType(value)
    setSearch("")

    const filteredProducts = listProduct.filter(item =>
      item.Product_type.name.toLowerCase().includes(selectedType.toLowerCase())
    );
    setSortListProduct(filteredProducts);
  }

  useEffect(() => {
    // Фильтрация списка продуктов при изменении значения поиска
    const filteredProducts = listProduct.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setSortListProduct(filteredProducts);
    setSelectedType("")
  }, [search])

  return (
    <div className="product-menu">
      <div className="shadow-container">
        <div className="product-menu-work">
          <div className="product-menu-left-section">
            {listType.map((item) => (
              <Button
                text={item}
                onClick={() => selectedSortType(item)}
              />
            ))}
          </div>
          <div className="product-menu-right-section">
            <div className="product-menu-top-section">
              <InputAuth 
                value={search} 
                setValue={setSearch} 
                type="text" 
                required={true} 
                label={'Поиск'}
                maxLength={55}
              />
            </div>
            <div className="product-menu-bottom-section">
              {sortListProduct.length > 0 ? (
                sortListProduct.map((item) => (
                  <div className="product-menu-bottom-section-item" key={item.id} onClick={() => navigate(`/productCard/${item.id}/${true}`)}>
                    <div className="product-menu-bottom-section-item-img">
                      <img src={process.env.REACT_APP_API_URL + item.img} alt="Куда-то делась рейтинговая звезда:(" />
                    </div>
                    <div className="product-menu-bottom-section-item-name">
                      {item.name}
                    </div>
                    <div className="product-menu-bottom-section-item-price">
                      {item.price}₽
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
        </div>
      </div>
    </div>
  );
}

export default MenuProducts;
