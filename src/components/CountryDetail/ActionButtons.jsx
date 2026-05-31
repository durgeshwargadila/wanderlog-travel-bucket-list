import React from 'react';
import { Heart, Check } from 'lucide-react';
import { useBucketList } from '../../hooks/useBucketList';
import { ActionButton } from '../Common/ActionButton';

export function ActionButtons({ country }) {
  const { toggleWishlist, toggleVisited, isInWishlist, isInVisited } = useBucketList();
  
  if (!country) return null;
  const { cca3 } = country;

  const wishlisted = isInWishlist(cca3);
  const visited = isInVisited(cca3);

  return (
    <div className="detail-action-buttons">
      <ActionButton
        variant={wishlisted ? 'danger' : 'primary'}
        onClick={() => toggleWishlist(country)}
        ariaLabel={wishlisted ? 'Remove from bucket list' : 'Add to bucket list'}
        className="detail-action-btn"
      >
        <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
        <span>{wishlisted ? 'Remove from Bucket List' : 'Add to Bucket List'}</span>
      </ActionButton>

      <ActionButton
        variant={visited ? 'success' : 'outline'}
        onClick={() => toggleVisited(country)}
        ariaLabel={visited ? 'Mark country as unvisited' : 'Mark country as visited'}
        className="detail-action-btn"
      >
        <Check size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
        <span>{visited ? 'Visited' : 'Mark as Visited'}</span>
      </ActionButton>
    </div>
  );
}
