import { StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";

export default function Insights() {
  return (
    <SafeAreaView>
      <ThemedText>Insights data</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
