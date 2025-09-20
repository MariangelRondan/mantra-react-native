import { Text, View } from "react-native";
import { StyleSheet, Platform } from "react-native";
import { Image } from "expo-image";
import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";

export default function MeditationGuide() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/mantra-flores-dark.jpg")}
          style={{ width: 400, height: 300, alignSelf: "center" }}
          contentFit="cover"
        />
      }
    >
      <Collapsible title="Qué es meditar?">
        <ThemedText>
          La meditación es una práctica que implica enfocar la mente y eliminar
          el ruido de pensamientos para alcanzar un estado de calma y claridad
          mental.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Cómo comenzar?">
        <ThemedText>
          Para comenzar a meditar, encuentra un lugar tranquilo, siéntate
          cómodamente, cierra los ojos y concéntrate en tu respiración. Puedes
          empezar con sesiones cortas de 5 a 10 minutos e ir aumentando
          gradualmente.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Preparar el cuerpo">
        <ThemedText>
          Es importante preparar el cuerpo antes de meditar. Realiza
          estiramientos suaves para liberar tensiones y adoptar una postura
          cómoda que permita una respiración profunda y relajada.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
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
