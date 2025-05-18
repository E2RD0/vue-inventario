# Frontend - Inventario hecho con Vue.js

Frontend de la aplicación de inventario. 
Este proyecto consume una [API GraphQL expuesta por un backend en Flask](https://github.com/E2RD0/inventory-flask-graphql).

[Respuestas a preguntas
](respuestas.md)

---

## Requisitos previos

- Node.js 16 o superior
- Backend ejecutándose (puerto por defecto: 5000)

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con:
```env
VITE_API_URL=http://localhost:5000
```

## Cómo ejecutar el proyecto

1. Instalar las dependencias:

```bash
npm install
```

2. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

3. Abrir en el navegador: [http://localhost:5173](http://localhost:5173)
