import { Image } from "expo-image";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
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
          minHeight: "auto",
          backgroundColor: "#D1F3D1",
        }}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={{ color: "#2E6D2E" }} type="title">
            Bienvenida!
          </ThemedText>
          <HelloWave />
          <ThemedText style={{ color: "#2E6D2E" }} type="subtitle">
            ¿Qué quieres registrar hoy?
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText style={{ color: "#2E6D2E" }} type="subtitle">
            Meditación
          </ThemedText>
          <Pressable onPress={() => router.push("/meditation/meditationHome")}>
            <Image
              style={[styles.image, { borderColor: "#009999" }]}
              source={require("@/assets/images/girl-meditation.jpg")}
            />
          </Pressable>
          <ThemedText style={{ color: "#2E6D2E" }} type="subtitle">
            Período
          </ThemedText>
          <Pressable onPress={() => router.push("/period/periodHome")}>
            <Image
              source={require("@/assets/images/girl-period.jpg")}
              style={[styles.image, { borderColor: "#f55449" }]}
            />
          </Pressable>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#D1F3D1",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 50,
    borderWidth: 2,
    backgroundColor: "#D1F3D1",
  },
  stepContainer: {
    gap: 8,
    backgroundColor: "#D1F3D1",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
});
