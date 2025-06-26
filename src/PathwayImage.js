import React from 'react';
import './PathwayImage.css';

const PathwayImage = ({ pathway }) => {
  if (!pathway) {
    return null;
  }

  let imageSrc;
  try {
    // Dynamically require the image from src/assets/pathway_images
    imageSrc = require(`/src/assets/pathway_images/${pathway}.png`);
  } catch (error) {
    console.warn(`Image not found for pathway: ${pathway}. Error:`, error);
    return null; // Or return a placeholder image/component
  }

  return (
    <div className="pathway-image-container">
      <img src={imageSrc} alt={`Pathway ${pathway}`} className="pathway-image" />
    </div>
  );
};

export default PathwayImage;
