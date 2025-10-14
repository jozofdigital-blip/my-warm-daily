import { Button } from '@/components/ui/button';

interface ConfirmationProps {
  name: string;
  onStart: () => void;
}

export const Confirmation = ({ name, onStart }: ConfirmationProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center space-y-8">
          <div className="text-6xl animate-float">🧘</div>
          
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-foreground">
              Отлично, {name}!
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed px-4">
              Мы будем помогать тебе замечать настроение, энергию и моменты, которые делают дни лучше.
            </p>
            <p className="text-xl">
              Готов начать? 🌞
            </p>
          </div>

          <Button
            onClick={onStart}
            size="lg"
            className="w-full h-14 text-lg bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
          >
            Начать ➜
          </Button>
        </div>
      </div>
    </div>
  );
};
