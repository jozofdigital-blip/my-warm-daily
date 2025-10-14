import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { loadUserData, saveUserData, resetUserData } from '@/lib/storage';

interface SettingsProps {
  onBack: () => void;
  onReset: () => void;
}

export const Settings = ({ onBack, onReset }: SettingsProps) => {
  const userData = loadUserData();
  const [name, setName] = useState(userData?.name || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (userData && name.trim()) {
      saveUserData({ ...userData, name: name.trim() });
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
            <div className="flex gap-3">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSave} disabled={!name.trim()}>
                {saved ? '✓ Сохранено' : 'Сохранить'}
              </Button>
            </div>
          </div>

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
