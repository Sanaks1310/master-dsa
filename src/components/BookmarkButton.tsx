import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: (e: React.MouseEvent) => void;
  className?: string;
}

const BookmarkButton = ({ isBookmarked, onToggle, className }: BookmarkButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'p-1.5 rounded-full transition-all duration-200 hover:scale-110',
        isBookmarked
          ? 'bg-primary/20 text-primary'
          : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground',
        className
      )}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <Bookmark
        className={cn('w-4 h-4', isBookmarked && 'fill-current')}
      />
    </button>
  );
};

export default BookmarkButton;
