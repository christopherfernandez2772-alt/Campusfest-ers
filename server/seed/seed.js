require('dotenv').config();
const connectDB = require('../config/db');
const Activity = require('../models/Activity');
const Participant = require('../models/Participant');
const Stand = require('../models/Stand');
const Registration = require('../models/Registration');

const activities = [
  {
    name: 'Concierto de Bienvenida',
    description: 'Apertura oficial del festival con bandas estudiantiles en vivo.',
    category: 'Cultural',
    date: new Date('2026-09-10'),
    time: '18:00',
    location: 'Auditorio Principal',
    capacity: 300,
    availableSpots: 300,
    requirements: 'Entrada libre para toda la comunidad estudiantil',
    status: 'Disponible',
    featured: true,
  },
  {
    name: 'Torneo de Fútbol 5',
    description: 'Competencia deportiva entre equipos de todas las facultades.',
    category: 'Deportivo',
    date: new Date('2026-09-11'),
    time: '09:00',
    location: 'Cancha Múltiple 1',
    capacity: 80,
    availableSpots: 80,
    requirements: 'Equipos de 5 jugadores inscritos previamente',
    status: 'Disponible',
    featured: true,
  },
  {
    name: 'Hackathon CampusFest',
    description: 'Maratón de programación de 24 horas con premios para los mejores proyectos.',
    category: 'Tecnológico',
    date: new Date('2026-09-11'),
    time: '08:00',
    location: 'Laboratorio de Sistemas 2',
    capacity: 60,
    availableSpots: 60,
    requirements: 'Traer computador portátil propio',
    status: 'Disponible',
    featured: true,
  },
  {
    name: 'Exposición de Pintura Estudiantil',
    description: 'Muestra artística con obras realizadas por estudiantes de todas las carreras.',
    category: 'Artístico',
    date: new Date('2026-09-12'),
    time: '10:00',
    location: 'Galería del Bloque C',
    capacity: 120,
    availableSpots: 120,
    requirements: 'Ninguno',
    status: 'Disponible',
    featured: false,
  },
  {
    name: 'Feria Gastronómica Internacional',
    description: 'Degustación de platos típicos preparados por estudiantes de intercambio.',
    category: 'Gastronómico',
    date: new Date('2026-09-12'),
    time: '12:00',
    location: 'Plaza Central',
    capacity: 200,
    availableSpots: 200,
    requirements: 'Ninguno',
    status: 'Disponible',
    featured: false,
  },
  {
    name: 'Noche de Juegos de Mesa',
    description: 'Espacio recreativo con juegos de mesa y videojuegos retro.',
    category: 'Recreativo',
    date: new Date('2026-09-13'),
    time: '19:00',
    location: 'Zona de Bienestar Universitario',
    capacity: 50,
    availableSpots: 0,
    requirements: 'Inscripción previa obligatoria',
    status: 'Lleno',
    featured: false,
  },
  {
    name: 'Conferencia de Innovación Tecnológica',
    description: 'Charla con expertos de la industria sobre inteligencia artificial y futuro digital.',
    category: 'Tecnológico',
    date: new Date('2026-09-13'),
    time: '15:00',
    location: 'Auditorio Menor',
    capacity: 150,
    availableSpots: 150,
    requirements: 'Ninguno',
    status: 'Disponible',
    featured: false,
  },
  {
    name: 'Obra de Teatro Estudiantil',
    description: 'Presentación teatral del grupo cultural de la universidad, cancelada por mantenimiento.',
    category: 'Cultural',
    date: new Date('2026-09-14'),
    time: '17:00',
    location: 'Teatro Universitario',
    capacity: 100,
    availableSpots: 100,
    requirements: 'Ninguno',
    status: 'Cancelado',
    featured: false,
  },
];

const stands = [
  {
    name: 'Stand de Robótica',
    category: 'Tecnológico',
    responsible: 'Grupo de Investigación en Robótica',
    location: 'Pabellón de Ingeniería - Stand 1',
    description: 'Demostraciones de robots autónomos construidos por estudiantes.',
  },
  {
    name: 'Stand de Danza Folclórica',
    category: 'Cultural',
    responsible: 'Semillero de Danzas Tradicionales',
    location: 'Plaza Central - Stand 2',
    description: 'Muestra de trajes típicos y presentaciones cortas de danza folclórica.',
  },
  {
    name: 'Stand de Comida Saludable',
    category: 'Gastronómico',
    responsible: 'Club de Nutrición y Bienestar',
    location: 'Zona de Comidas - Stand 3',
    description: 'Venta de snacks saludables preparados por estudiantes de nutrición.',
  },
  {
    name: 'Stand de Arte Digital',
    category: 'Artístico',
    responsible: 'Colectivo de Diseño Gráfico',
    location: 'Galería del Bloque C - Stand 4',
    description: 'Exhibición interactiva de ilustraciones y animaciones digitales.',
  },
  {
    name: 'Stand de Ajedrez y Juegos de Estrategia',
    category: 'Recreativo',
    responsible: 'Club Universitario de Ajedrez',
    location: 'Zona de Bienestar Universitario - Stand 5',
    description: 'Partidas abiertas de ajedrez y torneos relámpago durante todo el día.',
  },
  {
    name: 'Stand de Escalada Deportiva',
    category: 'Deportivo',
    responsible: 'Grupo de Deportes Extremos',
    location: 'Cancha Múltiple 2 - Stand 6',
    description: 'Muro de escalada portátil con instructores certificados.',
  },
];

const participants = [
  {
    fullName: 'María Fernanda Rojas',
    identification: '1001234567',
    email: 'maria.rojas@universidad.edu.co',
    phone: '3001234567',
    career: 'Ingeniería de Sistemas',
  },
  {
    fullName: 'Juan Esteban Gómez',
    identification: '1002345678',
    email: 'juan.gomez@universidad.edu.co',
    phone: '3012345678',
    career: 'Administración de Empresas',
  },
  {
    fullName: 'Laura Camila Torres',
    identification: '1003456789',
    email: 'laura.torres@universidad.edu.co',
    phone: '3023456789',
    career: 'Diseño Gráfico',
  },
];

async function seed() {
  try {
    await connectDB();

    await Promise.all([
      Activity.deleteMany({}),
      Stand.deleteMany({}),
      Participant.deleteMany({}),
      Registration.deleteMany({}),
    ]);

    const createdActivities = await Activity.insertMany(activities);
    await Stand.insertMany(stands);
    const createdParticipants = await Participant.insertMany(participants);

    await Registration.create({
      participant: createdParticipants[0]._id,
      activity: createdActivities[0]._id,
      comments: 'Con muchas ganas de asistir al concierto de apertura.',
    });

    console.log('Datos de ejemplo insertados correctamente en CampusFest.');
    process.exit(0);
  } catch (error) {
    console.error('Error al insertar los datos de ejemplo:', error.message);
    process.exit(1);
  }
}

seed();
