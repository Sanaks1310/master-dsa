import { Link } from 'react-router-dom';
import { DSATopic } from '@/data/dsaTopics';
import { ArrowRight } from 'lucide-react';

interface TopicCardProps {
  topic: DSATopic;
  index: number;
}

const colorClasses: Record<string, string> = {
  cyan: 'from-cyan/20 to-cyan/5 border-cyan/30 hover:border-cyan/60 hover:shadow-[0_0_30px_hsl(175_80%_50%/0.2)]',
  purple: 'from-purple/20 to-purple/5 border-purple/30 hover:border-purple/60 hover:shadow-[0_0_30px_hsl(280_70%_60%/0.2)]',
  green: 'from-green/20 to-green/5 border-green/30 hover:border-green/60 hover:shadow-[0_0_30px_hsl(150_70%_45%/0.2)]',
  orange: 'from-orange/20 to-orange/5 border-orange/30 hover:border-orange/60 hover:shadow-[0_0_30px_hsl(25_95%_55%/0.2)]',
  pink: 'from-pink/20 to-pink/5 border-pink/30 hover:border-pink/60 hover:shadow-[0_0_30px_hsl(330_80%_60%/0.2)]',
};

const badgeClasses: Record<string, string> = {
  beginner: 'bg-green/20 text-green border-green/30',
  intermediate: 'bg-orange/20 text-orange border-orange/30',
  advanced: 'bg-pink/20 text-pink border-pink/30',
};

const TopicCard = ({ topic, index }: TopicCardProps) => {
  return (
    <Link
      to={`/topic/${topic.id}`}
      className={`group relative block rounded-xl border bg-gradient-to-br p-6 transition-all duration-300 ${colorClasses[topic.color]}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{topic.icon}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded-full border ${badgeClasses[topic.difficulty]}`}>
          {topic.difficulty}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gradient-primary transition-all">
        {topic.title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {topic.description}
      </p>
      
      <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default TopicCard;
