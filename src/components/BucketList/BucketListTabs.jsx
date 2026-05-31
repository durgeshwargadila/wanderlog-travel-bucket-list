import React from 'react';
import { Heart, Check } from 'lucide-react';

export function BucketListTabs({ activeTab, setActiveTab, wishlistCount, visitedCount }) {
  return (
    <div className="bucket-list-tabs" role="tablist">
      <button
        type="button"
        className={`tab-button ${activeTab === 'wishlist' ? 'active' : ''}`}
        onClick={() => setActiveTab('wishlist')}
        aria-selected={activeTab === 'wishlist'}
        role="tab"
        aria-controls="wishlist-panel"
        id="wishlist-tab"
      >
        <Heart size={16} fill={activeTab === 'wishlist' ? 'currentColor' : 'none'} style={{ marginRight: '8px' }} />
        <span>Want to Visit</span>
        <span className="tab-badge">{wishlistCount}</span>
      </button>
      <button
        type="button"
        className={`tab-button ${activeTab === 'visited' ? 'active' : ''}`}
        onClick={() => setActiveTab('visited')}
        aria-selected={activeTab === 'visited'}
        role="tab"
        aria-controls="visited-panel"
        id="visited-tab"
      >
        <Check size={16} style={{ marginRight: '8px' }} />
        <span>Have Visited</span>
        <span className="tab-badge">{visitedCount}</span>
      </button>
    </div>
  );
}
