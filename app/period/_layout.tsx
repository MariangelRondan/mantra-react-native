import { periodColors } from "@/styles/theme";
import { Stack } from "expo-router";

export default function PeriodLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: periodColors.primary },
        headerTitleStyle: { color: periodColors.light },
        headerTintColor: periodColors.light,
      }}
    >
      <Stack.Screen name="periodHome" options={{ title: "Período" }} />
      <Stack.Screen name="Mantras" options={{ title: "Mantras" }} />
      <Stack.Screen name="MeditationGuide" options={{ title: "Guía" }} />
    </Stack>
  );
}
