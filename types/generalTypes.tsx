export interface MeditationEntry {
  id: string;
  type: "Vipassana" | "Body Scan" | "Compasión" | "Otra";
  date: string; // ISO date (e.g. "2025-06-30")
  duration: number;
  comments?: string;
  tags?: string[]; // por ejemplo ["mañana", "estrés", "respiración"]
  emotionBefore?: string; // opcional: cómo se sentía antes
  emotionAfter?: string; // opcional: cómo se sentía después
}

export interface PeriodDay {
  date: string;
  bleedingLevel?: "Ninguno" | "Leve" | "Moderado" | "Abundante";
  bleedingColor?: "Rojo claro" | "Rojo intenso" | "Marrón" | "Rosado" | "Negro";
  notes?: string;
  isPeriodStart?: boolean;
  painLevel?: "Ninguno" | "Leve" | "Moderado" | "Fuerte";
  symptoms?: string[];
  mood?: string;
}

export interface PeriodEntry {
  id: string;
  days: PeriodDay[];
  cycleStartDate: string; // fecha de inicio del período
  cycleEndDate?: string; // fecha de fin del período (opcional)
  estimatedCycleLengthDays?: number; // por defecto 28
  ovulationDate?: string; // calculada en base a cycleStartDate + (estimatedCycleLengthDays - 14)
  fertileWindow?: {
    start: string;
    end: string;
  }; // 5 días antes de ovulación + día de ovulación
  comments?: string;
}

export interface StorageStructure {
  meditation: MeditationEntry[];
  period: PeriodEntry[];
}
