import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import clienteRoutes from './routes/clienteRoutes.js';
import authRoutes from './routes/authRoutes.js'
import estudianteRoutes from './routes/estudianteRoutes.js'

dotenv.config(); // Leer el archivo 

const app = express();

connectDB();

app.use(cors()); // Habilitar CORS
app.use(express.json()); // Parsing de JSON

// Ruta base opcional para probar que el servidor funciona
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente: API CLIENTES');
});

//
app.use('/api/auth', authRoutes);
// Rutas de la API
app.use('/api/clientes', clienteRoutes);
app.use('/api/estudiantes', estudianteRoutes);

// Configuración de la ruta para manejar errores 404
app.use((req, res, next) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Definición del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
