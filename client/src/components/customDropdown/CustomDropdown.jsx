import React, { useState, useEffect } from 'react';
import './CustomDropdown.css'

const CustomDropdown = ({ options, onSelect, text, selectedItem = '' }) => {
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
    <select className='Custom-Dropdown' value={selectedOption} onChange={handleSelectChange}>
      <option className='Custom-Dropdown__main' value="" disabled>{text}</option>
      {options.map((option) => (
        <option className='Custom-Dropdown__option' key={option.id} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default CustomDropdown;
