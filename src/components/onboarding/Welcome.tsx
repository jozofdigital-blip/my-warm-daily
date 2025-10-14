import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WelcomeProps {
  onNext: (name: string) => void;
}

export const Welcome = ({ onNext }: WelcomeProps) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNext(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center space-y-6">
          <div className="text-6xl animate-float">👋</div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-foreground">
              Привет!
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Я помогу тебе замечать, как проходят твои дни.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm text-muted-foreground">
                Как тебя зовут?
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Твоё имя"
                className="text-center text-lg h-12 bg-card shadow-sm"
                autoFocus
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={!name.trim()}
              className="w-full h-12 text-base bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
            >
              Продолжить ➜
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
