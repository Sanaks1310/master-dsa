import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import CategorySection from '@/components/CategorySection';
import ProgressSummary from '@/components/ProgressSummary';
import ComplexityTable from '@/components/ComplexityTable';
import BookmarkedTopics from '@/components/BookmarkedTopics';
import SearchInput from '@/components/SearchInput';
import { dsaCategories, TopicCategory } from '@/data/dsaTopics';
import { Code, BookOpen, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useBookmarks } from '@/hooks/useBookmarks';

const Index = () => {
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return dsaCategories;
    
    const query = searchQuery.toLowerCase();
    return dsaCategories
      .map((category): TopicCategory => ({
        ...category,
        topics: category.topics.filter(
          (topic) =>
            topic.title.toLowerCase().includes(query) ||
            topic.description.toLowerCase().includes(query) ||
            topic.id.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.topics.length > 0);
  }, [searchQuery]);

  const totalResults = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.topics.length, 0);
  }, [filteredCategories]);
  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Interactive Learning Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Master <span className="text-gradient-primary glow-text">Data Structures</span>
              <br />& <span className="text-gradient-accent">Algorithms</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Learn DSA through interactive visualizations, detailed explanations, and hands-on practice. 
              See algorithms come to life and build your own data structures.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/topic/arrays">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary px-8">
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning
                </Button>
              </Link>
              <a href="#topics">
                <Button size="lg" variant="outline" className="border-border hover:border-primary hover:bg-muted/50 px-8">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Topics
                </Button>
              </a>
            </div>
          </div>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
            {[
              {
                icon: <Code className="w-6 h-6" />,
                title: 'Complete Explanations',
                description: 'Definition, syntax, types, and code examples in multiple languages',
                color: 'cyan',
              },
              {
                icon: <Play className="w-6 h-6" />,
                title: 'Visual Animations',
                description: 'Watch step-by-step animations of how each algorithm works',
                color: 'purple',
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: 'Interactive Practice',
                description: 'Build and manipulate your own data structures in real-time',
                color: 'green',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl bg-gradient-to-br from-${feature.color}/10 to-transparent border border-${feature.color}/20 hover:border-${feature.color}/40 transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-lg bg-${feature.color}/20 flex items-center justify-center mb-4 text-${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section id="topics" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore All <span className="text-gradient-primary">Topics</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              From basic data structures to advanced algorithms, master each concept with comprehensive guides and interactive visualizations.
            </p>
            <SearchInput 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search topics by name or keyword..."
            />
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-4">
                Found {totalResults} topic{totalResults !== 1 ? 's' : ''} matching "{searchQuery}"
              </p>
            )}
          </div>
          
          {!searchQuery && <ProgressSummary />}
          
          {!searchQuery && (
            <BookmarkedTopics 
              bookmarkedIds={bookmarks} 
              onToggleBookmark={toggleBookmark} 
            />
          )}
          
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <CategorySection 
                key={category.id} 
                category={category}
                isBookmarked={isBookmarked}
                onToggleBookmark={toggleBookmark}
              />
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No topics found matching "{searchQuery}"</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            </div>
          )}
          
          {/* Complexity Comparison Table */}
          <div className="mt-16">
            <ComplexityTable />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            Built with passion for developers learning DSA. Keep coding! 🚀
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
