import React, { createContext, useReducer, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export const BucketListContext = createContext(null);

const initialState = {
  wishlist: [],
  visitedList: []
};

function bucketListReducer(state, action) {
  switch (action.type) {
    case 'LOAD_USER_DATA':
      return {
        wishlist: action.payload.wishlist || [],
        visitedList: action.payload.visitedList || []
      };
    case 'TOGGLE_WISHLIST': {
      const { country } = action.payload;
      const exists = state.wishlist.some(item => item.cca3 === country.cca3);
      let newWishlist;
      if (exists) {
        newWishlist = state.wishlist.filter(item => item.cca3 !== country.cca3);
      } else {
        newWishlist = [...state.wishlist, country];
      }
      return { ...state, wishlist: newWishlist };
    }
    case 'TOGGLE_VISITED': {
      const { country } = action.payload;
      const exists = state.visitedList.some(item => item.cca3 === country.cca3);
      let newVisitedList;
      if (exists) {
        newVisitedList = state.visitedList.filter(item => item.cca3 !== country.cca3);
      } else {
        newVisitedList = [...state.visitedList, country];
      }
      return { ...state, visitedList: newVisitedList };
    }
    case 'REORDER_WISHLIST': {
      const { startIndex, endIndex } = action.payload;
      const result = Array.from(state.wishlist);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { ...state, wishlist: result };
    }
    case 'REORDER_VISITED': {
      const { startIndex, endIndex } = action.payload;
      const result = Array.from(state.visitedList);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { ...state, visitedList: result };
    }
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export function BucketListProvider({ children }) {
  const { userEmail } = useAuth();
  const [state, dispatch] = useReducer(bucketListReducer, initialState);
  const loadedEmailRef = useRef(null);

  // Sync state loading on userEmail changes
  useEffect(() => {
    if (userEmail) {
      const raw = localStorage.getItem(`wanderlog_bucket_${userEmail}`);
      let parsed = { wishlist: [], visitedList: [] };
      if (raw) {
        try {
          parsed = JSON.parse(raw);
        } catch (e) {
          console.error('Failed to parse bucket list data:', e);
        }
      }
      dispatch({ type: 'LOAD_USER_DATA', payload: parsed });
      loadedEmailRef.current = userEmail;
    } else {
      dispatch({ type: 'CLEAR' });
      loadedEmailRef.current = null;
    }
  }, [userEmail]);

  // Save changes to localStorage only after database is loaded
  useEffect(() => {
    if (userEmail && loadedEmailRef.current === userEmail) {
      localStorage.setItem(`wanderlog_bucket_${userEmail}`, JSON.stringify(state));
    }
  }, [state, userEmail]);

  const toggleWishlist = useCallback((country) => {
    const exists = state.wishlist.some(item => item.cca3 === country.cca3);
    const countryName = country.name?.common || country.name || 'Country';
    
    dispatch({ type: 'TOGGLE_WISHLIST', payload: { country } });
    
    if (exists) {
      toast.success(`Removed ${countryName} from Bucket List`);
    } else {
      toast.success(`Added ${countryName} to Bucket List!`);
    }
  }, [state.wishlist]);

  const toggleVisited = useCallback((country) => {
    const exists = state.visitedList.some(item => item.cca3 === country.cca3);
    const countryName = country.name?.common || country.name || 'Country';
    
    dispatch({ type: 'TOGGLE_VISITED', payload: { country } });
    
    if (exists) {
      toast.success(`Marked ${countryName} as Unvisited`);
    } else {
      toast.success(`Marked ${countryName} as Visited!`);
    }
  }, [state.visitedList]);

  const reorderWishlist = useCallback((startIndex, endIndex) => {
    dispatch({ type: 'REORDER_WISHLIST', payload: { startIndex, endIndex } });
  }, []);

  const reorderVisited = useCallback((startIndex, endIndex) => {
    dispatch({ type: 'REORDER_VISITED', payload: { startIndex, endIndex } });
  }, []);

  const isInWishlist = useCallback((cca3) => {
    return state.wishlist.some(item => item.cca3 === cca3);
  }, [state.wishlist]);

  const isInVisited = useCallback((cca3) => {
    return state.visitedList.some(item => item.cca3 === cca3);
  }, [state.visitedList]);

  const value = {
    wishlist: state.wishlist,
    visitedList: state.visitedList,
    toggleWishlist,
    toggleVisited,
    reorderWishlist,
    reorderVisited,
    isInWishlist,
    isInVisited
  };

  return (
    <BucketListContext.Provider value={value}>
      {children}
    </BucketListContext.Provider>
  );
}
