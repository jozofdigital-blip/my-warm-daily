import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FOCUS_OPTIONS } from '@/types/checkin';
import { cn } from '@/lib/utils';

interface FocusSelectionProps {
  name: string;
  onNext: (focuses: string[]) => void;
}

export const FocusSelection = ({ name, onNext }: FocusSelectionProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleFocus = (id: string) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : prev.length < 5
        ? [...prev, id]
        : prev
    );
  };

  const handleSubmit = () => {
    if (selected.length >= 3) {
      onNext(selected);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-2xl animate-fade-in">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <div className="text-5xl">🌿</div>
            <h1 className="text-2xl font-semibold text-foreground">
              Отлично, {name}!
            </h1>
            <p className="text-muted-foreground">
              Что для тебя сейчас важно отслеживать?
            </p>
            <p className="text-sm text-muted-foreground">
              Выбери от 3 до 5 пунктов
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FOCUS_OPTIONS.map(option => (
              <button
                key={option.id}
                onClick={() => toggleFocus(option.id)}
                className={cn(
                  "p-4 rounded-xl border-2 text-left transition-all",
                  "hover:shadow-md hover:scale-[1.02]",
                  selected.includes(option.id)
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleSubmit}
              size="lg"
              disabled={selected.length < 3}
              className="w-full max-w-md h-12 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
            >
              Продолжить ➜
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
