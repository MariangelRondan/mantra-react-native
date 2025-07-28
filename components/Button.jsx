import { Image, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function SectionButton(props) {
  const { icon, text, meditation, period, onPress } = props;

  // Icono con color opcional
  const iconComponent = icon ? (
    <Image
      resizeMode="contain"
      source={icon}
      style={[styles.icon, props.iconColor && { tintColor: props.iconColor }]}
    />
  ) : null;

  // Determinar estilos por tipo
  const buttonStyles = meditation
    ? {
        backgroundColor: "#D1F3D1",
        borderColor: "#5DAE5D",
        textColor: "#256B25",
      }
    : period
    ? {
        backgroundColor: "#FAD2D2",
        borderColor: "#D64848",
        textColor: "#7B1F1F",
      }
    : {
        backgroundColor: "#E0E0E0",
        borderColor: "#A0A0A0",
        textColor: "#333",
        width: 50,
      };

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: buttonStyles.backgroundColor,
          borderColor: buttonStyles.borderColor,
          width: buttonStyles.width,
        },
      ]}
    >
      {iconComponent && (
        <View style={styles.iconContainer}>{iconComponent}</View>
      )}
      <ThemedText style={[styles.text, { color: buttonStyles.textColor }]}>
        {text}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    margin: 8,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
