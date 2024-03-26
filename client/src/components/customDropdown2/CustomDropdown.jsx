import React, { useState, useEffect } from 'react';
import './CustomDropdown.css';

const CustomDropdown = ({ options, onSelect, text, selectedItem = '', containerStyle, disabled = false }) => {
  const [selectedOption, setSelectedOption] = useState(selectedItem);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelect(value);
  };

  useEffect(() => {
    setSelectedOption(selectedItem);
  }, [selectedItem]);

  return (
    <div className='Custom-Dropdown-container' style={containerStyle}>
      <select className='Custom-Dropdown' value={selectedOption} onChange={handleSelectChange} disabled={disabled}>
        <option className='Custom-Dropdown__main' value="" disabled>{text}</option>
        {options.map((option) => (
          <option className='Custom-Dropdown__option' key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
