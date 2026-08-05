import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', []);

  const toggleBookmark = (job) => {
    setBookmarks(prev => {
      const exists = prev.find(item => item.id === job.id);
      if (exists) {
        return prev.filter(item => item.id !== job.id);
      }
      return [...prev, job];
    });
  };

  const isBookmarked = (id) => bookmarks.some(item => item.id === id);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);