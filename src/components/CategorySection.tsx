import { TopicCategory } from '@/data/dsaTopics';
import TopicCard from './TopicCard';
import { Badge } from './ui/badge';

interface CategorySectionProps {
  category: TopicCategory;
}

const CategorySection = ({ category }: CategorySectionProps) => {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="outline" className="text-xs font-mono">
            Level {category.level}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {category.name}
          </h2>
        </div>
        <p className="text-muted-foreground">
          {category.description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {category.topics.map((topic, index) => (
          <TopicCard key={topic.id} topic={topic} index={index} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
