# ActioLift - Sistema POS para Gimnasio

![ActioLift Logo](build/appicon.png)

## 📋 Descripción del Proyecto

ActioLift es un sistema integral de **Punto de Venta (POS)** especializado para la gestión de gimnasios y centros fitness. La aplicación permite administrar de manera eficiente clientes, productos, membresías, suscripciones, ventas y generar reportes detallados del rendimiento del negocio.

### ✨ Características Principales

- **🏃‍♂️ Gestión de Clientes**: Registro, actualización y eliminación de miembros del gimnasio
- **💪 Membresías y Suscripciones**: Control completo de planes de entrenamiento y pagos
- **🛒 Punto de Venta**: Sistema de ventas para productos y servicios del gimnasio
- **📦 Inventario de Productos**: Gestión de suplementos, equipamiento y merchandising
- **📊 Dashboard Analítico**: Métricas en tiempo real del rendimiento del negocio
- **📈 Historial de Actividades**: Seguimiento detallado de todas las transacciones
- **💾 Base de Datos Local**: Almacenamiento seguro con SQLite

## 🏗️ Arquitectura Técnica

### Backend (Go)
- **Framework**: [Wails v2](https://wails.io/) - Framework para aplicaciones de escritorio
- **Base de Datos**: SQLite con [GORM](https://gorm.io/) como ORM
- **Arquitectura**: Clean Architecture con separación de capas (Domain, Infrastructure, Features)
- **Patrones**: Repository Pattern, Handler Pattern

### Frontend (Preact + TypeScript)
- **Framework**: [Preact](https://preactjs.com/) (compatible con React)
- **Build Tool**: [Vite](https://vitejs.dev/) para desarrollo rápido y hot reload
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) para diseño responsivo
- **Iconos**: [Lucide React](https://lucide.dev/) para iconografía moderna
- **Validación**: [Zod](https://zod.dev/) para validación de esquemas
- **Notificaciones**: React Hot Toast para feedback del usuario
- **Fechas**: Day.js para manejo de fechas

## 🛠️ Requisitos del Sistema

### Requisitos Básicos
- **Sistema Operativo**: Windows 10/11, macOS 10.15+, o Linux (Ubuntu 18.04+)
- **Memoria RAM**: Mínimo 4GB, recomendado 8GB
- **Espacio en Disco**: Al menos 500MB libres
- **Resolución**: Mínimo 1024x768

### Compiladores y Herramientas Requeridas

#### 1. Go (Golang)
```bash
# Descargar desde https://golang.org/dl/
# Versión mínima requerida: Go 1.23.0
go version  # Verificar instalación
```

#### 2. Node.js y npm
```bash
# Descargar desde https://nodejs.org/
# Versión recomendada: Node.js 18+ y npm 9+
node --version
npm --version
```

#### 3. Wails CLI
```bash
# Instalar Wails CLI globalmente
go install github.com/wailsapp/wails/v2/cmd/wails@latest

# Verificar instalación
wails version
```

#### 4. Compilador C++ (Para SQLite)

**Windows:**
```bash
# Opción 1: Visual Studio Build Tools
# Descargar desde https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022

# Opción 2: MinGW-w64
# Descargar desde https://www.mingw-w64.org/

# Opción 3: TDM-GCC
# Descargar desde https://jmeubank.github.io/tdm-gcc/
```

**macOS:**
```bash
# Instalar Xcode Command Line Tools
xcode-select --install

# O instalar Xcode completo desde Mac App Store
```

**Linux (Ubuntu/Debian):**
```bash
# Instalar build-essential
sudo apt update
sudo apt install build-essential gcc

# Verificar instalación
gcc --version
```

**Linux (CentOS/RHEL/Fedora):**
```bash
# CentOS/RHEL
sudo yum groupinstall "Development Tools"
sudo yum install gcc gcc-c++

# Fedora
sudo dnf groupinstall "Development Tools"
sudo dnf install gcc gcc-c++
```

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd POS
```

### 2. Verificar Dependencias del Sistema
```bash
# Ejecutar diagnóstico de Wails
wails doctor
```

### 3. Instalar Dependencias del Frontend
```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias de Node.js
npm install

# Regresar al directorio raíz
cd ..
```

### 4. Instalar Dependencias de Go
```bash
# Descargar módulos de Go
go mod download
go mod tidy
```

### 5. Configurar Base de Datos
La base de datos SQLite se inicializa automáticamente en el primer arranque:
- **Ubicación**: Se crea en el directorio de datos de la aplicación del usuario
- **Nombre**: `GYM.db`
- **Tablas**: Se crean automáticamente mediante migraciones de GORM

## 🏃‍♂️ Ejecución de la Aplicación

### Modo Desarrollo
```bash
# Ejecutar en modo desarrollo con hot reload
wails dev
```
Esto iniciará:
- Servidor de desarrollo Vite en `http://localhost:34115`
- Hot reload para cambios en frontend y backend
- DevTools integradas para debugging

### Construcción para Producción
```bash
# Compilar aplicación para distribución
wails build
```
El ejecutable se generará en el directorio `build/bin/`.

### Construcción Multiplataforma
```bash
# Para Windows desde Linux/macOS
wails build -platform windows/amd64

# Para macOS desde Windows/Linux
wails build -platform darwin/amd64

# Para Linux desde Windows/macOS
wails build -platform linux/amd64
```

## 📁 Estructura del Proyecto

```
POS/
├── 📁 backend/
│   ├── 📁 database/
│   │   ├── 📁 models/          # Modelos de datos (GORM)
│   │   └── 📁 sqlite/          # Configuración de SQLite
│   ├── 📁 domain/              # Entidades del dominio
│   ├── 📁 features/            # Casos de uso organizados por característica
│   │   ├── 📁 clients/         # CRUD de clientes
│   │   ├── 📁 products/        # CRUD de productos
│   │   ├── 📁 memberships/     # CRUD de membresías
│   │   ├── 📁 subscriptions/   # CRUD de suscripciones
│   │   ├── 📁 sales/           # CRUD de ventas
│   │   └── 📁 dashboard/       # Métricas y reportes
│   ├── 📁 infrastructure/      # Repositorios y servicios externos
│   └── 📁 utils/               # Utilidades y helpers
├── 📁 frontend/
│   ├── 📁 src/                 # Código fuente de Preact
│   ├── 📁 dist/                # Archivos compilados
│   ├── package.json            # Dependencias de Node.js
│   ├── vite.config.ts          # Configuración de Vite
│   ├── tailwind.config.js      # Configuración de Tailwind
│   └── tsconfig.json           # Configuración de TypeScript
├── 📁 build/                   # Recursos de construcción
├── app.go                      # Controlador principal de la app
├── main.go                     # Punto de entrada de la aplicación
├── go.mod                      # Dependencias de Go
w│ails.json                    # Configuración de Wails
└── README.md                   # Este archivo
```

## 🔧 Scripts de Desarrollo

```bash
# Desarrollo con hot reload
wails dev

# Linting del frontend
npm run lint --prefix frontend

# Construcción del frontend solamente
npm run build --prefix frontend

# Preview del frontend
npm run preview --prefix frontend

# Construcción completa
wails build

# Construcción con flags adicionales
wails build -clean -upx -s
```

## 🐛 Solución de Problemas Comunes

### Error de Compilador C++
```bash
# Error: "gcc: command not found" o "cl.exe not found"
# Solución: Instalar compilador C++ según tu sistema operativo (ver sección de requisitos)
```

### Error de SQLite
```bash
# Error: "cannot find SQLite driver"
# Solución: Verificar que CGO esté habilitado
export CGO_ENABLED=1  # Linux/macOS
set CGO_ENABLED=1     # Windows
go env -w CGO_ENABLED=1 # GO
```

### Error de Permisos en Windows
```bash
# Ejecutar PowerShell como Administrador
# Habilitar ejecución de scripts
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Problemas con Node.js
```bash
# Limpiar caché de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf frontend/node_modules
rm frontend/package-lock.json
npm install --prefix frontend
```

## 👨‍💻 Autor

**xScherpschutter**
- Email: crowstar@outlook.es
- GitHub: [xScherpschutter](https://github.com/xScherpschutter)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

---

**¡Gracias por usar ActioLift! 💪🏋️‍♂️**
