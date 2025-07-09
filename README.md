# back-clientes

Este proyecto hecho en clase es un backend básico en Node.js con Express y MongoDB para gestionar clientes.

## Características

- Obtener todos los clientes (`GET /api/clientes`)
- Crear un nuevo cliente (`POST /api/clientes`)
- Conexión a MongoDB con Mongoose
- Estructura organizada por rutas, controladores y modelos

## Tecnologías del proyecto

- Node.js
- Express
- Mongoose
- MongoDB
- dotenv
- nodemon

## Estructura del proyecto

```
back-clientes/
│
├── controllers/
│ └── clienteController.js
├── models/
│ └── Cliente.js
├── routes/
│ └── clienteRoutes.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Variables de entorno
Crea un archivo `.env` en la raíz con el siguiente contenido:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/clientes
```

## Script
```
pnpm run dev
```

Inicia el servidor con nodemon en modo desarrollo.

## Endpoints
Obtener todos los clientes
```
GET /api/clientes
```

Crear un nuevo cliente

```
POST /api/clientes
Content-Type: application/json
```


Body de ejemplo:
```
{
  "apellidos": "Enrique",
  "nombres": "Dussel",
  "fecha_nacimiento": "1934-12-12",
  "genero": "masculino",
  "peso": 75
}

```

- Usa MongoDB local o remoto, pero asegúrate de que esté activo antes de iniciar el servidor.