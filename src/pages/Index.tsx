import { useState, useEffect } from 'react';
import { loadUserData, saveUserData } from '@/lib/storage';
import { Welcome } from '@/components/onboarding/Welcome';
import { FocusSelection } from '@/components/onboarding/FocusSelection';
import { Confirmation } from '@/components/onboarding/Confirmation';
import { DailyCheckIn } from '@/components/checkin/DailyCheckIn';
import { History } from '@/components/history/History';
import { Settings } from '@/components/settings/Settings';
import { Button } from '@/components/ui/button';

type Screen = 'welcome' | 'focus' | 'confirm' | 'home' | 'checkin' | 'history' | 'settings';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [tempName, setTempName] = useState('');
  const [tempFocuses, setTempFocuses] = useState<string[]>([]);

  useEffect(() => {
    const userData = loadUserData();
    if (userData) {
      setScreen('home');
    }
  }, []);

  const handleWelcomeNext = (name: string) => {
    setTempName(name);
    setScreen('focus');
  };

  const handleFocusNext = (focuses: string[]) => {
    setTempFocuses(focuses);
    setScreen('confirm');
  };

  const handleConfirmStart = () => {
    saveUserData({
      name: tempName,
      focuses: tempFocuses,
      checkIns: []
    });
    setScreen('home');
  };

  const handleReset = () => {
    setScreen('welcome');
    setTempName('');
    setTempFocuses([]);
  };

  const userData = loadUserData();

  if (screen === 'welcome') {
    return <Welcome onNext={handleWelcomeNext} />;
  }

  if (screen === 'focus') {
    return <FocusSelection name={tempName} onNext={handleFocusNext} />;
  }

  if (screen === 'confirm') {
    return <Confirmation name={tempName} onStart={handleConfirmStart} />;
  }

  if (screen === 'checkin') {
    return (
      <DailyCheckIn
        name={userData?.name || ''}
        onComplete={() => setScreen('home')}
        onViewHistory={() => setScreen('history')}
      />
    );
  }

  if (screen === 'history') {
    return <History onBack={() => setScreen('home')} />;
  }

  if (screen === 'settings') {
    return <Settings onBack={() => setScreen('home')} onReset={handleReset} />;
  }

  // Home screen
  const todayCheckIn = userData?.checkIns.find(
    c => c.date === new Date().toISOString().split('T')[0]
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-float">🌞</div>
          <h1 className="text-3xl font-semibold text-foreground">
            Привет, {userData?.name}!
          </h1>
          <p className="text-muted-foreground">
            {todayCheckIn
              ? 'Ты уже отметил сегодняшний день ✓'
              : 'Как прошёл твой день?'}
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => setScreen('checkin')}
            size="lg"
            className="w-full h-14 text-lg bg-primary hover:bg-primary/90 shadow-lg"
          >
            {todayCheckIn ? '✏️ Редактировать день' : '✨ Сделать чек-ин'}
          </Button>

          <Button
            onClick={() => setScreen('history')}
            size="lg"
            variant="outline"
            className="w-full h-14 text-lg"
          >
            📆 История
          </Button>

          <Button
            onClick={() => setScreen('settings')}
            size="lg"
            variant="ghost"
            className="w-full h-14 text-lg"
          >
            ⚙️ Настройки
          </Button>
        </div>

        {userData && userData.checkIns.length > 0 && (
          <div className="text-center text-sm text-muted-foreground pt-4">
            🔥 {userData.checkIns.length} {userData.checkIns.length === 1 ? 'день' : 'дней'} отслеживания
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
