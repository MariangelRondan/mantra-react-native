import { useEffect, useState } from "react";
import {
  StyleSheet,
  Pressable,
  View,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Picker } from "@react-native-picker/picker";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabTwoScreen() {
  const [daysInMonth, setDaysInMonth] = useState<
    { day: number; monthType: string }[]
  >([]);
  //current date que vemos ahora en el calendario
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState({ day: 0, monthType: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(false);
  const weekDays = ["D", "L", "M", "M", "J", "V", "S"];

  // Guardar el mes y año y dia TODAY
  const actualMonth: number = new Date().getMonth();
  const actualYear: number = new Date().getFullYear();
  const actualDay: number = new Date().getDate();

  useEffect(() => {
    updateDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  function updateDaysInMonth(year: number, month: number) {
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    // Días del mes anterior
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const prevMonthDays = Array.from({ length: firstDay }, (_, i) => ({
      day: daysInPrevMonth - firstDay + i + 1,
      monthType: "prev",
    }));

    // Días del mes actual
    const currentMonthDays = Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      monthType: "current",
    }));

    const lastDayOfWeek = new Date(year, month + 1, 0).getDay();

    // Días del mes siguiente
    const nextMonthDays = Array.from({ length: 6 - lastDayOfWeek }, (_, i) => ({
      day: i + 1,
      monthType: "next",
    }));
    const daysArray = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

    setDaysInMonth(daysArray);
  }
  function isCurrentDay(day: any): boolean {
    return day.day === actualDay && day.monthType === "current";
  }
  function isSelectedDay(d: { day: number; monthType: string }) {
    return selectedDate.day === d.day && selectedDate.monthType === d.monthType;
  }

  function handleSelectDay(dayInfo: { day: number; monthType: string }) {
    setSelectedDate(dayInfo);
  }

  function handleNextMonth() {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    updateDaysInMonth(newDate.getFullYear(), newDate.getMonth());
  }

  function handlePreviousMonth() {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
    updateDaysInMonth(newDate.getFullYear(), newDate.getMonth());
  }

  return (
    <SafeAreaView>
      <ThemedView
        style={{
          flexDirection: "row",
          height: 30,
          marginVertical: 20,
          marginHorizontal: "auto",
        }}
      >
        <Pressable
          accessibilityLabel="Mes anterior"
          onPress={handlePreviousMonth}
        >
          <IconSymbol size={28} name="back.fill" color={"#11111"} />
        </Pressable>
        <ThemedText style={styles.monthText}>
          {currentDate.toLocaleDateString("es-ES", {
            month: "long",
            year: "numeric",
          })}
        </ThemedText>

        <Pressable accessibilityLabel="Mes siguiente" onPress={handleNextMonth}>
          <IconSymbol size={28} name="next.fill" color={"#11111"} />
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.weekRow}>
        {weekDays.map((day, i) => (
          <ThemedText key={i} style={styles.weekDayText}>
            {day}
          </ThemedText>
        ))}
      </ThemedView>

      <ThemedView style={styles.container}>
        {daysInMonth.map((d, i) => (
          <Pressable
            key={i}
            style={[
              styles.day,
              d.monthType === "current"
                ? styles.currentMonth
                : styles.otherMonth,
              isCurrentDay(d) ? styles.currentDay : "",
              isSelectedDay(d) ? styles.selectedDate : "",
            ]}
            onPress={() => handleSelectDay(d)}
          >
            <ThemedText>{d.day}</ThemedText>
          </Pressable>
        ))}
      </ThemedView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFill}>
          <ThemedView style={styles.modalOverlay}>
            <ThemedView style={styles.modalView}>
              <ThemedView style={styles.modalHeader}>
                <Image
                  style={styles.image}
                  source={require("@/assets/images/meditation-window.png")}
                />
                <ThemedText style={styles.title}>Update de hoy </ThemedText>
              </ThemedView>

              <ThemedView style={styles.row}>
                <TextInput
                  placeholder="Tiempo (min)"
                  keyboardType="numeric"
                  style={[styles.input, { flex: 1, width: 120 }]}
                />
                <Picker
                  selectedValue={selectedOption}
                  style={[styles.input, { width: 160 }]}
                  onValueChange={(itemValue) => setSelectedOption(itemValue)}
                >
                  <Picker.Item label="Vipassana" value="vipassana" />
                  <Picker.Item label="Body scan" value="body_scan" />
                  <Picker.Item label="Compasión" value="compasion" />
                </Picker>
              </ThemedView>

              <TextInput
                placeholder="Notas"
                multiline
                style={[styles.input, { height: 80 }]}
              />

              <ThemedView style={styles.buttonRow}>
                <Pressable
                  style={styles.confirmButton}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <ThemedText style={styles.confirmText}>Guardar</ThemedText>
                </Pressable>

                <Pressable
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <ThemedText style={styles.cancelText}>Cancelar</ThemedText>
                </Pressable>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </BlurView>
      </Modal>

      <ThemedView style={styles.buttonWrapper}>
        <Pressable
          style={styles.buttonInner}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <ThemedText style={styles.buttonText}>+</ThemedText>
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: "center",
    marginTop: 20,
  },
  buttonInner: {
    backgroundColor: "#009999",
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: "#345636",
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 30,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 4,
    gap: 8,
    marginBottom: 4,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  weekDayText: {
    width: 40,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 7 * (43 + 8),
    justifyContent: "space-between",
    marginInline: "auto",
    padding: 8,
  },
  day: {
    width: 40,
    height: 40,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  currentMonth: {
    backgroundColor: "#dbeafe",
  },
  otherMonth: {
    backgroundColor: "#f1f5f9",
    opacity: 0.5,
  },
  currentDay: {
    backgroundColor: "#13867e",
  },
  selectedDate: {
    // borderColor: "#13855e",
    borderColor: "#811382",
    borderStyle: "dashed",
    borderWidth: 2,
  },

  // Fondo desenfocado
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)", // semi-transparente
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(6px)", // funciona en web, en mobile usamos otra técnica (ver nota)
  },

  // Contenido del modal
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  modalHeader: {
    alignItems: "center",
    marginBottom: 12,
  },

  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  title: {
    fontWeight: "600",
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
    justifyContent: "space-between",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },

  confirmButton: {
    flex: 1,
    backgroundColor: "#0b7a75",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  confirmText: {
    color: "white",
    fontWeight: "bold",
  },

  cancelText: {
    color: "#333",
    fontWeight: "bold",
  },
});
