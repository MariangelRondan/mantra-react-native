import { MeditationEntry, PeriodDay } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveItem = async (
  entry: MeditationEntry | PeriodDay,
  category: string
) => {
  try {
    const stored = await AsyncStorage.getItem(category);
    const parsed = stored ? JSON.parse(stored) : [];
    parsed.push(entry);
    await AsyncStorage.setItem(category, JSON.stringify(parsed));
  } catch (error) {
    console.error("Saving error", error);
  }
};

export const removeItem = async (
  entry: MeditationEntry | PeriodDay,
  category: string
) => {
  try {
    const stored = await AsyncStorage.getItem(category);
    const parsed = stored ? JSON.parse(stored) : [];
    const updated = parsed?.filter(
      (med: MeditationEntry) => med.id !== entry?.id
    );
    await AsyncStorage.setItem(category, JSON.stringify(updated));
  } catch (error) {
    console.error("Saving error", error);
  }
};

export const updateEntry = async (
  updatedEntry: MeditationEntry | PeriodDay,
  category: string
) => {
  try {
    const stored = await AsyncStorage.getItem(category);
    const parsed = stored ? JSON.parse(stored) : [];
    const filtered = parsed?.filter(
      (med: MeditationEntry) => med.id !== updatedEntry?.id
    );
    const updated = [...filtered, updatedEntry].sort(
      (a, b) => new Date(a?.date).getTime() - new Date(b?.date).getTime()
    );
    await AsyncStorage.setItem(category, JSON.stringify(updated));
  } catch (error) {
    console.error("Saving error", error);
  }
};
export const getData = async (category: string) => {
  try {
    const stored = await AsyncStorage.getItem(category);
    const parsed = stored ? JSON.parse(stored) : [];
    return parsed;
  } catch (error) {
    console.error("Saving error", error);
  }
};
