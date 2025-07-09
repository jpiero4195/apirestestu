import mongoose, { mongo } from "mongoose";

const clienteSchema = new mongoose.Schema({
    apellidos: {type: String, required: true},
    nombres: {type: String, required: true},
    fecha_nacimiento: {type: Date, required: true}, // aaaa-mm-dd
    genero: {type: String, enum:['masculino', 'femenino', 'otro']},
    peso: {type: Number, default: 0},
    fecha_creacion: {type: Date, default: Date.now},
    trabajos: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            tipo: String,
            empresa: String,
            nombreCliente: String,
            costo: Number,
            descripcion: String,
            fecha: String // aaaa-mm-dd
        }
    ]
});

const Cliente = mongoose.model('Cliente', clienteSchema, 'clientes');

export default Cliente;