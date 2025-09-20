import { StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";

export default function Ovulacion() {
  return (
    <SafeAreaView>
      <ThemedText>Aquí va la info de ovulación</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
