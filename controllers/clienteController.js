import { isValidObjectId } from "mongoose";
import Cliente from "../models/Cliente.js";

// obteniendo todos los clientes
export const obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
        console.log('Cliente generados');
    } catch (error) {
        res.status(500).json({ mensaje: "Hubo un error al obtener los clientes" });
    }
};

//  Creando los clientes
export const crearCliente = async (req, res) => {
    try {
        const nuevoCliente = new Cliente(req.body);
        const clienteGuardado = await nuevoCliente.save(); // guarda el cliente
        res.status(201).json(clienteGuardado);
    } catch (error) {
        res.status(400).json({ mensaje: "Hubo un error al guardar el cliente" });
    }
};

// obteniendo un cliente por su ID
export const obtenerClienteId = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        } else {
            res.json(cliente);
        }
    } catch (error) {
        res.status(500).json({ mensaje: "Hubo un error al obtener el cliente" });
    }
};

// Eliminando un cliente por su ID
export const eliminarCliente = async (req, res) => {
    try {
        // obtenieno id por query
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ mensaje: "ID del cliente es requerido" });
        }

        const cliente = await Cliente.findByIdAndDelete(id);
        if (!cliente) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        } else {
            res.json({ mensaje: "Cliente eliminado correctamente" });
        }
    } catch (error) {
        res.status(500).json({ mensaje: "Hubo un error al eliminar el cliente" });
    }
};

// Actualizando un cliente por su ID
export const actualizarCliente = async (req, res) => {
    const id = req.params.id;
    const { apellidos, nombres, fecha_nacimiento, genero, peso } = req.body;

    if (!id) {
        return res.status(400).json({ mensaje: "El ID del cliente es requerido" });
    }

    if (!isValidObjectId(id)) {
        return res.status(400).json({ mensaje: "El ID del cliente no es válido" });
    }

    if (!apellidos && !nombres && !fecha_nacimiento && !genero && !peso) {
        return res.status(400).json({ mensaje: "Se requiere al menos un campo para actualizar" });
    }

    try {
        const resultado = await Cliente.updateOne(
            { _id: id },
            { $set: { ...req.body } }
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        }

        res.status(200).json({ mensaje: "Cliente actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Hubo un error al actualizar el cliente" });
    }
};


// Agregando un trabajo a un cliente
export const agregarTrabajo = async (req, res) => {
    const { tipo, empresa, nombreCliente, costo, descripcion, fecha } = req.body;
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ mensaje: "El ID del cliente es requerido" });
    }
    if (!isValidObjectId(id)) {
        return res.status(400).json({ mensaje: "El ID del cliente no es válido" });
    }
    if (!tipo || !empresa || !nombreCliente || !costo || !descripcion || !fecha) {
        return res.status(400).json({ mensaje: "Todos los campos del trabajo son requeridos" });
    }

    const dato = { tipo, empresa, nombreCliente, costo, descripcion, fecha };

    try {
        const cliente = await Cliente.findById(id);
        if (!cliente) return res.status(404).json({ mensaje: "Cliente no encontrado" });

        const resultado = await Cliente.updateOne(
            { _id: id },
            { $push: { trabajos: dato } }
        );

        res.status(200).json({ mensaje: "Trabajo agregado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Hubo un error al agregar el trabajo" });
    }
};

// Eliminar el trabajo de un cliente
export const eliminarTrabajo = async (req, res) => {
    const { id, trabajoId } = req.params;

    if (!id || !trabajoId) {
        return res.status(400).json({ mensaje: "ID del cliente y del trabajo son requeridos" });
    }

    if (!isValidObjectId(id) || !isValidObjectId(trabajoId)) {
        return res.status(400).json({ mensaje: "ID del cliente o del trabajo no es válido" });
    }

    try {
        const resultado = await Cliente.updateOne(
            { _id: id },
            { $pull: { trabajos: { _id: trabajoId } } }
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        }

        if (resultado.modifiedCount === 0) {
            return res.status(404).json({ mensaje: "Trabajo no encontrado" });
        }

        res.status(200).json({ mensaje: "Trabajo eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Hubo un error al eliminar el trabajo", error: error.message });
    }
};
