import React, { useState } from 'react';
import './CustomCheckbox.css';

const CustomCheckbox = ({ label, productId, onChange, onChangeSolo }) => {
  const [checked, setChecked] = useState(true); // По умолчанию выделен

  const handleCheckboxChange = () => {
    const newCheckedState = !checked;
    setChecked(newCheckedState);

    // Вызываем onChange с новым состоянием
    onChange && onChange(productId, newCheckedState);
    onChangeSolo && onChangeSolo(newCheckedState);
  };

  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className="checkmark"></span>
      <span className="custom-checkbox__text">{label}</span>
    </label>
  );
};

export default CustomCheckbox;
