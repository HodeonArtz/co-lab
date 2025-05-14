# co.lab

**co.lab** es una aplicación web desarrollada como práctica de clase para integrar el uso de fetch y WebSockets. La app permite a los usuarios registrarse o iniciar sesión para acceder a una sala compartida con dos funcionalidades principales: un chat en tiempo real, donde pueden conversar con otras personas conectadas, y un editor colaborativo de texto, similar a Google Docs, que permite escribir de forma simultánea. Está desarrollada con React (usando Mantine para la interfaz), Express para el backend, y ws para la comunicación en tiempo real. Todo el contenido se sincroniza al instante gracias a WebSockets.

## ✨ Funcionalidades principales

- Edición colaborativa de documentos
- Comunicación en tiempo real entre usuarios
- Compartición de archivos

## 🛠️ Tecnologías / Arquitectura

### 🔗 Comunicación

- Websockets para sincronización en tiempo real

### 💻 Frontend

- React con TypeScript (TSX)
  - fetch() para peticiones HTTP
  - Mantine para componentes UI y formularios
  - React Router Dom para navegación
  - Zustand para gestión de estado
  - Zod para validaciones de inputs

### 🔧 Backend

- Node.js

### 🗄️ Base de datos

- JSON

---

## 🚀 Cómo levantar el proyecto

### Requisitos previos

- Node.js >= 18
- npm

### Pasos

1. Clona el repositorio: 
```bash
git clone https://github.com/HodeonArtz/co-lab.git
cd co-lab 
```

2. Instala las dependencias del backend entrando en la carpeta `back-end` y ejecutando la instalación.
```bash
cd back-end
npm install
```

3. Haz lo mismo con el frontend entrando en la carpeta `front-end` y ejecutando la instalación de dependencias.
```bash
cd front-end
npm install
```

4. Levanta el **backend** desde la carpeta `server`.

5. En otra terminal, levanta el **frontend** desde la carpeta `client`.

Por defecto:
- El frontend estará disponible en `http://localhost:5173`
- El backend (API y WebSocket) estará en `http://localhost:3000`

---

## 🔗 Links de interés

Durante el desarrollo hemos consultado y utilizado estos recursos:

- [Mantine UI](https://mantine.dev/)
- [React Router DOM](https://reactrouter.com/en/main)
- [Zustand (State Management)](https://zustand-demo.pmnd.rs/)
- [Zod (Validación de esquemas)](https://zod.dev/)
- [WebSocket - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Node.js Documentation](https://nodejs.org/en/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Node JS WebSocket Server & Programming Examples ](https://www.pubnub.com/blog/nodejs-websocket-programming-examples/)
- [Implementación de WebSockets con Node.js | JacobSoft ](https://www.jacobsoft.com.mx/en/implementacion-de-websockets-con-node-js/)
- [GitHub - asyncapi/nodejs-ws-template: Node.js WebSockets template for the AsyncAPI Generator. It showcases how from a single AsyncAPI document you can generate a server and a client at the same time. ](https://github.com/asyncapi/nodejs-ws-template)
- [Node.js WebSocket Tutorial — Real-Time Chat Room using Multiple Clients | by Karl Hadwen ](https://karlhadwen.medium.com/node-js-websocket-tutorial-real-time-chat-room-using-multiple-clients-44a8e26a953e)
- [Building a Shared Code-Editor using Node.js, WebSocket and CRDT | by Akshat Chauhan ](https://akormous.medium.com/building-a-shared-code-editor-using-node-js-websocket-and-crdt-e84e870136a1)
- [Working with WebSocket and Real-Time Communication in Node.js](https://dev.to/imsushant12/working-with-websocket-and-real-time-communication-in-nodejs-2ngg)
