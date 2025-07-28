import { Image } from "expo-image";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { ThemedView } from "@/components/ThemedView";
import SectionButton from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MeditationScreen() {
  const router = useRouter();

  return (
    // aca va a ser la home screen de eleccion de seccion....
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView
        style={{
          flex: 1,
          padding: 16,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
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
          onPress={() =>
            router.push({
              pathname: "/(tabs)/calendar",
              params: { view: "meditations" },
            })
          }
        ></SectionButton>

        <SectionButton
          meditation
          text="Guía"
          onPress={() => router.push("/(tabs)/calendar")}
        ></SectionButton>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
