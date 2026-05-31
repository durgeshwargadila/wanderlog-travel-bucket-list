import { useContext } from 'react';
import { BucketListContext } from '../context/BucketListContext';

export function useBucketList() {
  const context = useContext(BucketListContext);
  if (!context) {
    throw new Error('useBucketList must be used within a BucketListProvider');
  }
  return context;
}
