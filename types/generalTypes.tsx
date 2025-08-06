export interface MeditationEntry {
  id: string;
  type: MeditationType;
  date: string; // ISO date (e.g. "2025-06-30")
  duration: string;
  notes?: string;
  tags?: string[]; // por ejemplo ["mañana", "estrés", "respiración"]
  emotionBefore?: string; // opcional: cómo se sentía antes
  emotionAfter?: string; // opcional: cómo se sentía después
}

export interface PeriodDay {
  id: string;
  date: string;
  bleedingLevel?: BleedingLevel;
  bleedingColor?: BleedingColor;
  notes?: string;
  isPeriodStart: boolean;
  isPeriodEnd: boolean;
  painLevel?: PainLevel;
  mood?: string;
}
export type BleedingColor =
  | "Rojo claro"
  | "Rojo intenso"
  | "Marrón"
  | "Rosado"
  | "Amarillento";

export type BleedingLevel = "Leve" | "Moderado" | "Abundante";
export type MeditationType = "Vipassana" | "Body Scan" | "Compasión" | "Otra";
export type PainLevel = 1 | 2 | 3 | 4 | 5;

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

export type selectedDate = { day: number; monthType: string };
