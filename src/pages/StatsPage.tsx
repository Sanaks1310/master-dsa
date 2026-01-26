import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  Brain, 
  TrendingUp, 
  Calendar,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useStudyTime } from '@/hooks/useStudyTime';
import { useProgressHistory } from '@/hooks/useProgressHistory';
import { useProgress } from '@/hooks/useProgress';
import { useStreak } from '@/hooks/useStreak';
import { useAchievements } from '@/hooks/useAchievements';

type TimePeriod = '7' | '14' | '30';

const periodLabels: Record<TimePeriod, string> = {
  '7': 'Last 7 Days',
  '14': 'Last 14 Days',
  '30': 'Last 30 Days',
};

const formatMinutes = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

const formatDateLabel = (dateStr: string, period: number): string => {
  const date = new Date(dateStr);
  if (period <= 14) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  // For 30 days, show shorter format
  return date.toLocaleDateString('en-US', { day: 'numeric' });
};

const StatsPage = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('14');
  const days = parseInt(timePeriod);
  
  const { getTimeByDate, getTodayMinutes, getWeekMinutes, getLastWeekMinutes, getWeeklyComparison, getAverageSessionLength, totalMinutes } = useStudyTime();
  const { getTopicsCompletedByDate, getQuizScoresByDate, getRecentQuizzes, getTotalTopicsCompletedThisWeek, getTotalQuizzesTakenThisWeek, getWeeklyQuizComparison } = useProgressHistory();
  const { getCompletedTopicsCount, getAverageScore } = useProgress();
  const { streak } = useStreak();
  const { unlockedCount, totalAchievements } = useAchievements();

  // Week-over-week comparison data
  const studyTimeComparison = useMemo(() => getWeeklyComparison(), [getWeeklyComparison]);
  const quizScoreComparison = useMemo(() => getWeeklyQuizComparison(), [getWeeklyQuizComparison]);
  
  const thisWeekTotal = getWeekMinutes();
  const lastWeekTotal = getLastWeekMinutes();
  const weekOverWeekChange = lastWeekTotal > 0 
    ? Math.round(((thisWeekTotal - lastWeekTotal) / lastWeekTotal) * 100) 
    : thisWeekTotal > 0 ? 100 : 0;

  const timeData = useMemo(() => 
    getTimeByDate(days).map((d) => ({
      ...d,
      label: formatDateLabel(d.date, days),
    })), 
    [getTimeByDate, days]
  );

  const topicsData = useMemo(() => 
    getTopicsCompletedByDate(days).map((d) => ({
      ...d,
      label: formatDateLabel(d.date, days),
    })), 
    [getTopicsCompletedByDate, days]
  );

  const quizData = useMemo(() => 
    getQuizScoresByDate(days).map((d) => ({
      ...d,
      label: formatDateLabel(d.date, days),
    })), 
    [getQuizScoresByDate, days]
  );

  const recentQuizzes = useMemo(() => getRecentQuizzes(5), [getRecentQuizzes]);

  const stats = [
    {
      label: 'Total Study Time',
      value: formatMinutes(totalMinutes),
      icon: Clock,
      color: 'text-cyan',
      bgColor: 'bg-cyan/20',
    },
    {
      label: 'Topics Completed',
      value: getCompletedTopicsCount().toString(),
      icon: BookOpen,
      color: 'text-purple',
      bgColor: 'bg-purple/20',
    },
    {
      label: 'Avg Quiz Score',
      value: `${getAverageScore()}%`,
      icon: Brain,
      color: 'text-green-500',
      bgColor: 'bg-green-500/20',
    },
    {
      label: 'Current Streak',
      value: `${streak.currentStreak} days`,
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/20',
    },
  ];

  const weeklyStats = [
    { label: 'Study Time', value: formatMinutes(getWeekMinutes()) },
    { label: 'Topics Completed', value: getTotalTopicsCompletedThisWeek().toString() },
    { label: 'Quizzes Taken', value: getTotalQuizzesTakenThisWeek().toString() },
    { label: 'Avg Session', value: formatMinutes(getAverageSessionLength()) },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Topics
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Learning Statistics</h1>
          <p className="text-muted-foreground">Track your progress and study habits over time</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weekly Summary */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">This Week</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {weeklyStats.map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-lg bg-muted/30">
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Week-over-Week Comparison Section */}
        <h2 className="text-xl font-semibold text-foreground mb-4">Week-over-Week Comparison</h2>
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Study Time Comparison Chart */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5 text-cyan" />
                  Study Time Comparison
                </CardTitle>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  weekOverWeekChange > 0 ? 'text-green-500' : weekOverWeekChange < 0 ? 'text-red-500' : 'text-muted-foreground'
                }`}>
                  {weekOverWeekChange > 0 ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : weekOverWeekChange < 0 ? (
                    <ArrowDownRight className="w-4 h-4" />
                  ) : (
                    <Minus className="w-4 h-4" />
                  )}
                  {Math.abs(weekOverWeekChange)}%
                </div>
              </div>
              <CardDescription>This week vs last week (minutes per day)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studyTimeComparison} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      formatter={(value: number, name: string) => [
                        `${value} min`, 
                        name === 'thisWeek' ? 'This Week' : 'Last Week'
                      ]}
                    />
                    <Bar 
                      dataKey="lastWeek" 
                      fill="hsl(var(--muted-foreground))" 
                      radius={[4, 4, 0, 0]}
                      opacity={0.5}
                      name="lastWeek"
                    />
                    <Bar 
                      dataKey="thisWeek" 
                      fill="hsl(var(--cyan))" 
                      radius={[4, 4, 0, 0]}
                      name="thisWeek"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-cyan" />
                  <span className="text-muted-foreground">This Week ({formatMinutes(thisWeekTotal)})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-muted-foreground/50" />
                  <span className="text-muted-foreground">Last Week ({formatMinutes(lastWeekTotal)})</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Score Comparison Chart */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="w-5 h-5 text-purple" />
                Quiz Score Comparison
              </CardTitle>
              <CardDescription>This week vs last week (average score %)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={quizScoreComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      formatter={(value: number, name: string) => [
                        `${value}%`, 
                        name === 'thisWeek' ? 'This Week' : 'Last Week'
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="lastWeek" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: 'hsl(var(--muted-foreground))', strokeWidth: 0, r: 3 }}
                      name="lastWeek"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="thisWeek" 
                      stroke="hsl(var(--purple))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--purple))', strokeWidth: 0, r: 4 }}
                      activeDot={{ r: 6 }}
                      name="thisWeek"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-purple" />
                  <span className="text-muted-foreground">This Week</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-0.5 bg-muted-foreground/50 border-dashed" style={{ borderStyle: 'dashed', borderWidth: '1px' }} />
                  <span className="text-muted-foreground">Last Week</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Period Toggle */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Trend Charts</h2>
          <ToggleGroup 
            type="single" 
            value={timePeriod} 
            onValueChange={(value) => value && setTimePeriod(value as TimePeriod)}
            className="bg-muted/50 rounded-lg p-1"
          >
            <ToggleGroupItem value="7" className="px-3 py-1.5 text-sm data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
              7 Days
            </ToggleGroupItem>
            <ToggleGroupItem value="14" className="px-3 py-1.5 text-sm data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
              14 Days
            </ToggleGroupItem>
            <ToggleGroupItem value="30" className="px-3 py-1.5 text-sm data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
              30 Days
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Study Time Chart */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5 text-cyan" />
                Study Time ({periodLabels[timePeriod]})
              </CardTitle>
              <CardDescription>Minutes spent learning each day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeData}>
                    <defs>
                      <linearGradient id="timeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--cyan))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--cyan))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="label" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      formatter={(value: number) => [`${value} min`, 'Study Time']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="minutes" 
                      stroke="hsl(var(--cyan))" 
                      fill="url(#timeGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Topics Completed Chart */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="w-5 h-5 text-purple" />
                Topics Completed ({periodLabels[timePeriod]})
              </CardTitle>
              <CardDescription>Number of topics completed each day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topicsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="label" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      formatter={(value: number) => [value, 'Topics']}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="hsl(var(--purple))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Performance Chart */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Brain className="w-5 h-5 text-green-500" />
                Quiz Performance ({periodLabels[timePeriod]})
              </CardTitle>
              <CardDescription>Average quiz score percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={quizData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="label" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      formatter={(value: number, name: string) => {
                        if (name === 'avgScore') return [`${value}%`, 'Avg Score'];
                        return [value, 'Quizzes'];
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="avgScore" 
                      stroke="hsl(142, 76%, 36%)" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(142, 76%, 36%)', strokeWidth: 0, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Achievements & Recent Activity */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="w-5 h-5 text-yellow-500" />
                Progress Overview
              </CardTitle>
              <CardDescription>Achievements and recent activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Achievements Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Achievements Unlocked</span>
                  <span className="text-sm font-medium">{unlockedCount} / {totalAchievements}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500"
                    style={{ width: `${(unlockedCount / totalAchievements) * 100}%` }}
                  />
                </div>
              </div>

              {/* Streak Info */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-500" />
                  <span className="text-sm">Longest Streak</span>
                </div>
                <span className="font-bold text-foreground">{streak.longestStreak} days</span>
              </div>

              {/* Recent Quizzes */}
              {recentQuizzes.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-3">Recent Quizzes</h4>
                  <div className="space-y-2">
                    {recentQuizzes.slice(0, 3).map((quiz) => (
                      <div 
                        key={quiz.id} 
                        className="flex items-center justify-between p-2 rounded-lg bg-muted/20"
                      >
                        <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                          {quiz.topicId}
                        </span>
                        <span className={`text-sm font-medium ${
                          quiz.score && quiz.total && (quiz.score / quiz.total) >= 0.7 
                            ? 'text-green-500' 
                            : 'text-orange-500'
                        }`}>
                          {quiz.score}/{quiz.total}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {recentQuizzes.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Complete quizzes to see your recent activity here
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Today's Summary */}
        <Card className="bg-gradient-to-br from-primary/10 to-purple/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Today's Progress</h3>
                <p className="text-muted-foreground text-sm">
                  You've studied for <span className="font-medium text-foreground">{formatMinutes(getTodayMinutes())}</span> today
                </p>
              </div>
              <Link to="/">
                <Button className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  Continue Learning
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StatsPage;
