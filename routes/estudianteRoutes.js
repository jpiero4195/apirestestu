import express from 'express';
import { obtenerEstudiantes, crearEstudiante, obtenerEstudianteId, eliminarEstudiante , actualizarEstudiante, agregarCurso, actualizarCurso, eliminarCurso } from '../controllers/estudianteController.js';
import verificaToken from '../middleware/verificaToken.js';

const router = express.Router();

router.use(verificaToken);

router.get('/', obtenerEstudiantes);
router.post('/', crearEstudiante);
router.get('/:id', obtenerEstudianteId);
router.delete('/:id', eliminarEstudiante);
router.put('/:id', actualizarEstudiante);
router.post('/:id/curso', agregarCurso);
router.put('/:id/curso', actualizarCurso);
router.delete('/:id/curso', eliminarCurso);

export default router;
