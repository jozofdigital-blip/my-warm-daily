export type Mood = 1 | 2 | 3 | 4 | 5;

export interface Activity {
  id: string;
  label: string;
  emoji: string;
  category: string;
}

export interface CheckIn {
  id: string;
  date: string;
  mood: Mood;
  activities: string[];
  note?: string;
}

export interface UserData {
  name: string;
  focuses: string[];
  checkIns: CheckIn[];
}

export const FOCUS_OPTIONS = [
  { id: 'mood', label: 'Настроение и эмоции', emoji: '🌈' },
  { id: 'calm', label: 'Спокойствие / стресс', emoji: '🧘' },
  { id: 'energy', label: 'Энергия и физическое состояние', emoji: '⚡' },
  { id: 'sleep', label: 'Сон и отдых', emoji: '😴' },
  { id: 'nutrition', label: 'Вода и питание', emoji: '🥗' },
  { id: 'work', label: 'Работа / продуктивность', emoji: '💼' },
  { id: 'social', label: 'Общение и отношения', emoji: '💬' },
  { id: 'gratitude', label: 'Благодарность / позитив', emoji: '🙏' },
  { id: 'growth', label: 'Развитие / обучение', emoji: '📚' },
  { id: 'hobby', label: 'Хобби и вдохновение', emoji: '🎨' },
  { id: 'balance', label: 'Баланс дня', emoji: '⚖️' },
  { id: 'finance', label: 'Финансы / траты', emoji: '💰' }
];

export const ACTIVITIES: Activity[] = [
  { id: 'work', label: 'Работа', emoji: '💼', category: 'productive' },
  { id: 'study', label: 'Учёба', emoji: '📚', category: 'productive' },
  { id: 'self-dev', label: 'Саморазвитие', emoji: '🌱', category: 'productive' },
  { id: 'walk', label: 'Прогулка', emoji: '🚶', category: 'health' },
  { id: 'workout', label: 'Тренировка', emoji: '🏃', category: 'health' },
  { id: 'meditation', label: 'Медитация', emoji: '🧘', category: 'health' },
  { id: 'sleep', label: 'Сон', emoji: '😴', category: 'health' },
  { id: 'friends', label: 'Друзья', emoji: '👥', category: 'social' },
  { id: 'family', label: 'Семья', emoji: '👨‍👩‍👧', category: 'social' },
  { id: 'romance', label: 'Романтика', emoji: '💕', category: 'social' },
  { id: 'music', label: 'Музыка', emoji: '🎵', category: 'leisure' },
  { id: 'movie', label: 'Фильм', emoji: '🎬', category: 'leisure' },
  { id: 'hobby', label: 'Хобби', emoji: '🎨', category: 'leisure' },
  { id: 'nature', label: 'Природа', emoji: '🌿', category: 'leisure' },
  { id: 'cleaning', label: 'Уборка', emoji: '🧹', category: 'chores' },
  { id: 'cooking', label: 'Готовка', emoji: '🍳', category: 'chores' },
  { id: 'shopping', label: 'Покупки', emoji: '🛒', category: 'chores' },
  { id: 'stress', label: 'Стресс', emoji: '😤', category: 'feeling' },
  { id: 'calm', label: 'Спокойствие', emoji: '😌', category: 'feeling' },
  { id: 'gratitude', label: 'Благодарность', emoji: '🙏', category: 'feeling' },
  { id: 'inspiration', label: 'Вдохновение', emoji: '✨', category: 'feeling' }
];

export const MOOD_LABELS = {
  1: { emoji: '😞', label: 'Тяжело' },
  2: { emoji: '😐', label: 'Так себе' },
  3: { emoji: '🙂', label: 'Нормально' },
  4: { emoji: '😃', label: 'Хорошо' },
  5: { emoji: '🤩', label: 'Отлично' }
};

export const POSITIVE_MESSAGES = [
  "Ты сделал сегодня больше, чем думаешь 🌿",
  "Главное — быть, а не бежать 💚",
  "Хороший день начинается с одного выдоха",
  "Каждый шаг важен, даже самый маленький 🌸",
  "Ты молодец, что замечаешь свои дни ✨",
  "Продолжай слушать себя 💫",
  "Сегодня был твой день, и ты справился 🌈",
  "Ты видишь свои дни — это уже сила 🌟",
  "Спасибо, что заботишься о себе 💛",
  "Каждый день — это новая страница 📖",
  "Ты растёшь даже когда не замечаешь этого 🌱",
  "Важно не то, что случилось, а то, что ты здесь 🌸",
  "Ты делаешь это для себя, и это прекрасно ✨",
  "Маленькие шаги создают большие изменения 🦋",
  "Твои чувства важны, все до одного 💙",
  "Сегодня ты был собой, и это достаточно 🌿",
  "Ты учишься слушать себя каждый день 🎧",
  "Твоя жизнь заслуживает внимания 🌞",
  "Ты не один в этом пути 🤝"
];
