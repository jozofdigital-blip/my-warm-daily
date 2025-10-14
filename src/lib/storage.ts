import { UserData, CheckIn } from '@/types/checkin';

const STORAGE_KEY = 'dailyCheckin_userData';

export const loadUserData = (): UserData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveUserData = (data: UserData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save user data:', error);
  }
};

export const addCheckIn = (checkIn: CheckIn): void => {
  const userData = loadUserData();
  if (userData) {
    const existingIndex = userData.checkIns.findIndex(c => c.date === checkIn.date);
    if (existingIndex >= 0) {
      userData.checkIns[existingIndex] = checkIn;
    } else {
      userData.checkIns.push(checkIn);
    }
    saveUserData(userData);
  }
};

export const resetUserData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
