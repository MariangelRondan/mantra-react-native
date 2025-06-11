import { useEffect, useState } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function TabTwoScreen() {
  const [daysInMonth, setDaysInMonth] = useState<
    { day: number; monthType: string }[]
  >([]);
  //current date que vemos ahora en el calendario
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekDays = ["D", "L", "M", "M", "J", "V", "S"];

  // Guardar el mes y año reales
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
    console.log(day, actualDay);
    return day.day === actualDay && day.monthType === "current";
  }
  function handleSelectDay(dayInfo: { day: number; monthType: string }) {
    console.log("Día seleccionado:", dayInfo);
  }

  return (
    <>
      <ThemedView>
        <Pressable
          accessibilityLabel="Mes anterior"
          //   onPress={handlePreviousMonth}
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="var(--color-letras)"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            />
          </svg>
        </Pressable>
        <ThemedText style={styles.monthText}>
          {currentDate.toLocaleDateString("es-ES", {
            month: "long",
            year: "numeric",
          })}
        </ThemedText>

        <Pressable
          accessibilityLabel="Mes siguiente"
          //   onPress={handleNextMonth}
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="var(--color-letras)"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            />
          </svg>
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
            ]}
            onPress={() => handleSelectDay(d)}
          >
            <ThemedText>{d.day}</ThemedText>
          </Pressable>
        ))}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  weekRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 4,
    gap: 8,
    marginBottom: 4,
    marginTop: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 100,
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
});
