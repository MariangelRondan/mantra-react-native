import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveMeditation = async (meditation: any) => {
  try {
    await AsyncStorage.setItem("meditations", JSON.stringify(meditation));
  } catch (error) {
    console.error("Saving error", error);
  }
};

export const savePeriod = async (period: any) => {
  try {
    await AsyncStorage.setItem("period", JSON.stringify(period));
  } catch (error) {
    console.error("Saving error", error);
  }
};

export const removeTrack = async (trackingData: any) => {
  try {
    const tracking = await AsyncStorage.getItem("meditations");

    await AsyncStorage.removeItem("meditations", trackingData);
  } catch (error) {
    console.error("Saving error", error);
  }
};

export const update = async (trackingData: any) => {
  try {
    await AsyncStorage.setItem("meditations", trackingData);
  } catch (error) {
    console.error("Saving error", error);
  }
};
export const getData = async (trackingData: any) => {
  try {
    await AsyncStorage.setItem("meditations", trackingData);
  } catch (error) {
    console.error("Saving error", error);
  }
};
