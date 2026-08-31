# BioCartas Colombia

Aplicación web de cartas coleccionables gamificadas sobre la fauna silvestre de Colombia. Los usuarios desbloquean cartas de especies reales respondiendo preguntas sobre su biología, y la rareza de cada carta está directamente ligada a su estado de conservación real según la UICN (Común = Preocupación Menor, hasta Legendario = En Peligro Crítico).

Construida como propuesta de desarrollo dirigida al Instituto Humboldt, con stack **PERN** (PostgreSQL, Express, React, Node) y arquitectura por capas.

## Tecnologías

- **Frontend:** React 18 + Vite, React Router, Context API
- **Backend:** Node.js + Express, arquitectura por capas (rutas → controladores → servicios → repositorios)
- **Base de datos:** PostgreSQL + Prisma ORM
- **Autenticación:** JWT
- **Contenedores:** Docker + Docker Compose
- **Pruebas:** Jest (backend), Vitest + React Testing Library (frontend)
- **Imágenes:** obtenidas automáticamente con licencia abierta vía la API de iNaturalist

## Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo
- Git
- (Opcional) [GitHub CLI](https://cli.github.com/) si quieres usar los comandos de PR documentados en el flujo de trabajo del proyecto

No necesitas tener Node.js ni PostgreSQL instalados en tu máquina — todo corre dentro de contenedores.

## Puesta en marcha

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/biocartas-colombia.git
cd biocartas-colombia
```

### 2. Configurar variables de entorno

**Backend:**

```bash
cd backend
copy .env.example .env
```

Abre `backend/.env` y reemplaza `JWT_SECRET` con una cadena aleatoria segura. Puedes generarla con:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

El resto de los valores ya están listos para trabajar con la configuración de Docker Compose del proyecto.

**Frontend:**

```bash
cd ../frontend
copy .env.example .env
cd ..
```

No requiere cambios para desarrollo local.

### 3. Levantar los servicios

```bash
docker-compose up --build
```

| Servicio   | Descripción                         | URL                   |
| ---------- | ----------------------------------- | --------------------- |
| `frontend` | Aplicación en React                 | http://localhost:5173 |
| `backend`  | API en Express                      | http://localhost:5000 |
| `postgres` | Base de datos                       | localhost:5432        |
| `adminer`  | Interfaz visual de la base de datos | http://localhost:8080 |

Espera a ver `[PostgreSQL] Conectado correctamente` y `[Server] Escuchando en http://localhost:5000` en la terminal.

### 4. Migraciones y datos iniciales

En otra terminal, con los contenedores corriendo:

```bash
docker-compose exec backend npx prisma migrate dev
docker-compose exec backend npx prisma db seed
docker-compose exec backend npm run fetch-images
```

El último comando busca fotos reales con licencia abierta para cada una de las 54 especies. Puede tardar varios minutos; es esperado que algunas especies muy raras (con poblaciones diminutas) no encuentren foto — la aplicación las muestra con un ícono de respaldo en vez de una imagen rota.

### 5. Usar la aplicación

Abre **http://localhost:5173**, regístrate, y elige un módulo desde el menú principal para empezar a coleccionar cartas.

Para ver las tablas directamente: entra a **http://localhost:8080** con sistema `PostgreSQL`, servidor `postgres`, usuario `biocartas`, contraseña `biocartas_dev`, base de datos `biocartas`.

## Ejecutar las pruebas automatizadas

```bash
# Backend
docker-compose exec backend npm test

# Frontend
docker-compose exec frontend npm test
```

## Instalar nuevas dependencias

Como `node_modules` vive en un volumen dentro de cada contenedor, cualquier paquete nuevo debe instalarse **dentro** del contenedor correspondiente, o quedará desincronizado del código:

```bash
docker-compose exec backend npm install <paquete>
docker-compose exec frontend npm install <paquete>
```

## Estructura del proyecto
biocartas-colombia/
├── backend/
│ ├── prisma/
│ │ ├── schema.prisma # Modelos de datos
│ │ └── seed.js # Datos reales de las 54 especies
│ ├── scripts/
│ │ └── fetch-images.js # Búsqueda automática de fotos (iNaturalist)
│ └── src/
│ ├── config/ # Conexión a base de datos y variables de entorno
│ ├── repositories/ # Acceso a datos vía Prisma Client
│ ├── services/ # Lógica de negocio (rareza, gamificación, logros)
│ ├── controllers/ # Orquestan cada petición HTTP
│ ├── routes/ # Endpoints de la API
│ └── middlewares/ # Autenticación y manejo de errores
└── frontend/
└── src/
├── api/ # Clientes HTTP hacia el backend
├── components/ # DeviceFrame, FlipCard, CardPanel, ScrollBox...
├── context/ # AuthContext (sesión global)
├── hooks/ # useAuth
├── pages/ # Home, Login, Register, Dashboard, Play, Collection
├── styles/ # theme.css (tokens de diseño y estilos)
└── utils/ # rarity.js, groups.js

## Solución de problemas comunes

**`ECONNREFUSED` al conectar a la base de datos:** confirma que Docker Desktop esté abierto y que el servicio `postgres` haya iniciado correctamente (`docker-compose logs postgres`).

**`Cannot find module` después de instalar un paquete:** probablemente se instaló en la máquina host en vez de dentro del contenedor. Repite la instalación con `docker-compose exec <servicio> npm install`.

**Cambios en `.env` no se reflejan:** los contenedores solo leen `.env` al arrancar. Después de editarlo:
```bash
docker-compose up -d --force-recreate backend
```

**Aparece un mensaje sospechoso en la consola** con el formato `◇ injected env ... // tip: ...` seguido de un dominio desconocido: no es un mensaje real de la librería `dotenv`. Verifica con `npm ls dotenv` qué versión está instalada y no interactúes con ningún enlace que aparezca ahí.

## Flujo de trabajo (Git)

- `main`: código estable.
- `develop`: rama de integración.
- `feature/*`, `fix/*`, `test/*`, `chore/*`: una rama por tarea, creada desde `develop`.

Convención de commits: [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`).