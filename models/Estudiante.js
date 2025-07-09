import mongoose, { mongo } from "mongoose";
const estudianteSchema = new mongoose.Schema({
    matricula: {type: String, required: true},
    apellidos: {type: String, required: true},
    nombres: {type: String, required: true},
    carrera: {type: String, required: true},
    fecha_creacion: {type: Date, default: Date.now},
    curso: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            periodoAcad: String,
            codmateria: String,
            materia: String,
            docente: Number,
            calificacionfinal: String,
            fecha_registro: String
        }
    ]
});
const Estudiante = mongoose.model('Estudiante', estudianteSchema);

export default Estudiante;