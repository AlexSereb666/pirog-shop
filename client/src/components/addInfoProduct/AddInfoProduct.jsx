import React, { useState } from 'react';
import './AddInfoProduct.css'
import Button from '../button/Button';

const AddInfoProduct = ({ onClose, updateInfo, listInfo }) => {
  const [info, setInfo] = useState(listInfo);

  const handleAddInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };

  const handleUpdateInfo = () => {
    updateInfo(info);
  };

  const handleRemoveInfo = (number) => {
    setInfo(info.filter(i => i.number !== number));
  };

  const handleTitleChange = (number, value) => {
    setInfo(prevInfo =>
      prevInfo.map(i =>
        i.number === number ? { ...i, title: value } : i
      )
    );
  };

  const handleDescriptionChange = (number, value) => {
    setInfo(prevInfo =>
      prevInfo.map(i =>
        i.number === number ? { ...i, description: value } : i
      )
    );
  };

  /*
  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }
  */

  return (
    <>
      <div className="overlay" />
      <div className="add-info-menu">
        <div className="add-info-menu__close-btn" onClick={() => {handleUpdateInfo(); onClose()}}>X</div>
        {info.map(({ title, description, number }) => (
          <div  className="add-info-menu__container" key={number}>
            <input
              className="add-info-menu__input"
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(number, e.target.value)}
              placeholder="Заголовок"
            />
            <input
              className="add-info-menu__input"
              value={description}
              onChange={(e) => handleDescriptionChange(number, e.target.value)}
              placeholder="Описание"
            />
            <button className="add-info-menu__btn-delete" onClick={() => handleRemoveInfo(number)}>Удалить</button>
          </div>
        ))}
        <Button
          text="Добавить пункт"
          onClick={handleAddInfo}
        />
        <Button
          text="Закрыть"
          onClick={() => {handleUpdateInfo(); onClose()}}
        />
      </div>
    </>
  );
}

export default AddInfoProduct;
