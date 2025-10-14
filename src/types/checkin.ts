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
  // Работа / продуктивность
  { id: 'work-productive', label: 'Продуктивный день', emoji: '🚀', category: 'productive', focuses: ['work'] },
  { id: 'work-normal', label: 'Обычный рабочий день', emoji: '💼', category: 'productive', focuses: ['work'] },
  { id: 'work-hard', label: 'Тяжелый рабочий день', emoji: '😮‍💨', category: 'productive', focuses: ['work'] },
  { id: 'work-meetings', label: 'Много встреч', emoji: '📞', category: 'productive', focuses: ['work'] },
  { id: 'work-focus', label: 'Фокусная работа', emoji: '🎯', category: 'productive', focuses: ['work'] },
  
  // Развитие / обучение
  { id: 'study-book', label: 'Читал книгу', emoji: '📚', category: 'growth', focuses: ['growth'] },
  { id: 'study-course', label: 'Смотрел курс', emoji: '🎓', category: 'growth', focuses: ['growth'] },
  { id: 'study-practice', label: 'Практиковал навык', emoji: '💪', category: 'growth', focuses: ['growth'] },
  { id: 'study-new', label: 'Изучал новое', emoji: '🌱', category: 'growth', focuses: ['growth'] },
  
  // Энергия и физическое состояние
  { id: 'energy-high', label: 'Много энергии', emoji: '⚡', category: 'health', focuses: ['energy'] },
  { id: 'energy-medium', label: 'Средняя энергия', emoji: '🔋', category: 'health', focuses: ['energy'] },
  { id: 'energy-low', label: 'Мало энергии', emoji: '🪫', category: 'health', focuses: ['energy'] },
  { id: 'workout', label: 'Тренировка', emoji: '🏃', category: 'health', focuses: ['energy', 'balance'] },
  { id: 'walk', label: 'Прогулка', emoji: '🚶', category: 'health', focuses: ['energy', 'calm', 'balance'] },
  { id: 'stretch', label: 'Растяжка', emoji: '🧘‍♀️', category: 'health', focuses: ['energy'] },
  
  // Сон и отдых
  { id: 'sleep-good', label: 'Спал хорошо', emoji: '😴', category: 'health', focuses: ['sleep'] },
  { id: 'sleep-bad', label: 'Спал плохо', emoji: '😵', category: 'health', focuses: ['sleep'] },
  { id: 'sleep-lack', label: 'Недосып', emoji: '🥱', category: 'health', focuses: ['sleep', 'energy'] },
  { id: 'sleep-enough', label: 'Выспался', emoji: '😊', category: 'health', focuses: ['sleep', 'energy'] },
  { id: 'rest-day', label: 'День отдыха', emoji: '🛋️', category: 'health', focuses: ['sleep', 'balance'] },
  
  // Вода и питание
  { id: 'water-little', label: 'Пил воду иногда', emoji: '💧', category: 'health', focuses: ['nutrition'] },
  { id: 'water-often', label: 'Пил воду часто', emoji: '💦', category: 'health', focuses: ['nutrition'] },
  { id: 'water-goal', label: 'Выполнил норму воды', emoji: '✅', category: 'health', focuses: ['nutrition'] },
  { id: 'food-healthy', label: 'Ел здоровую еду', emoji: '🥗', category: 'health', focuses: ['nutrition'] },
  { id: 'food-home', label: 'Ел домашнюю еду', emoji: '🍳', category: 'health', focuses: ['nutrition'] },
  { id: 'food-delivery', label: 'Заказывал доставку', emoji: '🛵', category: 'health', focuses: ['nutrition'] },
  { id: 'food-fastfood', label: 'Ел фастфуд', emoji: '🍔', category: 'health', focuses: ['nutrition'] },
  { id: 'food-no-sweet', label: 'Без сладкого', emoji: '🚫🍰', category: 'health', focuses: ['nutrition'] },
  { id: 'food-no-soda', label: 'Без газировки', emoji: '🚫🥤', category: 'health', focuses: ['nutrition'] },
  
  // Спокойствие / стресс
  { id: 'calm-yes', label: 'Был спокоен', emoji: '😌', category: 'feeling', focuses: ['calm', 'mood'] },
  { id: 'stress-little', label: 'Немного стресса', emoji: '😰', category: 'feeling', focuses: ['calm', 'mood'] },
  { id: 'stress-much', label: 'Сильный стресс', emoji: '😤', category: 'feeling', focuses: ['calm', 'mood'] },
  { id: 'meditation', label: 'Медитировал', emoji: '🧘', category: 'health', focuses: ['calm', 'balance'] },
  { id: 'breathing', label: 'Дыхательные практики', emoji: '🌬️', category: 'health', focuses: ['calm'] },
  
  // Общение и отношения
  { id: 'friends', label: 'Встречался с друзьями', emoji: '👥', category: 'social', focuses: ['social', 'mood'] },
  { id: 'family', label: 'Время с семьей', emoji: '👨‍👩‍👧', category: 'social', focuses: ['social', 'mood'] },
  { id: 'romance', label: 'Романтическое свидание', emoji: '💕', category: 'social', focuses: ['social', 'mood'] },
  { id: 'videocall', label: 'Видеозвонок', emoji: '📹', category: 'social', focuses: ['social'] },
  { id: 'chat', label: 'Переписка', emoji: '💬', category: 'social', focuses: ['social'] },
  
  // Благодарность / позитив
  { id: 'gratitude-practice', label: 'Практика благодарности', emoji: '🙏', category: 'feeling', focuses: ['gratitude', 'mood'] },
  { id: 'positive-thoughts', label: 'Позитивные мысли', emoji: '✨', category: 'feeling', focuses: ['gratitude', 'mood'] },
  { id: 'gratitude-journal', label: 'Записал благодарность', emoji: '📝', category: 'feeling', focuses: ['gratitude'] },
  
  // Хобби и вдохновение
  { id: 'hobby-creative', label: 'Творчество', emoji: '🎨', category: 'leisure', focuses: ['hobby', 'mood'] },
  { id: 'hobby-music', label: 'Музыка', emoji: '🎵', category: 'leisure', focuses: ['hobby', 'mood'] },
  { id: 'hobby-draw', label: 'Рисование', emoji: '🖌️', category: 'leisure', focuses: ['hobby'] },
  { id: 'hobby-write', label: 'Писательство', emoji: '✍️', category: 'leisure', focuses: ['hobby'] },
  { id: 'hobby-other', label: 'Другое хобби', emoji: '🌟', category: 'leisure', focuses: ['hobby'] },
  { id: 'movie', label: 'Фильм или сериал', emoji: '🎬', category: 'leisure', focuses: ['hobby', 'balance'] },
  { id: 'nature', label: 'Время на природе', emoji: '🌿', category: 'leisure', focuses: ['calm', 'mood'] },
  
  // Баланс дня
  { id: 'balance-good', label: 'Сбалансированный день', emoji: '⚖️', category: 'balance', focuses: ['balance'] },
  { id: 'balance-work', label: 'Много работы', emoji: '💼', category: 'balance', focuses: ['balance', 'work'] },
  { id: 'balance-rest', label: 'Много отдыха', emoji: '🌴', category: 'balance', focuses: ['balance'] },
  { id: 'cleaning', label: 'Уборка', emoji: '🧹', category: 'chores', focuses: ['balance'] },
  { id: 'cooking', label: 'Готовка', emoji: '🍳', category: 'chores', focuses: ['nutrition', 'balance'] },
  
  // Финансы / траты
  { id: 'finance-track', label: 'Отслеживал траты', emoji: '📊', category: 'finance', focuses: ['finance'] },
  { id: 'finance-shopping', label: 'Сделал покупки', emoji: '🛒', category: 'finance', focuses: ['finance'] },
  { id: 'finance-save', label: 'Сэкономил', emoji: '💰', category: 'finance', focuses: ['finance'] },
  { id: 'finance-spend', label: 'Потратил больше обычного', emoji: '💸', category: 'finance', focuses: ['finance'] },
  
  // Настроение и эмоции (общие)
  { id: 'mood-happy', label: 'Радость', emoji: '😊', category: 'feeling', focuses: ['mood'] },
  { id: 'mood-inspired', label: 'Вдохновение', emoji: '✨', category: 'feeling', focuses: ['mood', 'hobby'] },
  { id: 'mood-tired', label: 'Усталость', emoji: '😴', category: 'feeling', focuses: ['mood', 'energy'] },
  { id: 'mood-anxious', label: 'Тревога', emoji: '😰', category: 'feeling', focuses: ['mood', 'calm'] }
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
