import { useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { useNavigate } from 'react-router-dom';

export interface Shortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  description: string;
  action: () => void;
}

interface UseKeyboardShortcutsProps {
  onClearSearch?: () => void;
  onToggleShortcutsHelp?: () => void;
}

export const useKeyboardShortcuts = ({ 
  onClearSearch, 
  onToggleShortcutsHelp 
}: UseKeyboardShortcutsProps = {}) => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const goHome = useCallback(() => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const goToTopics = useCallback(() => {
    const topicsSection = document.getElementById('topics');
    if (topicsSection) {
      topicsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [navigate]);

  const focusSearch = useCallback(() => {
    const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    } else {
      navigate('/');
      setTimeout(() => {
        const input = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        input?.focus();
      }, 100);
    }
  }, [navigate]);

  const shortcuts: Shortcut[] = [
    { key: 't', description: 'Toggle dark/light theme', action: toggleTheme },
    { key: 'h', description: 'Go to home page', action: goHome },
    { key: 's', description: 'Jump to topics section', action: goToTopics },
    { key: '/', description: 'Focus search input', action: focusSearch },
    { key: 'Escape', description: 'Clear search', action: () => onClearSearch?.() },
    { key: '?', shiftKey: true, description: 'Show keyboard shortcuts', action: () => onToggleShortcutsHelp?.() },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement;
      const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
      
      // Allow Escape and some shortcuts even when typing
      if (isTyping && event.key !== 'Escape') {
        return;
      }

      for (const shortcut of shortcuts) {
        const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase() || 
                          (shortcut.key === '?' && event.key === '?' && event.shiftKey);
        const ctrlMatches = !shortcut.ctrlKey || event.ctrlKey;
        const metaMatches = !shortcut.metaKey || event.metaKey;
        const shiftMatches = !shortcut.shiftKey || event.shiftKey;

        if (keyMatches && ctrlMatches && metaMatches && shiftMatches) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);

  return { shortcuts };
};
