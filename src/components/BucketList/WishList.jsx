import React, { useState } from 'react';
import { CountryCard } from '../Explore/CountryCard';
import { useBucketList } from '../../hooks/useBucketList';
import { Compass, Move } from 'lucide-react';

export function WishList() {
  const { wishlist, reorderWishlist } = useBucketList();
  const [draggedIndex, setDraggedIndex] = useState(null);

  if (wishlist.length === 0) {
    return (
      <div className="empty-state-container">
        <Compass className="empty-state-icon animated-compass" size={64} />
        <h3 className="empty-state-title">Your Bucket List is empty</h3>
        <p className="empty-state-message">Go back to the Explore page and add countries you wish to visit!</p>
      </div>
    );
  }

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (!isNaN(sourceIndex) && sourceIndex !== index) {
      reorderWishlist(sourceIndex, index);
    }
    setDraggedIndex(null);
  };

  return (
    <div>
      <p className="drag-help-text">
        <Move size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
        Drag and drop cards to reorder your priority travel plans.
      </p>
      <div className="country-grid">
        {wishlist.map((country, index) => (
          <div
            key={country.cca3}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={() => setDraggedIndex(null)}
            className={`draggable-card-wrapper ${draggedIndex === index ? 'dragging' : ''}`}
          >
            <div className="drag-handle-indicator" title="Drag to reorder">
              <Move size={16} />
            </div>
            <CountryCard country={country} />
          </div>
        ))}
      </div>
    </div>
  );
}
