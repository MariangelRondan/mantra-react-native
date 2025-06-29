import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ProfileView() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />
        <ThemedText type="title">Mariangel Rondan</ThemedText>
        <ThemedText type="subtitle">mariangel@example.com</ThemedText>

        <Pressable style={styles.button}>
          <ThemedText style={styles.buttonText}>Editar Perfil</ThemedText>
        </Pressable>

        <Pressable style={[styles.button, styles.logoutButton]}>
          <ThemedText style={[styles.buttonText, { color: "#f55449" }]}>
            Cerrar Sesión
          </ThemedText>
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E6F5EA",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    gap: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#009999",
  },
  button: {
    backgroundColor: "#009999",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FFEAEA",
    borderColor: "#f55449",
    borderWidth: 1,
  },
});
