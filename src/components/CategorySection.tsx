import { TopicCategory } from '@/data/dsaTopics';
import TopicCard from './TopicCard';

interface CategorySectionProps {
  category: TopicCategory;
}

const CategorySection = ({ category }: CategorySectionProps) => {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          {category.name}
        </h2>
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
