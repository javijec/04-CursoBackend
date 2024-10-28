# eCommerce API

Una API REST para gestionar productos y carritos de compra, construida con Express.js, MongoDB y Socket.IO para actualizaciones en tiempo real.

## 🚀 Características

- CRUD completo de productos
- Gestión de carritos de compra
- Actualizaciones en tiempo real de productos usando Socket.IO
- Persistencia de datos en MongoDB usando Mongoose
- Sistema de respaldo en archivos JSON
- Vistas renderizadas con Handlebars
- Manejo de errores personalizado
- Arquitectura MVC (Modelo-Vista-Controlador)
- Sistema de configuración centralizado con variables de entorno

## 📋 Endpoints

### Productos

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:pid` - Obtener un producto específico
- `POST /api/products` - Crear un nuevo producto
- `PUT /api/products/:pid` - Actualizar un producto
- `DELETE /api/products/:pid` - Eliminar un producto

### Carritos

- `POST /api/carts` - Crear un nuevo carrito
- `GET /api/carts/:cid` - Obtener un carrito específico
- `POST /api/carts/:cid/product/:pid` - Agregar producto al carrito

### Vistas

- `GET /` - Vista principal de productos
- `GET /realtimeproducts` - Vista de productos en tiempo real

### Archivos Estáticos

- `GET /static/*` - Acceso a archivos estáticos (CSS, JS, imágenes)

## 🛠️ Estructura del Proyecto

```
src/
├── dao/
│   ├── models/
│   │   ├── product.model.js
│   │   └── cart.model.js
│   ├── products.controller.js
│   └── carts.controller.js
├── files/
│   ├── products.json
│   └── carts.json
├── public/
│   └── uploads/
├── routes/
│   ├── products.router.js
│   ├── carts.router.js
│   └── views.router.js
├── views/
│   ├── home.handlebars
│   └── realtimeproducts.handlebars
├── app.js
├── config.js
└── sockets.js
```

## 💻 Instalación

1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
```bash
# Crear archivo .env con las siguientes variables
MONGODB_URI=tu_uri_de_mongodb
PORT=5050
```

4. Iniciar el servidor
```bash
npm start
```

El servidor estará disponible en `http://localhost:5050`

## ⚙️ Configuración

### Variables de Entorno

```env
PORT=5050
MONGODB_URI=tu_uri_de_mongodb
```

### Configuración del Servidor

El archivo `config.js` centraliza toda la configuración de la aplicación:
- Puerto del servidor
- Directorios de la aplicación
- URI de MongoDB
- Nombres de colecciones
- Directorio de uploads

### WebSockets

La aplicación implementa WebSockets mediante Socket.IO para:
- Actualizaciones en tiempo real de productos
- Notificaciones de conexión/desconexión de clientes
- Eventos personalizados para crear, actualizar y eliminar productos

```javascript
// Ejemplo de conexión del cliente
const socket = io('http://localhost:5050');

// Escuchar nuevos productos
socket.on('new_product', (product) => {
    console.log('Nuevo producto:', product);
});
```

## 🔧 Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- Handlebars
- Dotenv

## 📦 Dependencias Principales

```json
{
  "express": "^4.x.x",
  "mongoose": "^7.x.x",
  "socket.io": "^4.x.x",
  "express-handlebars": "^7.x.x",
  "dotenv": "^16.x.x"
}
```

## 🗄️ Base de Datos

### Colecciones de MongoDB

- `products`: Almacena la información de productos
- `carts`: Almacena los carritos de compra

### Respaldo

La aplicación mantiene un sistema de respaldo en archivos JSON para:
- Productos (`/files/products.json`)
- Carritos (`/files/carts.json`)

## 🤝 Contribución

Las contribuciones son bienvenidas. Para cambios importantes, por favor abre primero un issue para discutir qué te gustaría cambiar.

## 📄 Licencia

[MIT](https://choosealicense.com/licenses/mit/)
