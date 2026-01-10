import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight } from 'lucide-react';
import { DSATopic, dsaCategories } from '@/data/dsaTopics';
import BookmarkButton from './BookmarkButton';

interface BookmarkedTopicsProps {
  bookmarkedIds: string[];
  onToggleBookmark: (topicId: string) => void;
}

const BookmarkedTopics = ({ bookmarkedIds, onToggleBookmark }: BookmarkedTopicsProps) => {
  if (bookmarkedIds.length === 0) return null;

  // Get all topics from categories
  const allTopics: DSATopic[] = dsaCategories.flatMap((cat) => cat.topics);
  const bookmarkedTopics = allTopics.filter((topic) =>
    bookmarkedIds.includes(topic.id)
  );

  if (bookmarkedTopics.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Bookmark className="w-5 h-5 text-primary fill-primary" />
        <h3 className="text-xl font-bold text-foreground">Your Bookmarks</h3>
        <span className="text-sm text-muted-foreground">
          ({bookmarkedTopics.length} topic{bookmarkedTopics.length !== 1 ? 's' : ''})
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {bookmarkedTopics.map((topic) => (
          <div
            key={topic.id}
            className="group relative flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-muted/50 transition-all duration-200"
          >
            <BookmarkButton
              isBookmarked={true}
              onToggle={(e) => {
                e.preventDefault();
                onToggleBookmark(topic.id);
              }}
              className="absolute top-2 right-2"
            />
            
            <span className="text-2xl">{topic.icon}</span>
            
            <div className="flex-1 min-w-0">
              <Link
                to={`/topic/${topic.id}`}
                className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1"
              >
                {topic.title}
              </Link>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {topic.description}
              </p>
            </div>
            
            <Link
              to={`/topic/${topic.id}`}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkedTopics;
