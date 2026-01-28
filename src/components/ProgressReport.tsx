import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useProgress } from '@/hooks/useProgress';
import { useStreak } from '@/hooks/useStreak';
import { useAchievements } from '@/hooks/useAchievements';
import { useStudyTime } from '@/hooks/useStudyTime';
import { useWeeklyStudyGoal } from '@/hooks/useWeeklyStudyGoal';
import { dsaCategories } from '@/data/dsaTopics';
import { FileText, Download, Share2, Twitter, Linkedin, Copy, Check, Trophy, Target, Flame, Clock, BookOpen, Brain } from 'lucide-react';
import { toast } from 'sonner';

const ProgressReport = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  
  const { getCompletedTopicsCount, getQuizzesTakenCount, getAverageScore } = useProgress();
  const { streak } = useStreak();
  const { unlockedCount, totalAchievements } = useAchievements();
  const { totalMinutes, getWeekMinutes } = useStudyTime();
  const { weeklyMinutesGoal } = useWeeklyStudyGoal();

  const completedTopics = getCompletedTopicsCount();
  const quizzesTaken = getQuizzesTakenCount();
  const averageScore = getAverageScore();
  const weekMinutes = getWeekMinutes();

  const totalTopics = dsaCategories.reduce((acc, cat) => acc + cat.topics.length, 0);
  const completionPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const formatTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const generateShareText = (): string => {
    return `🚀 My DSA Learning Progress Report!\n\n` +
      `📚 Topics Completed: ${completedTopics}/${totalTopics} (${completionPercentage}%)\n` +
      `🔥 Current Streak: ${streak.currentStreak} days\n` +
      `⏱️ Total Study Time: ${formatTime(totalMinutes)}\n` +
      `🧠 Quizzes Taken: ${quizzesTaken}\n` +
      `📊 Average Score: ${averageScore}%\n` +
      `🏆 Achievements: ${unlockedCount}/${totalAchievements}\n\n` +
      `Keep learning! 💪 #DSA #CodingJourney #LearningProgress`;
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      setCopied(true);
      toast.success('Progress copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(generateShareText());
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const text = encodeURIComponent(generateShareText());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&summary=${text}`, '_blank');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow pop-ups to print your report');
      return;
    }

    const reportHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>DSA Learning Progress Report</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
              background: #fff;
              color: #1a1a1a;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
              padding-bottom: 20px;
              border-bottom: 2px solid #e5e5e5;
            }
            .header h1 {
              font-size: 28px;
              margin-bottom: 8px;
              color: #0ea5e9;
            }
            .header p {
              color: #666;
              font-size: 14px;
            }
            .stats-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              margin-bottom: 40px;
            }
            .stat-card {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 20px;
              text-align: center;
            }
            .stat-icon {
              font-size: 32px;
              margin-bottom: 8px;
            }
            .stat-value {
              font-size: 28px;
              font-weight: 700;
              color: #0ea5e9;
              margin-bottom: 4px;
            }
            .stat-label {
              font-size: 12px;
              color: #64748b;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .section {
              margin-bottom: 30px;
            }
            .section h2 {
              font-size: 18px;
              margin-bottom: 16px;
              color: #334155;
              border-left: 4px solid #0ea5e9;
              padding-left: 12px;
            }
            .progress-bar-container {
              background: #e2e8f0;
              border-radius: 8px;
              height: 24px;
              overflow: hidden;
              position: relative;
            }
            .progress-bar {
              background: linear-gradient(90deg, #0ea5e9, #8b5cf6);
              height: 100%;
              border-radius: 8px;
              transition: width 0.3s ease;
            }
            .progress-text {
              position: absolute;
              right: 12px;
              top: 50%;
              transform: translateY(-50%);
              font-size: 12px;
              font-weight: 600;
              color: #334155;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #e5e5e5;
              color: #94a3b8;
              font-size: 12px;
            }
            @media print {
              body { padding: 20px; }
              .stat-card { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎓 DSA Learning Progress Report</h1>
            <p>Generated on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">📚</div>
              <div class="stat-value">${completedTopics}</div>
              <div class="stat-label">Topics Completed</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🔥</div>
              <div class="stat-value">${streak.currentStreak}</div>
              <div class="stat-label">Day Streak</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏱️</div>
              <div class="stat-value">${formatTime(totalMinutes)}</div>
              <div class="stat-label">Total Study Time</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🧠</div>
              <div class="stat-value">${quizzesTaken}</div>
              <div class="stat-label">Quizzes Taken</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📊</div>
              <div class="stat-value">${averageScore}%</div>
              <div class="stat-label">Average Score</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🏆</div>
              <div class="stat-value">${unlockedCount}/${totalAchievements}</div>
              <div class="stat-label">Achievements</div>
            </div>
          </div>
          
          <div class="section">
            <h2>Overall Progress</h2>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: ${completionPercentage}%"></div>
              <span class="progress-text">${completionPercentage}% Complete</span>
            </div>
          </div>
          
          <div class="section">
            <h2>Study Highlights</h2>
            <p style="margin-bottom: 8px;">• <strong>Longest Streak:</strong> ${streak.longestStreak} days</p>
            <p style="margin-bottom: 8px;">• <strong>Total Days Active:</strong> ${streak.totalDaysActive} days</p>
            <p style="margin-bottom: 8px;">• <strong>This Week:</strong> ${formatTime(weekMinutes)} studied</p>
            <p style="margin-bottom: 8px;">• <strong>Weekly Goal:</strong> ${weeklyMinutesGoal > 0 ? `${formatTime(weeklyMinutesGoal)} target` : 'Not set'}</p>
          </div>
          
          <div class="footer">
            <p>Keep up the great work! 🚀</p>
            <p style="margin-top: 8px;">Master DSA - Interactive Learning Platform</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(reportHTML);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const StatCard = ({ icon: Icon, value, label, color }: { icon: React.ElementType; value: string | number; label: string; color: string }) => (
    <div className={`flex flex-col items-center p-4 rounded-xl bg-gradient-to-br ${color} border border-border/50`}>
      <Icon className="w-6 h-6 mb-2 text-foreground" />
      <span className="text-2xl font-bold text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground text-center">{label}</span>
    </div>
  );

  return (
    <Card className="bg-card/50 border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <FileText className="w-5 h-5 text-primary" />
          Progress Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Generate a shareable summary of your learning journey.
        </p>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              View Progress Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Your Learning Progress Report
              </DialogTitle>
            </DialogHeader>
            
            <div ref={reportRef} className="space-y-6 py-4">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <StatCard 
                  icon={BookOpen} 
                  value={completedTopics} 
                  label="Topics Completed" 
                  color="from-cyan/10 to-transparent"
                />
                <StatCard 
                  icon={Flame} 
                  value={streak.currentStreak} 
                  label="Day Streak" 
                  color="from-orange-500/10 to-transparent"
                />
                <StatCard 
                  icon={Clock} 
                  value={formatTime(totalMinutes)} 
                  label="Total Study Time" 
                  color="from-purple/10 to-transparent"
                />
                <StatCard 
                  icon={Brain} 
                  value={quizzesTaken} 
                  label="Quizzes Taken" 
                  color="from-green/10 to-transparent"
                />
                <StatCard 
                  icon={Target} 
                  value={`${averageScore}%`} 
                  label="Average Score" 
                  color="from-blue-500/10 to-transparent"
                />
                <StatCard 
                  icon={Trophy} 
                  value={`${unlockedCount}/${totalAchievements}`} 
                  label="Achievements" 
                  color="from-yellow-500/10 to-transparent"
                />
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-medium text-foreground">{completionPercentage}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-purple rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  {completedTopics} of {totalTopics} topics completed
                </p>
              </div>

              {/* Highlights */}
              <div className="bg-muted/30 rounded-xl p-4 space-y-2">
                <h3 className="font-semibold text-foreground mb-3">Study Highlights</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Longest Streak:</span>
                    <span className="font-medium text-foreground">{streak.longestStreak} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Days Active:</span>
                    <span className="font-medium text-foreground">{streak.totalDaysActive}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Week:</span>
                    <span className="font-medium text-foreground">{formatTime(weekMinutes)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weekly Goal:</span>
                    <span className="font-medium text-foreground">
                      {weeklyMinutesGoal > 0 ? formatTime(weeklyMinutesGoal) : 'Not set'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="space-y-3 pt-2">
                <p className="text-sm text-muted-foreground text-center">Share your progress</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button variant="outline" size="sm" onClick={handleTwitterShare}>
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLinkedInShare}>
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                
                <div className="flex justify-center pt-2">
                  <Button onClick={handlePrint} className="bg-primary hover:bg-primary/90">
                    <Download className="w-4 h-4 mr-2" />
                    Download as PDF
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ProgressReport;
