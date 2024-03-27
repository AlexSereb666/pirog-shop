import React, { useContext, useState, useEffect } from 'react';
import Button from "../button/Button";
import InputAuth from '../input-auth/InputAuth';
import CustomDropdown from '../customDropdown/CustomDropdown';
import ImageUploader from '../imageUploader/ImageUploader';
import AddInfoProduct from '../addInfoProduct/AddInfoProduct';
import { createProduct } from '../../http/productAPI';
import MessageBox from '../messageBox/MessageBox';
import { fetchTypes } from '../../http/productAPI';

const CreateProduct = ({onClose}) => {

    const [showModalAddInfo, setShowModalAddInfo] = useState(false);

    const [showModalMessageBox, setShowModalMessageBox] = useState(false);
    const [messageBoxMessage, setMessageBoxMessage] = useState("");

    const [options, setOptions] = useState([])
    const [listType, setListType] = useState([])

    useEffect(() => {
        fetchTypes().then((item) => setOptions(item))
    }, [])

    useEffect(() => {
        options.map((item) => {
            setListType(prevListType => [...prevListType, {id: item.id, name: item.name}]);
        })
    }, [options])

    const handleOpeneModalMessageBox = () => {
        setShowModalMessageBox(true);
    }

    const handleCloseModalMessageBox = () => {
        setShowModalMessageBox(false);
    }

    const handleOpeneModalAddInfo = () => {
        setShowModalAddInfo(true);
    }

    const handleCloseModalAddInfo = () => {
        setShowModalAddInfo(false);
    }

    // характеристики продукта //
    const [info, setInfo] = useState([])

    const handleUpdateInfo = (updatedInfo) => {
        setInfo(updatedInfo);
    };

    const [name, setName] = useState("")
    const [price, setPrice] = useState("0")

    const [selectType, setSelectType] = useState("")
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleSelectType = (value) => {
        setSelectType(value)
        //console.log(selectType)
    };

    const handleImageUpload = (imageData) => {
        setUploadedImage(imageData);
    };

    useEffect(() => {
        //console.log(selectType);
    }, [selectType]);

    useEffect(() => {
        if (price < 0) {
            setPrice("0")
        }
    }, [price]);

    const addProduct = () => {

        if (name.trim() === "") {
            setMessageBoxMessage("Введите название продукта")
            handleOpeneModalMessageBox(true)
            return
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)

        if (uploadedImage === null) {
            setMessageBoxMessage("Выберите изображение продукта")
            handleOpeneModalMessageBox(true)
            return
        }
        formData.append('img', uploadedImage)

        const selectedTypeObject = listType.find(option => option.name === selectType);
        if (selectedTypeObject) {
            const selectedTypeId = selectedTypeObject.id;
            formData.append('ProductTypeId', selectedTypeId)
        } else {
            setMessageBoxMessage("Выберите тип продукта")
            handleOpeneModalMessageBox(true)
            return
        }

        formData.append('info', JSON.stringify(info))
        //console.log(Array.from(formData.entries()))
        createProduct(formData)

        setMessageBoxMessage("Продукт успешно добавлен")
        handleOpeneModalMessageBox(true)

        setName("")
        setPrice("0")

        //setSelectType("")

        setInfo([])
        //setUploadedImage(null);
    }

    return (
        <>
        <div className="overlay" />
        <div className="admin-menu-modal-password">
            <div className="admin-menu-modal-password__close-btn" onClick={onClose}>X</div>
            <InputAuth
                value={name} 
                setValue={setName} 
                type="text" 
                required={true}
                label={'Введите имя продукта...'}
                maxLength={60}
            />
            <InputAuth
                value={price} 
                setValue={setPrice}
                min={0}
                type="number" 
                required={true}
                label={'Введите цену продукта...'}
                maxLength={60}
            />
            <CustomDropdown
                options={listType}
                onSelect={handleSelectType}
                text="Выберите тип"
            />
            <ImageUploader
                onUpload={handleImageUpload}
            />
            <Button
                text="Описание продукта"
                onClick={handleOpeneModalAddInfo}
            />
            <Button
                text="Добавить продукт"
                onClick={addProduct}
            />
        </div>
        {showModalAddInfo && (
            <AddInfoProduct
                onClose={handleCloseModalAddInfo} 
                updateInfo={handleUpdateInfo}
                listInfo={info}
            />
        )}
        {showModalMessageBox && (
            <MessageBox
                onClose={handleCloseModalMessageBox} 
                message={messageBoxMessage}
            />
        )}
        </>
    )
}

export default CreateProduct;
