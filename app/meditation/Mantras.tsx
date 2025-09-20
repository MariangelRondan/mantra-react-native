import { Text, View } from "react-native";
import { StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { FlatList } from "react-native-gesture-handler";
import { ExternalPathString } from "expo-router";

export default function Mantras() {
  const mantras = [
    {
      id: "1",
      title: "Aad gure name",
      link: "https://www.spotyfy.com/",
    },
    {
      id: "2",
      title: "Mool Mantra",
      link: "https://www.spotyfy.com/",
    },
  ];

  return (
    <SafeAreaView>
      <FlatList
        data={mantras}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExternalLink href={item.link as ExternalPathString}>
            <ThemedText type="link">{item.title}</ThemedText>
          </ExternalLink>
        )}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
