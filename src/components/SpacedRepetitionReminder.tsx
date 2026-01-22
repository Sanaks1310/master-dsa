import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Brain, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useProgress, TopicProgress } from '@/hooks/useProgress';
import { dsaCategories } from '@/data/dsaTopics';
import { Badge } from '@/components/ui/badge';

interface ReviewTopic {
  id: string;
  title: string;
  icon: string;
  lastAttempt: Date;
  daysSinceReview: number;
  bestScore: number;
  quizTotal: number;
  urgency: 'overdue' | 'due-soon' | 'good';
}

const getTopicInfo = (topicId: string) => {
  for (const category of dsaCategories) {
    const topic = category.topics.find((t) => t.id === topicId);
    if (topic) return { title: topic.title, icon: topic.icon };
  }
  return { title: topicId, icon: '📚' };
};

const calculateUrgency = (daysSinceReview: number, scorePercentage: number): ReviewTopic['urgency'] => {
  // Lower scores need more frequent review
  const baseInterval = scorePercentage >= 90 ? 14 : scorePercentage >= 70 ? 7 : 3;
  
  if (daysSinceReview >= baseInterval * 1.5) return 'overdue';
  if (daysSinceReview >= baseInterval) return 'due-soon';
  return 'good';
};

const SpacedRepetitionReminder = () => {
  const { progress } = useProgress();

  const reviewTopics = useMemo((): ReviewTopic[] => {
    const now = new Date();
    const topics: ReviewTopic[] = [];

    Object.entries(progress.topics).forEach(([topicId, topicProgress]) => {
      if (!topicProgress.lastAttempt || topicProgress.bestScore === null || topicProgress.quizTotal === null) {
        return;
      }

      const lastAttempt = new Date(topicProgress.lastAttempt);
      const daysSinceReview = Math.floor((now.getTime() - lastAttempt.getTime()) / (1000 * 60 * 60 * 24));
      const scorePercentage = (topicProgress.bestScore / topicProgress.quizTotal) * 100;
      const urgency = calculateUrgency(daysSinceReview, scorePercentage);

      const { title, icon } = getTopicInfo(topicId);

      topics.push({
        id: topicId,
        title,
        icon,
        lastAttempt,
        daysSinceReview,
        bestScore: topicProgress.bestScore,
        quizTotal: topicProgress.quizTotal,
        urgency,
      });
    });

    // Sort by urgency (overdue first) then by days since review
    return topics
      .filter((t) => t.urgency !== 'good')
      .sort((a, b) => {
        const urgencyOrder = { overdue: 0, 'due-soon': 1, good: 2 };
        if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
          return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
        }
        return b.daysSinceReview - a.daysSinceReview;
      })
      .slice(0, 5);
  }, [progress.topics]);

  if (reviewTopics.length === 0) {
    return null;
  }

  const overdueCount = reviewTopics.filter((t) => t.urgency === 'overdue').length;

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Review Suggestions</h3>
        </div>
        {overdueCount > 0 && (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {overdueCount} overdue
          </Badge>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Based on spaced repetition, these topics are ready for review to strengthen your memory.
      </p>

      <div className="space-y-3">
        {reviewTopics.map((topic) => {
          const scorePercentage = Math.round((topic.bestScore / topic.quizTotal) * 100);
          
          return (
            <Link
              key={topic.id}
              to={`/topic/${topic.id}`}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all hover:scale-[1.01] ${
                topic.urgency === 'overdue'
                  ? 'bg-destructive/10 border-destructive/30 hover:border-destructive/50'
                  : 'bg-orange-500/10 border-orange-500/30 hover:border-orange-500/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{topic.icon}</span>
                <div>
                  <h4 className="font-medium text-foreground">{topic.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>
                      {topic.daysSinceReview === 0
                        ? 'Today'
                        : topic.daysSinceReview === 1
                        ? 'Yesterday'
                        : `${topic.daysSinceReview} days ago`}
                    </span>
                    <span className="text-muted-foreground/50">•</span>
                    <span className="flex items-center gap-1">
                      {scorePercentage === 100 ? (
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                      ) : null}
                      Best: {scorePercentage}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={
                    topic.urgency === 'overdue'
                      ? 'border-destructive/50 text-destructive'
                      : 'border-orange-500/50 text-orange-500'
                  }
                >
                  {topic.urgency === 'overdue' ? 'Overdue' : 'Due soon'}
                </Badge>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </Link>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        💡 Lower scores trigger more frequent reviews for better retention
      </p>
    </div>
  );
};

export default SpacedRepetitionReminder;
