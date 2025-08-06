// styles/globalStyles.ts
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
