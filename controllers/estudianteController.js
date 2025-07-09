import { isValidObjectId } from "mongoose";
import Estudiantes from "../models/Estudiante.js";

export const obtenerEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiantes.find();
        res.json(estudiantes);
        console.log('Estudiante generados');
    } catch (error) {
        res.status(500).json({ mensaje: "Hubo un error al obtener los estudiantes" });
    }
};

export const crearEstudiante = async (req, res) => {
    try {
        const nuevoEstudiante = new Estudiantes(req.body);
        const clienteEstudiante = await nuevoEstudiante.save();
        res.status(201).json(clienteEstudiante);
    } catch (error) {
        res.status(400).json({ mensaje: "Hubo un error al guardar el estudiante" });
    }
};

export const obtenerEstudianteId = async (req, res) => {
    try {
        const estudiante = await Estudiantes.findById(req.params.id);
        if (!estudiante) {
            return res.status(404).json({ mensaje: "Estudiante no encontrado" });
        } else {
            res.json(estudiante);
        }
    } catch (error) {
        res.status(500).json({ mensaje: "Hubo un error al obtener el estudiante" });
    }
};

export const eliminarEstudiante = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ mensaje: "ID del estudiante es requerido" });
        }
        const estudiante = await Estudiantes.findByIdAndDelete(id);
        if (!estudiante) {
            return res.status(404).json({ mensaje: "Estudiante no encontrado" });
        } else {
            res.json({ mensaje: "Estudiante eliminado correctamente" });
        }
    } catch (error) {
        res.status(500).json({ mensaje: "Hubo un error al eliminar el estudiante" });
    }
};

export const actualizarEstudiante = async (req, res) => {
    const id = req.params.id;
    const { apellidos, nombres, fecha_nacimiento, genero, peso } = req.body;

    if (!id) {
        return res.status(400).json({ mensaje: "El ID del estudiante es requerido" });
    }

    if (!isValidObjectId(id)) {
        return res.status(400).json({ mensaje: "El ID del estudiante no es válido" });
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
            return res.status(404).json({ mensaje: "estudiante no encontrado" });
        }

        res.status(200).json({ mensaje: "Cliente actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Hubo un error al actualizar el estudiante" });
    }
};

////

export const agregarCurso = async (req, res) => {
    const { periodoAcad, codmateria, materia, docente, calificacionfinal, fecha_registro } = req.body;
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ mensaje: "El ID del estudiante es requerido" });
    }
    if (!isValidObjectId(id)) {
        return res.status(400).json({ mensaje: "El ID del estudiante no es válido" });
    }
    if (!periodoAcad || !codmateria || !materia || !docente || !calificacionfinal || !fecha_registro) {
        return res.status(400).json({ mensaje: "Todos los campos del curso son requeridos" });
    }

    const dato = { periodoAcad, codmateria, materia, docente, calificacionfinal, fecha_registro };

    try {
        const estudiante = await Estudiantes.findById(id);
        if (!estudiante) return res.status(404).json({ mensaje: "Estudiante no encontrado" });

        const resultado = await Estudiantes.updateOne(
            { _id: id },
            { $push: { curso: dato } }
        );

        res.status(200).json({ mensaje: "Trabajo agregado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Hubo un error al agregar el trabajo" });
    }
};

export const actualizarCurso = async (req, res) => {
    const { periodoAcad, codmateria, materia, docente, calificacionfinal, fecha_registro } = req.body;
    const id = req.params.id;
    const cursoId = req.params.cursoId; // Suponiendo que el ID del curso es pasado como parámetro

    if (!id) {
        return res.status(400).json({ mensaje: "El ID del estudiante es requerido" });
    }
    if (!cursoId) {
        return res.status(400).json({ mensaje: "El ID del curso es requerido" });
    }
    if (!isValidObjectId(id)) {
        return res.status(400).json({ mensaje: "El ID del estudiante no es válido" });
    }
    if (!isValidObjectId(cursoId)) {
        return res.status(400).json({ mensaje: "El ID del curso no es válido" });
    }
    if (!periodoAcad || !codmateria || !materia || !docente || !calificacionfinal || !fecha_registro) {
        return res.status(400).json({ mensaje: "Todos los campos del curso son requeridos" });
    }

    const dato = { periodoAcad, codmateria, materia, docente, calificacionfinal, fecha_registro };

    try {
        const estudiante = await Estudiantes.findById(id);
        if (!estudiante) return res.status(404).json({ mensaje: "Estudiante no encontrado" });

        // Buscar el curso específico dentro del arreglo 'curso'
        const cursoIndex = estudiante.curso.findIndex(curso => curso._id.toString() === cursoId);
        if (cursoIndex === -1) return res.status(404).json({ mensaje: "Curso no encontrado" });

        // Actualizar los datos del curso
        estudiante.curso[cursoIndex] = dato;

        // Guardar los cambios
        await estudiante.save();

        res.status(200).json({ mensaje: "Curso actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Hubo un error al actualizar el curso" });
    }
};



export const eliminarCurso = async (req, res) => {
    const { id, cursoId } = req.params;

    if (!id || !cursoId) {
        return res.status(400).json({ mensaje: "ID del estudiante y del curso son requeridos" });
    }

    if (!isValidObjectId(id) || !isValidObjectId(cursoId)) {
        return res.status(400).json({ mensaje: "ID del estudiante o del curso no es válido" });
    }

    try {
        const resultado = await Cliente.updateOne(
            { _id: id },
            { $pull: { curso: { _id: cursoId } } }
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ mensaje: "Estudiante no encontrado" });
        }

        if (resultado.modifiedCount === 0) {
            return res.status(404).json({ mensaje: "Curso no encontrado" });
        }

        res.status(200).json({ mensaje: "Curso eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Hubo un error al eliminar el Curso", error: error.message });
    }
};
