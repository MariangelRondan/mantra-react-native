import { Image, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { meditationColors, periodColors } from "@/styles/theme";

export default function SectionButton(props) {
  const { icon, text, meditation, period, onPress } = props;

  const iconComponent = icon ? (
    <Image
      resizeMode="contain"
      source={icon}
      style={[styles.icon, props.iconColor && { tintColor: props.iconColor }]}
    />
  ) : null;

  const buttonStyles = meditation
    ? {
        backgroundColor: meditationColors.primary,
        borderColor: meditationColors.light,
        textColor: meditationColors.light,
      }
    : {
        backgroundColor: periodColors.primary,
        borderColor: periodColors.light,
        textColor: periodColors.light,
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
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    margin: 8,
    width: 120,
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
    textAlign: "center",
  },
});
