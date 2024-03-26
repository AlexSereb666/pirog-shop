import React, { useState } from 'react';
import './ImageUploader.css'

const ImageUploader = ({ onUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
        onUpload(file); // Теперь передаем объект файла
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='file-custom'>
      <input className='file-custom__input' type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <img className='file-custom__img' src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
