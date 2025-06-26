import React from 'react';
import './PathwayImage.css';

const PathwayImage = ({ pathway }) => {
  if (!pathway) {
    return null;
  }

  const imagePath = `/pathway_images/${pathway}.png`;

  return (
    <div className="pathway-image-container">
      <img src={imagePath} alt={`Pathway ${pathway}`} className="pathway-image" />
    </div>
  );
};

export default PathwayImage;
