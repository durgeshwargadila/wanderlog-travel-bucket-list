import React, { useState } from 'react';
import { CountryCard } from '../Explore/CountryCard';
import { useBucketList } from '../../hooks/useBucketList';
import { Award, Move } from 'lucide-react';

export function VisitedList() {
  const { visitedList, reorderVisited } = useBucketList();
  const [draggedIndex, setDraggedIndex] = useState(null);

  if (visitedList.length === 0) {
    return (
      <div className="empty-state-container">
        <Award className="empty-state-icon animated-award" size={64} />
        <h3 className="empty-state-title">No visited countries yet</h3>
        <p className="empty-state-message">Add countries you have visited by clicking the checkmark icon in the explorer grid!</p>
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
      reorderVisited(sourceIndex, index);
    }
    setDraggedIndex(null);
  };

  return (
    <div>
      <p className="drag-help-text">
        <Move size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
        Drag and drop cards to reorder your visited history records.
      </p>
      <div className="country-grid">
        {visitedList.map((country, index) => (
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
