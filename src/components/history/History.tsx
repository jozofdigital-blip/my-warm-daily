import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { loadUserData } from '@/lib/storage';
import { MOOD_LABELS, ACTIVITIES } from '@/types/checkin';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HistoryProps {
  onBack: () => void;
}

export const History = ({ onBack }: HistoryProps) => {
  const userData = loadUserData();
  const checkIns = userData?.checkIns || [];
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [period, setPeriod] = useState<'week' | 'month' | 'all'>('week');

  const selectedCheckIn = checkIns.find(c => c.date === selectedDate);

  // Calculate stats based on period
  const periodCheckIns = useMemo(() => {
    if (period === 'week') return checkIns.slice(-7);
    if (period === 'month') return checkIns.slice(-30);
    return checkIns;
  }, [checkIns, period]);

  const avgMood = periodCheckIns.length > 0
    ? (periodCheckIns.reduce((sum, c) => sum + c.mood, 0) / periodCheckIns.length).toFixed(1)
    : '0';

  // Activity impact (simplified) - based on selected period
  const activityImpact = new Map<string, { total: number; count: number }>();
  periodCheckIns.forEach(checkIn => {
    checkIn.activities.forEach(actId => {
      const current = activityImpact.get(actId) || { total: 0, count: 0 };
      activityImpact.set(actId, {
        total: current.total + checkIn.mood,
        count: current.count + 1
      });
    });
  });

  const topActivities = Array.from(activityImpact.entries())
    .map(([id, { total, count }]) => ({
      id,
      avg: total / count,
      activity: ACTIVITIES.find(a => a.id === id)
    }))
    .filter(a => a.activity)
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 6);

  const achievements = [];
  if (checkIns.length >= 5) achievements.push({ emoji: '🔥', text: `${checkIns.length} дней подряд отмечаешь настроение!` });
  if (checkIns.filter(c => c.mood >= 4).length >= 7) achievements.push({ emoji: '🪷', text: 'Неделя хорошего настроения!' });
  if (checkIns.length >= 10) achievements.push({ emoji: '⭐', text: '10 чек-инов подряд!' });

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-foreground flex items-center gap-2">
              Мои дни 🌈
            </h1>
            <p className="text-muted-foreground mt-1">
              Смотри, как менялось настроение
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setPeriod('week')} 
              variant={period === 'week' ? 'default' : 'outline'}
              size="sm"
            >
              Неделя
            </Button>
            <Button 
              onClick={() => setPeriod('month')} 
              variant={period === 'month' ? 'default' : 'outline'}
              size="sm"
            >
              Месяц
            </Button>
            <Button 
              onClick={() => setPeriod('all')} 
              variant={period === 'all' ? 'default' : 'outline'}
              size="sm"
            >
              Всё время
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Календарь настроения
          </h2>
          <div className="grid grid-cols-7 gap-2">
            {checkIns.slice(-28).map(checkIn => {
              const date = new Date(checkIn.date);
              const day = date.getDate();
              return (
                <button
                  key={checkIn.id}
                  onClick={() => setSelectedDate(selectedDate === checkIn.date ? null : checkIn.date)}
                  className={cn(
                    "aspect-square rounded-lg flex flex-col items-center justify-center transition-all hover:scale-110 hover:shadow-md",
                    selectedDate === checkIn.date ? 'ring-2 ring-primary bg-primary/5' : ''
                  )}
                >
                  <span className="text-2xl">{MOOD_LABELS[checkIn.mood].emoji}</span>
                  <span className="text-xs text-muted-foreground font-medium mt-0.5">{day}</span>
                </button>
              );
            })}
          </div>
          
          {selectedCheckIn && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{MOOD_LABELS[selectedCheckIn.mood].emoji}</span>
                <div>
                  <p className="font-semibold">{new Date(selectedCheckIn.date).toLocaleDateString('ru-RU')}</p>
                  <p className="text-sm text-muted-foreground">{MOOD_LABELS[selectedCheckIn.mood].label}</p>
                </div>
              </div>
              
              {selectedCheckIn.activities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedCheckIn.activities.map(actId => {
                    const activity = ACTIVITIES.find(a => a.id === actId);
                    return activity ? (
                      <span key={actId} className="px-3 py-1 bg-background rounded-full text-sm">
                        {activity.emoji} {activity.label}
                      </span>
                    ) : null;
                  })}
                </div>
              )}
              
              {selectedCheckIn.note && (
                <p className="text-sm italic text-muted-foreground border-l-2 border-primary pl-3">
                  {selectedCheckIn.note}
                </p>
              )}
            </div>
          )}
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Среднее настроение</h2>
            <div className="text-center space-y-2">
              <div className="text-5xl animate-bounce">{MOOD_LABELS[Math.round(Number(avgMood)) as 1 | 2 | 3 | 4 | 5].emoji}</div>
              <div className="text-3xl font-bold text-primary">{avgMood} / 5</div>
              <p className="text-sm text-muted-foreground">
                {period === 'week' ? 'за неделю' : period === 'month' ? 'за месяц' : 'за всё время'} ({periodCheckIns.length} {periodCheckIns.length === 1 ? 'день' : 'дней'})
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Что помогает 🌿</h2>
            <div className="space-y-2">
              {topActivities.slice(0, 3).map(({ activity, avg }) => (
                <div key={activity!.id} className="flex items-center justify-between">
                  <span className="text-sm">
                    {activity!.emoji} {activity!.label}
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    +{(avg - Number(avgMood)).toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Достижения 🏆</h2>
            <div className="space-y-3">
              {achievements.map((achievement, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <span className="text-3xl">{achievement.emoji}</span>
                  <span className="text-sm">{achievement.text}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Back Button */}
        <div className="flex justify-center pb-6">
          <Button onClick={onBack} variant="outline" size="lg" className="min-w-[200px]">
            ← Назад в меню
          </Button>
        </div>
      </div>
    </div>
  );
};
