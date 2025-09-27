// Datos de prueba para la aplicación
export const userData = {
  name: "María González",
  age: 72,
  weight: "65 kg",
  height: "1.62 m",
  bloodPressure: "130/80 mmHg",
  heartRate: "75 bpm",
  pulse: "Normal",
  avgHeartRhythm: "72 bpm",
  mobility: "Buena - Camina 30 min diarios",
  allergies: "Polen, Mariscos",
  joinDate: "15 de Marzo, 2024",
  totalSessions: 45,
  favoriteGame: "Memoria de Colores",
  totalGameTime: "12 horas 30 minutos",
  averageSessionTime: "25 minutos",
  streak: 7, // días consecutivos
  healthMetrics: {
    lastCheckup: "10 de Enero, 2024",
    nextAppointment: "15 de Febrero, 2024",
    medicationReminders: 3,
    exerciseGoal: "30 minutos diarios",
    waterIntake: "6-8 vasos diarios",
    sleepHours: "7-8 horas"
  }
};

export const healthReportsData = {
  bloodPressure: [
    { date: "Lun", systolic: 128, diastolic: 82 },
    { date: "Mar", systolic: 132, diastolic: 85 },
    { date: "Mié", systolic: 125, diastolic: 78 },
    { date: "Jue", systolic: 130, diastolic: 80 },
    { date: "Vie", systolic: 135, diastolic: 88 },
    { date: "Sáb", systolic: 127, diastolic: 79 },
    { date: "Dom", systolic: 129, diastolic: 81 }
  ],
  heartRate: [
    { date: "Lun", rate: 72 },
    { date: "Mar", rate: 75 },
    { date: "Mié", rate: 68 },
    { date: "Jue", rate: 74 },
    { date: "Vie", rate: 78 },
    { date: "Sáb", rate: 70 },
    { date: "Dom", rate: 73 }
  ],
  sleepCycles: [
    { date: "Lun", hours: 7.5, quality: "Buena" },
    { date: "Mar", hours: 8.0, quality: "Excelente" },
    { date: "Mié", hours: 6.5, quality: "Regular" },
    { date: "Jue", hours: 7.8, quality: "Buena" },
    { date: "Vie", hours: 8.2, quality: "Excelente" },
    { date: "Sáb", hours: 7.0, quality: "Buena" },
    { date: "Dom", hours: 7.5, quality: "Buena" }
  ]
};

export const messagesData = [
  {
    id: 1,
    type: "system",
    title: "¡Bienvenido!",
    content: "Gracias por unirte a nuestra comunidad. Estamos aquí para acompañarte.",
    date: "2024-01-15",
    read: true
  },
  {
    id: 2,
    type: "reminder",
    title: "Recordatorio diario",
    content: "No olvides tomar tus medicamentos de la mañana.",
    date: "2024-01-16",
    read: true
  },
  {
    id: 3,
    type: "achievement",
    title: "¡Nuevo logro!",
    content: "Has completado 10 juegos. ¡Excelente trabajo!",
    date: "2024-01-17",
    read: false
  },
  {
    id: 4,
    type: "tip",
    title: "Consejo del día",
    content: "Recuerda mantenerte hidratado bebiendo agua regularmente.",
    date: "2024-01-18",
    read: false
  },
  {
    id: 5,
    type: "tip",
    title: "Cambio en tu tendencia",
    content: "Tu ritmo cardiaco promedio ha cambiado esta semana.",
    date: "2024-01-19",
    read: false
  }
];

export const gamesData = [
  {
    id: 1,
    name: "Memoria de Colores",
    description: "Recuerda la secuencia de colores",
    difficulty: "Fácil",
    icon: "🎨"
  },
  {
    id: 2,
    name: "Encuentra las Parejas",
    description: "Encuentra las cartas iguales",
    difficulty: "Medio",
    icon: "🃏"
  },
  {
    id: 3,
    name: "Palabras Cruzadas",
    description: "Completa las palabras",
    difficulty: "Medio",
    icon: "📝"
  },
  {
    id: 4,
    name: "Sudoku Fácil",
    description: "Completa los números",
    difficulty: "Fácil",
    icon: "🔢"
  }
];