import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MOOD_LABELS, ACTIVITIES, POSITIVE_MESSAGES, CheckIn, Mood, FOCUS_OPTIONS } from '@/types/checkin';
import { cn } from '@/lib/utils';
import { addCheckIn, loadUserData } from '@/lib/storage';
import { X } from 'lucide-react';

interface DailyCheckInProps {
  name: string;
  onComplete: () => void;
  onViewHistory: () => void;
}

export const DailyCheckIn = ({ name, onComplete, onViewHistory }: DailyCheckInProps) => {
  const [step, setStep] = useState<'mood' | 'activities' | 'note' | 'saved'>('mood');
  const [mood, setMood] = useState<Mood | null>(null);
  const [activities, setActivities] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');

  // Группируем активности по выбранным фокусам пользователя
  const groupedActivities = useMemo(() => {
    const userData = loadUserData();
    if (!userData || !userData.focuses.length) return [];
    
    return userData.focuses.map(focusId => {
      const focus = FOCUS_OPTIONS.find(f => f.id === focusId);
      const focusActivities = ACTIVITIES.filter(activity => 
        activity.focuses.includes(focusId)
      );
      return {
        focus,
        activities: focusActivities
      };
    }).filter(group => group.activities.length > 0);
  }, []);

  const toggleActivity = (id: string) => {
    setActivities(prev =>
      prev.includes(id)
        ? prev.filter(a => a !== id)
        : [...prev, id]
    );
  };

  const handleSave = () => {
    if (mood) {
      const checkIn: CheckIn = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        mood,
        activities,
        note: note.trim() || undefined
      };
      
      addCheckIn(checkIn);
      setMessage(POSITIVE_MESSAGES[Math.floor(Math.random() * POSITIVE_MESSAGES.length)]);
      setStep('saved');
    }
  };

  if (step === 'saved') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-background to-muted/30">
        <div className="w-full max-w-md animate-scale-in">
          <div className="text-center space-y-8">
            <div className="text-6xl animate-float">✨</div>
            
            <div className="space-y-4 bg-card p-8 rounded-2xl shadow-lg">
              <div className="text-5xl">{MOOD_LABELS[mood!].emoji}</div>
              <p className="text-lg text-foreground leading-relaxed px-4">
                {message}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={onViewHistory}
                size="lg"
                variant="outline"
                className="w-full h-12"
              >
                Посмотреть историю
              </Button>
              <Button
                onClick={onComplete}
                size="lg"
                variant="ghost"
                className="w-full h-12"
              >
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-2xl animate-fade-in relative">
        {step === 'mood' && (
          <button
            onClick={onComplete}
            className="absolute top-0 right-0 p-2 rounded-full hover:bg-muted/50 transition-colors z-10"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
        
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <div className="text-5xl">🌞</div>
            <h1 className="text-2xl font-semibold text-foreground">
              Как проходит твой день, {name}?
            </h1>
          </div>

          {step === 'mood' && (
            <div className="space-y-6">
              <p className="text-center text-muted-foreground">
                Выбери настроение
              </p>
              <div className="flex justify-center items-end gap-4">
                {(Object.entries(MOOD_LABELS) as [string, typeof MOOD_LABELS[Mood]][]).map(([value, { emoji, label }]) => (
                  <button
                    key={value}
                    onClick={() => setMood(Number(value) as Mood)}
                    className={cn(
                      "flex flex-col items-center gap-2 transition-all duration-300",
                      "hover:scale-110",
                      mood === Number(value)
                        ? "scale-125"
                        : "scale-100"
                    )}
                  >
                    <span className="text-5xl">{emoji}</span>
                    <span className="text-xs text-center text-muted-foreground">{label}</span>
                  </button>
                ))}
              </div>
              <Button
                onClick={() => setStep('activities')}
                disabled={!mood}
                size="lg"
                className="w-full h-12 bg-primary hover:bg-primary/90"
              >
                Далее ➜
              </Button>
            </div>
          )}

          {step === 'activities' && (
            <div className="space-y-6">
              <p className="text-center text-muted-foreground">
                Что было сегодня?
              </p>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {groupedActivities.map(({ focus, activities: focusActivities }) => (
                  <div key={focus!.id} className="space-y-3">
                    <div className="flex items-center gap-2 text-foreground/80 font-medium">
                      <span className="text-xl">{focus!.emoji}</span>
                      <span className="text-sm">{focus!.label}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pl-2">
                      {focusActivities.map(activity => (
                        <button
                          key={activity.id}
                          onClick={() => toggleActivity(activity.id)}
                          className={cn(
                            "flex items-center gap-2 p-2.5 rounded-lg border-2 transition-all text-left",
                            "hover:shadow-md hover:scale-[1.02]",
                            activities.includes(activity.id)
                              ? "border-primary bg-primary/5 shadow-md"
                              : "border-border bg-card hover:border-primary/50"
                          )}
                        >
                          <span className="text-base">{activity.emoji}</span>
                          <span className="text-xs leading-tight">{activity.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setStep('mood')}
                  size="lg"
                  variant="outline"
                  className="flex-1 h-12"
                >
                  ← Назад
                </Button>
                <Button
                  onClick={() => setStep('note')}
                  size="lg"
                  className="flex-1 h-12 bg-primary hover:bg-primary/90"
                >
                  Далее ➜
                </Button>
              </div>
            </div>
          )}

          {step === 'note' && (
            <div className="space-y-6">
              <p className="text-center text-muted-foreground">
                Хочешь добавить пару слов о дне?
              </p>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Необязательно, но если хочешь..."
                className="min-h-[120px] resize-none bg-card"
              />
              <div className="flex gap-3">
                <Button
                  onClick={() => setStep('activities')}
                  size="lg"
                  variant="outline"
                  className="flex-1 h-12"
                >
                  ← Назад
                </Button>
                <Button
                  onClick={handleSave}
                  size="lg"
                  className="flex-1 h-12 bg-primary hover:bg-primary/90"
                >
                  ✅ Сохранить день
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
