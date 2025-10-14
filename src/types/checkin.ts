export type Mood = 1 | 2 | 3 | 4 | 5;

export interface Activity {
  id: string;
  label: string;
  emoji: string;
  category: string;
  focuses: string[]; // связь с фокусами
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
  { id: 'work', label: 'Работа', emoji: '💼', category: 'productive', focuses: ['work', 'energy', 'balance'] },
  { id: 'study', label: 'Учёба', emoji: '📚', category: 'productive', focuses: ['work', 'growth'] },
  { id: 'self-dev', label: 'Саморазвитие', emoji: '🌱', category: 'productive', focuses: ['growth', 'hobby'] },
  { id: 'walk', label: 'Прогулка', emoji: '🚶', category: 'health', focuses: ['energy', 'calm', 'balance'] },
  { id: 'workout', label: 'Тренировка', emoji: '🏃', category: 'health', focuses: ['energy', 'balance'] },
  { id: 'meditation', label: 'Медитация', emoji: '🧘', category: 'health', focuses: ['calm', 'balance'] },
  { id: 'sleep', label: 'Сон', emoji: '😴', category: 'health', focuses: ['sleep', 'energy'] },
  { id: 'water', label: 'Вода', emoji: '💧', category: 'health', focuses: ['nutrition', 'energy'] },
  { id: 'healthy-food', label: 'Здоровая еда', emoji: '🥗', category: 'health', focuses: ['nutrition', 'energy'] },
  { id: 'friends', label: 'Друзья', emoji: '👥', category: 'social', focuses: ['social', 'mood'] },
  { id: 'family', label: 'Семья', emoji: '👨‍👩‍👧', category: 'social', focuses: ['social', 'mood'] },
  { id: 'romance', label: 'Романтика', emoji: '💕', category: 'social', focuses: ['social', 'mood'] },
  { id: 'music', label: 'Музыка', emoji: '🎵', category: 'leisure', focuses: ['hobby', 'mood'] },
  { id: 'movie', label: 'Фильм', emoji: '🎬', category: 'leisure', focuses: ['hobby', 'balance'] },
  { id: 'hobby', label: 'Хобби', emoji: '🎨', category: 'leisure', focuses: ['hobby', 'mood'] },
  { id: 'nature', label: 'Природа', emoji: '🌿', category: 'leisure', focuses: ['calm', 'mood'] },
  { id: 'cleaning', label: 'Уборка', emoji: '🧹', category: 'chores', focuses: ['balance'] },
  { id: 'cooking', label: 'Готовка', emoji: '🍳', category: 'chores', focuses: ['nutrition', 'balance'] },
  { id: 'shopping', label: 'Покупки', emoji: '🛒', category: 'chores', focuses: ['finance', 'balance'] },
  { id: 'money-spent', label: 'Траты', emoji: '💸', category: 'chores', focuses: ['finance'] },
  { id: 'stress', label: 'Стресс', emoji: '😤', category: 'feeling', focuses: ['calm', 'mood'] },
  { id: 'calm', label: 'Спокойствие', emoji: '😌', category: 'feeling', focuses: ['calm', 'mood'] },
  { id: 'gratitude', label: 'Благодарность', emoji: '🙏', category: 'feeling', focuses: ['gratitude', 'mood'] },
  { id: 'inspiration', label: 'Вдохновение', emoji: '✨', category: 'feeling', focuses: ['hobby', 'gratitude'] }
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
