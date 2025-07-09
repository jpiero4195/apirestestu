import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Servidor contectado a MongoDB");
    } catch (error) {
        console.log("Error de conexión a la BD", error.message);
        process.exit(1);
    }
}

export default connectDB;