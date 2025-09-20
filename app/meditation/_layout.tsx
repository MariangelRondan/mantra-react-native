import { meditationColors } from "@/styles/theme";
import { Stack } from "expo-router";

export default function MeditationLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: meditationColors.primary },
        headerTitleStyle: { color: meditationColors.light },
        headerTintColor: meditationColors.light,
      }}
    >
      <Stack.Screen name="meditationHome" options={{ title: "Meditación" }} />
      <Stack.Screen name="Mantras" options={{ title: "Mantras" }} />
      <Stack.Screen name="MeditationGuide" options={{ title: "Guía" }} />
    </Stack>
  );
}
