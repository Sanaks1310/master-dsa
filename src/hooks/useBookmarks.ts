import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'dsa-bookmarks';

const getInitialBookmarks = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading bookmarks from localStorage:', error);
  }
  return [];
};

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>(getInitialBookmarks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks to localStorage:', error);
    }
  }, [bookmarks]);

  const toggleBookmark = useCallback((topicId: string) => {
    setBookmarks((prev) => {
      if (prev.includes(topicId)) {
        return prev.filter((id) => id !== topicId);
      }
      return [...prev, topicId];
    });
  }, []);

  const isBookmarked = useCallback((topicId: string): boolean => {
    return bookmarks.includes(topicId);
  }, [bookmarks]);

  const getBookmarkedTopics = useCallback((): string[] => {
    return bookmarks;
  }, [bookmarks]);

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    getBookmarkedTopics,
  };
};
