import express from 'express';
import { crearCliente, obtenerClientes, obtenerClienteId, eliminarCliente, actualizarCliente, agregarTrabajo } from '../controllers/clienteController.js';
import verificaToken from '../middleware/verificaToken.js';

const router = express.Router();

router.use(verificaToken);

router.get('/', obtenerClientes);
router.post('/', crearCliente);
router.get('/:id', obtenerClienteId);
router.delete('/:id', eliminarCliente);
router.put('/:id', actualizarCliente); 
// router.patch('/:id', actualizarCliente); // para actualizar parcialmente

router.post('/:id/trabajo', agregarTrabajo);

export default router;
