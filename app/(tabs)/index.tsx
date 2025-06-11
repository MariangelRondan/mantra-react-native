import { Image } from "expo-image";
import { Platform, StyleSheet, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    // aca va a ser la home screen de eleccion de seccion....
    <ThemedView
      style={{
        flex: 1,
        padding: 16,
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bienvenida!</ThemedText>
        <HelloWave />
        <ThemedText type="subtitle">¿Qué quieres registrar hoy?</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Meditación</ThemedText>
        <Image
          style={[styles.image, { borderColor: "#009999" }]}
          source={require("@/assets/images/meditation-window.png")}
        />
        <ThemedText type="subtitle">Período</ThemedText>
        <Image
          source={require("@/assets/images/periodo-window.jpg")}
          style={[styles.image, { borderColor: "#f55449" }]}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  image: {
    width: 150,
    height: 150,

    borderRadius: 50,
    borderWidth: 2,
  },
  stepContainer: {
    gap: 8,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
