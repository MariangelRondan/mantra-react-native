import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { Picker } from "@react-native-picker/picker";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import {
  BleedingColor,
  BleedingLevel,
  MeditationEntry,
  MeditationType,
  PainLevel,
  PeriodDay,
  selectedDate,
} from "@/types";
import { getData, removeItem, saveItem } from "@/services/storageService";

export default function Calendar() {
  const [daysInMonth, setDaysInMonth] = useState<
    { day: number; monthType: string }[]
  >([]);
  const [meditations, setMeditations] = useState<MeditationEntry[]>([]);
  const [selectedDateMeditation, setSelectedDateMeditation] = useState<
    MeditationEntry[]
  >([]);
  const [selectedDatePeriod, setSelectedDatePeriod] = useState<PeriodDay[]>([]);
  const [period, setPeriod] = useState<PeriodDay[]>([]);
  const { view } = useLocalSearchParams(); // medit o pediod
  const [calendarView, setCalendarView] = useState<string>("meditations");
  //current date que vemos ahora en el calendario
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeditationType, setSelectedMeditationType] =
    useState<MeditationType>("Vipassana");
  const [bleedingLevel, setBleedingLevel] = useState<BleedingLevel>("Leve");

  const [bleedingColor, setBleedingColor] = useState<BleedingColor>("Rosado");
  const [painLevel, setPainLevel] = useState<PainLevel>(1);

  const [periodStart, setPeriodStart] = useState(false);
  const [periodEnd, setPeriodEnd] = useState(false);

  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const weekDays = ["D", "L", "M", "M", "J", "V", "S"];
  const [diasMeditados, setDiasMeditados] = useState<Set<string>>(new Set());
  const [diasPeriodo, setDiasPeriodo] = useState<Set<string>>(new Set());
  // Guardar el mes y año y dia TODAY
  const actualMonth: number = new Date().getMonth();
  const actualYear: number = new Date().getFullYear();
  const actualDay: number = new Date().getDate();

  useFocusEffect(
    useCallback(() => {
      if (typeof view === "string") {
        setCalendarView(view);
      }
      const fetchData = async () => {
        if (view === "meditations") {
          const data = await getData(calendarView);
          if (data && data.length > 0) setMeditations(data);
        }
        if (view === "period") {
          const data = await getData(calendarView);
          if (data && data.length > 0) setPeriod(data);
        }
      };
      fetchData();
    }, [view])
  );

  useEffect(() => {
    updateDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    setSelectedDate(currentDate);
  }, []);

  useEffect(() => {
    initializEntries();
  }, [meditations, period]);

  useEffect(() => {
    if (calendarView === "meditations") {
      const selectedDateMeditation = meditations?.filter((update) => {
        const selectedDateStr = selectedDate?.toISOString()?.split("T")[0];
        if (!update.date) {
          console.warn("update.date es undefined o null:", update);
          return false;
        }

        const itemDateObj = new Date(update.date);
        if (isNaN(itemDateObj.getTime())) {
          console.error("Fecha inválida en update.date:", update.date);
          return false;
        }

        const itemDateStr = itemDateObj.toISOString().split("T")[0];
        return itemDateStr === selectedDateStr;
      });
      setSelectedDateMeditation(selectedDateMeditation);
    } else {
      const selectedDatePeriod = period?.filter((update) => {
        const selectedDateStr = selectedDate?.toISOString()?.split("T")[0];
        if (!update.date) {
          console.warn("update.date es undefined o null:", update);
          return false;
        }

        const itemDateObj = new Date(update.date);
        if (isNaN(itemDateObj.getTime())) {
          console.error("Fecha inválida en update.date:", update.date);
          return false;
        }

        const itemDateStr = itemDateObj.toISOString().split("T")[0];
        return itemDateStr === selectedDateStr;
      });
      setSelectedDatePeriod(selectedDatePeriod);
    }
  }, [selectedDate]);

  useEffect(() => {
    const fetchData = async () => {
      if (calendarView === "meditations") {
        const data = await getData(calendarView);
        if (data) setMeditations(data);
      }
      if (calendarView === "period") {
        const data = await getData(calendarView);
        if (data && data.length > 0) setPeriod(data);
      }
    };
    fetchData();
  }, [calendarView]);
  useEffect(() => {
    const fetchData = async () => {
      if (calendarView === "meditations") {
        const data = await getData(calendarView);
        if (data) setMeditations(data);
      }
      if (calendarView === "period") {
        const data = await getData(calendarView);
        if (data && data.length > 0) setPeriod(data);
      }
    };
    fetchData();
  }, []);

  function initializEntries(): void {
    if (calendarView === "meditations") {
      setDiasMeditados(new Set());
      meditations?.forEach((update: MeditationEntry) => {
        if (!update.date) {
          console.warn("Fecha inválida detectada:", update);
          return;
        }
        let dateObj = new Date(update.date);

        if (isNaN(dateObj.getTime())) {
          console.error("Fecha inválida al convertir:", update.date);
          return;
        }
        let e = dateObj.toISOString().split("T")[0];
        setDiasMeditados((prev) => new Set([...prev, e]));
      });
    } else {
      setDiasPeriodo(new Set());
      period?.forEach((update: PeriodDay) => {
        if (!update.date) {
          console.warn("Fecha inválida detectada:", update);
          return;
        }
        let dateObj = new Date(update.date);
        if (isNaN(dateObj.getTime())) {
          console.error("Fecha inválida al convertir:", update.date);
          return;
        }
        if (isNaN(dateObj.getTime())) {
          console.error("Fecha inválida al convertir:", update.date);
          return;
        }
        let e = dateObj.toISOString().split("T")[0];
        setDiasPeriodo((prev) => new Set([...prev, e]));
      });
    }
  }

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
    return (
      day.day === actualDay &&
      day.monthType === "current" &&
      currentDate.getMonth() === actualMonth &&
      currentDate.getFullYear() === actualYear
    );
  }
  function isSelectedDay(d: { day: number; monthType: string }) {
    return selectedDate?.getDate() === d.day && d.monthType === "current";
  }

  function handleSelectDay(dayInfo: selectedDate) {
    if (dayInfo.monthType === "prev") {
      handlePreviousMonth();
    } else if (dayInfo.monthType === "next") {
      handleNextMonth();
    }
    const newSelectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dayInfo.day
    );
    setSelectedDate(newSelectedDate);
  }

  function isMeditationDay(day: selectedDate): boolean {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day.day
    );
    const formattedDate = date?.toISOString()?.split("T")[0];
    return diasMeditados.has(formattedDate) && day.monthType === "current";
  }

  //   const getPeriodDayStyle = (day) => {
  //   const bleeding = getBleedingLevelForDay(day); // leve | moderado | fuerte
  //   switch (bleeding) {
  //     case "leve":
  //       return styles.periodLeve;
  //     case "moderado":
  //       return styles.periodModerado;
  //     case "fuerte":
  //       return styles.periodFuerte;
  //     default:
  //       return styles.currentMonthDayPeriod;
  //   }
  // };

  function isPeriodDay(day: number): boolean {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    const formattedDate = date?.toISOString()?.split("T")[0];
    return diasPeriodo.has(formattedDate);
  }

  function handleNextMonth() {
    setSelectedDate(undefined);
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    updateDaysInMonth(newDate.getFullYear(), newDate.getMonth());
  }

  function handlePreviousMonth() {
    setSelectedDate(undefined);

    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
    updateDaysInMonth(newDate.getFullYear(), newDate.getMonth());
  }

  //TODO: pasar luego a servicio...
  const saveTrack = async () => {
    const newMeditation: MeditationEntry = {
      id: Date.now().toString(),
      type: selectedMeditationType,
      date: selectedDate.toISOString(),
      duration,
      notes,
    };

    const newPeriod: PeriodDay = {
      id: Date.now().toString(),
      date: selectedDate.toISOString(),
      bleedingLevel,
      bleedingColor,
      notes,
      isPeriodStart: periodStart,
      isPeriodEnd: periodEnd,

      painLevel: painLevel,
    };
    try {
      if (calendarView === "meditations") {
        await saveItem(newMeditation, calendarView);
        const data = await getData(calendarView);
        if (data) setMeditations(data);
      } else {
        await saveItem(newPeriod, calendarView);
        const data = await getData(calendarView);
        if (data && data.length > 0) setPeriod(data);
      }
    } catch (err) {
      console.error("❌ Error guardando meditación", err);
    }
  };

  const deleteItem = async (item: MeditationEntry | PeriodDay) => {
    try {
      if (calendarView === "meditations") {
        await removeItem(item, "meditations");
        const data = await getData(calendarView);
        if (data) setMeditations(data);
      } else {
        await removeItem(item, "period");
        const data = await getData(calendarView);
        if (data) setPeriod(data);
      }
    } catch (err) {
      console.error("❌ Error guardando meditación", err);
    }
  };
  const handleToggle = (newView: string) => {
    setCalendarView(newView);
  };

  return (
    <SafeAreaView>
      <ThemedView style={styles.toggleContainer}>
        <Pressable
          style={[
            styles.toggleButton,
            calendarView === "meditations" && styles.active,
          ]}
          onPress={() => handleToggle("meditations")}
        >
          <IconSymbol name="toggle.on" size={22} color={"#11111"} />
          <ThemedText>Meditación</ThemedText>
        </Pressable>

        <Pressable
          style={[
            styles.toggleButton,
            calendarView === "period" && styles.active,
          ]}
          onPress={() => handleToggle("period")}
        >
          <IconSymbol name="toggle.off" size={22} color={"#11111"} />
          <ThemedText>Período</ThemedText>
        </Pressable>
      </ThemedView>
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
                ? calendarView === "meditations"
                  ? styles.currentMonthDayMeditation
                  : styles.currentMonthDayPeriod
                : styles.otherMonth,
              isMeditationDay(d) &&
                calendarView === "meditations" &&
                styles.meditationDay,
              isPeriodDay(d.day) &&
                calendarView === "period" &&
                styles.periodDay,
              isCurrentDay(d) && styles.currentDay,
              isSelectedDay(d) && styles.selectedDate,
            ]}
            onPress={() => handleSelectDay(d)}
          >
            <ThemedText
              style={[
                isPeriodDay(d.day) &&
                  calendarView === "period" && { color: "#fcb9b2" },
              ]}
            >
              {d.day}
            </ThemedText>
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
                <ThemedText style={styles.title}>Update de hoy</ThemedText>
              </ThemedView>

              {calendarView === "meditations" ? (
                // 🧘 MODAL PARA MEDITACIÓN
                <>
                  <ThemedView style={styles.row}>
                    <TextInput
                      value={duration}
                      placeholder="Tiempo (min)"
                      keyboardType="numeric"
                      onChangeText={setDuration}
                      style={[styles.input, { flex: 1, width: 120 }]}
                    />
                    <Picker
                      selectedValue={selectedMeditationType}
                      style={[styles.input, { width: 160 }]}
                      onValueChange={(itemValue) =>
                        setSelectedMeditationType(itemValue)
                      }
                    >
                      <Picker.Item label="Vipassana" value="vipassana" />
                      <Picker.Item label="Body scan" value="body_scan" />
                      <Picker.Item label="Compasión" value="compasion" />
                    </Picker>
                  </ThemedView>

                  <TextInput
                    placeholder="Notas"
                    multiline
                    value={notes}
                    onChangeText={setNotes}
                    style={[styles.input, { height: 80 }]}
                  />
                </>
              ) : (
                // 🌸 MODAL PARA PERÍODO
                <>
                  <ThemedText>Nivel de Sangrado</ThemedText>
                  <Picker
                    selectedValue={bleedingLevel}
                    onValueChange={setBleedingLevel}
                    style={[styles.input, { marginBottom: 10 }]}
                  >
                    <Picker.Item label="Leve" value="light" />
                    <Picker.Item label="Moderado" value="medium" />
                    <Picker.Item label="Abundante" value="heavy" />
                  </Picker>
                  <ThemedText>Color de Sangrado</ThemedText>

                  <Picker
                    selectedValue={bleedingColor}
                    onValueChange={setBleedingColor}
                    style={[styles.input, { marginBottom: 10 }]}
                  >
                    <Picker.Item label="Rojo claro" value="Rojo claro" />
                    <Picker.Item label="Rojo intenso" value="Rojo intenso" />
                    <Picker.Item label="Marrón" value="Marrón" />
                    <Picker.Item label="Rosado" value="Rosado" />
                    <Picker.Item label="Amarillento" value="Amarillento" />
                  </Picker>
                  <ThemedText>Es el inicio del período?</ThemedText>

                  <Picker
                    selectedValue={periodStart}
                    onValueChange={setPeriodStart}
                    style={[styles.input, { marginBottom: 10 }]}
                  >
                    <Picker.Item label="Si" value={true} />
                    <Picker.Item label="No" value={false} />
                  </Picker>
                  <ThemedText>Es el fin del período?</ThemedText>

                  <Picker
                    selectedValue={periodEnd}
                    onValueChange={setPeriodEnd}
                    style={[styles.input, { marginBottom: 10 }]}
                  >
                    <Picker.Item label="Si" value={true} />
                    <Picker.Item label="No" value={false} />
                  </Picker>
                  <ThemedText>Nivel de dolor</ThemedText>

                  <Picker
                    selectedValue={painLevel}
                    onValueChange={setPainLevel}
                    style={[styles.input, { marginBottom: 10 }]}
                  >
                    <Picker.Item label="Sin dolor" value="0" />
                    <Picker.Item label="Dolor leve" value="1" />
                    <Picker.Item label="Moderado" value="2" />
                    <Picker.Item label="Fuerte" value="3" />
                    <Picker.Item label="Muy fuerte" value="4" />
                  </Picker>
                  <ThemedText>Notas</ThemedText>

                  <TextInput
                    placeholder="Notas"
                    multiline
                    value={notes}
                    onChangeText={setNotes}
                    style={[styles.input, { height: 80 }]}
                  />
                </>
              )}

              <ThemedView style={styles.buttonRow}>
                <Pressable
                  style={styles.confirmButton}
                  onPress={() => {
                    saveTrack();
                    setModalVisible(false);
                    setDuration("");
                    setNotes("");
                    setSelectedMeditationType("Vipassana");
                    setBleedingLevel("Leve");
                    setBleedingColor("Rosado");
                    setPainLevel(1);
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
      {selectedDateMeditation.length && calendarView === "meditations" ? (
        <FlatList
          data={selectedDateMeditation}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThemedView style={[styles.card]}>
              <ThemedText style={[styles.date]}>
                {new Date(item.date).toLocaleDateString()}
              </ThemedText>
              <ThemedText style={[styles.text]}>Tipo: {item.type}</ThemedText>
              <ThemedText style={[styles.text]}>
                Duración: {item.duration} min
              </ThemedText>
              {item.notes ? (
                <ThemedText style={[styles.notes]}>📝 {item.notes}</ThemedText>
              ) : null}
              <Pressable onPress={() => deleteItem(item)}>
                <IconSymbol name="delete.fill" size={22} color={"#11111"} />
              </Pressable>
            </ThemedView>
          )}
        />
      ) : selectedDatePeriod.length && calendarView === "period" ? (
        <FlatList
          data={selectedDatePeriod}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThemedView style={[styles.cardPeriod]}>
              <ThemedText style={[styles.periodText]}>
                {new Date(item.date).toLocaleDateString()}
              </ThemedText>
              <ThemedText style={[styles.periodText]}>
                Color: {item.bleedingColor}
              </ThemedText>
              <ThemedText style={[styles.periodText]}>
                Sangrado: {item.bleedingLevel} min
              </ThemedText>
              <ThemedText style={[styles.periodText]}>
                isPeriodStart: {item.isPeriodStart}
              </ThemedText>
              <ThemedText style={[styles.periodText]}>
                isPeriodEnd: {item.isPeriodEnd}
              </ThemedText>
              <ThemedText style={[styles.periodText]}>
                Mood: {item.mood}
              </ThemedText>
              <ThemedText style={[styles.periodText]}>
                Dolor Level: {item.painLevel}
              </ThemedText>

              {item.notes ? (
                <ThemedText
                  style={[
                    styles.notes,
                    calendarView === "period" && styles.periodNotes,
                  ]}
                >
                  📝 {item.notes}
                </ThemedText>
              ) : null}
              <Pressable onPress={() => deleteItem(item)}>
                <IconSymbol name="delete.fill" size={22} color={"#11111"} />
              </Pressable>
            </ThemedView>
          )}
        />
      ) : (
        <ThemedView>
          <ThemedText
            style={calendarView === "period" ? styles.periodText : null}
          >
            Aún no has registrado nada para este día
          </ThemedText>
        </ThemedView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#e3fce3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  currentMonthDayPeriod: {
    backgroundColor: "#ffd6db",
  },

  cardPeriod: {
    backgroundColor: "#ffe0e7",
    shadowColor: "#a7003d",
  },

  periodText: {
    color: "#a7003d",
  },

  periodNotes: {
    color: "#722035",
    fontStyle: "italic",
  },
  date: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#2E6D2E",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  notes: {
    fontStyle: "italic",
    marginTop: 4,
    color: "#555",
  },
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
  currentDay: {
    borderColor: "#811382",
    borderStyle: "dashed",
    borderWidth: 2,
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
  currentMonthDayMeditation: {
    backgroundColor: "#dbeafe",
  },
  otherMonth: {
    backgroundColor: "#f1f5f9",
    opacity: 0.5,
  },
  meditationDay: {
    backgroundColor: "#13867e",
  },
  periodDay: { backgroundColor: "#a51c30" },
  selectedDate: {
    shadowColor: "#811382",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5, // necesario para Android
    borderWidth: 2,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginVertical: 12,
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#eee",
    gap: 6,
  },
  active: {
    backgroundColor: "#13867e",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(6px)",
  },
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
