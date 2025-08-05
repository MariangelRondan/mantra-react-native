import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import SectionButton from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PeriodHome() {
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
          period
          text="Calendario"
          onPress={() =>
            router.push({
              pathname: "/(tabs)/calendar",
              params: { view: "period" },
            })
          }
        ></SectionButton>

        <SectionButton
          period
          text="Ovulación"
          onPress={() => router.push("/(tabs)/calendar")}
        ></SectionButton>

        <SectionButton
          period
          text="Insights"
          onPress={() => router.push("/(tabs)/calendar")}
        ></SectionButton>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
