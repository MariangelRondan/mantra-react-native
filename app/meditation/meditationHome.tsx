import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import SectionButton from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { meditationColors } from "@/styles/theme";

export default function MeditationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.view}>
        <SectionButton
          meditation
          text="Calendario"
          onPress={() =>
            router.push({
              pathname: "/(tabs)/calendar",
              params: { view: "meditations" },
            })
          }
        ></SectionButton>
        <SectionButton
          meditation
          text="Mantras"
          onPress={() => router.push("/meditation/Mantras")}
        ></SectionButton>

        <SectionButton
          meditation
          text="Guía"
          onPress={() => router.push("/meditation/MeditationGuide")}
        ></SectionButton>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
    justifyContent: "space-evenly",
    alignItems: "center",
    minHeight: "auto",
    backgroundColor: meditationColors.background,
  },
});
