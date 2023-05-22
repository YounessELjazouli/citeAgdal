import React, { useState, useEffect } from 'react';

const ImageComponent = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await fetch(`/api/photos/${localStorage.getItem('photo')}`);
        if (response.ok) {
          const url = URL.createObjectURL(await response.blob());
          setImageUrl(url);
        } else {
          console.error('Failed to fetch image');
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImageUrl();
  }, []);

  return (
    <div>
      {imageUrl && <img src={'http://localhost:8000/api/photos/notset.jpg'} className="profile-img" alt="Image" />}
    </div>
  );
};

export default ImageComponent;
