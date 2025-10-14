import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { loadUserData, saveUserData, resetUserData } from '@/lib/storage';
import { FOCUS_OPTIONS } from '@/types/checkin';
import { cn } from '@/lib/utils';

interface SettingsProps {
  onBack: () => void;
  onReset: () => void;
}

export const Settings = ({ onBack, onReset }: SettingsProps) => {
  const userData = loadUserData();
  const [name, setName] = useState(userData?.name || '');
  const [focuses, setFocuses] = useState<string[]>(userData?.focuses || []);
  const [saved, setSaved] = useState(false);

  const toggleFocus = (id: string) => {
    setFocuses(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : prev.length < 5
        ? [...prev, id]
        : prev
    );
  };

  const handleSave = () => {
    if (userData && name.trim() && focuses.length >= 3) {
      saveUserData({ ...userData, name: name.trim(), focuses });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleReset = () => {
    if (confirm('Вы уверены? Все данные будут удалены.')) {
      resetUserData();
      onReset();
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-foreground">⚙️ Настройки</h1>
          <Button onClick={onBack} variant="outline">
            ← Назад
          </Button>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Твоё имя</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Твоё имя"
              className="bg-card"
            />
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Что отслеживаешь</h3>
            <p className="text-sm text-muted-foreground">Выбери от 3 до 5 пунктов</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {FOCUS_OPTIONS.map(option => (
                <button
                  key={option.id}
                  onClick={() => toggleFocus(option.id)}
                  className={cn(
                    "p-3 rounded-lg border-2 text-left transition-all text-sm",
                    "hover:shadow-md",
                    focuses.includes(option.id)
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{option.emoji}</span>
                    <span className="text-xs font-medium">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleSave}
            disabled={!name.trim() || focuses.length < 3}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {saved ? '✓ Сохранено' : 'Сохранить изменения'}
          </Button>

          <div className="pt-6 border-t border-border">
            <div className="space-y-3">
              <p className="text-sm font-medium">Режим работы</p>
              <p className="text-sm text-muted-foreground">
                Сейчас: Гостевой режим (данные сохраняются локально в браузере)
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <Button
              onClick={handleReset}
              variant="destructive"
              className="w-full"
            >
              Сбросить все данные
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-muted/30">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>💾 Всего чек-инов: {userData?.checkIns.length || 0}</p>
            <p>🎯 Отслеживаемых фокусов: {userData?.focuses.length || 0}</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
