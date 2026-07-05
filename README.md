# GymTrack — App privada de seguimiento de gimnasio (estilo FitNotes)

App web progresiva (PWA) 100% cliente para registrar tus entrenamientos en el iPhone.
**Tus datos se guardan solo en tu iPhone** (localStorage). No hay servidores, ni cuentas, ni internet obligatorio.

## Funciones (inspiradas en FitNotes)
- **Rutinas**: crea plantillas de ejercicios con series objetivo y empieza un entreno con un toque.
- **Registro de entrenos**: ejercicios con series, repeticiones y peso (o tiempo/distancia para cardio).
- **Temporizador de descanso** entre series, con anillo de progreso y aviso sonoro.
- **Ficha de ejercicio**: histórico de todas tus series, **récords personales** (peso máx, reps máx, volumen) y **gráfica de progreso**.
- **Biblioteca de ejercicios** por grupo muscular + crea los tuyos (fuerza o cardio).
- **Calendario** mensual con los días de entrenamiento; toca un día para verlo.
- **Medidas corporales**: peso y medidas personalizadas, con gráfica y registros por fecha.
- **Historial** de sesiones con detalle.
- **Ajustes**: unidades (kg/lb, km/mi), nombre, descanso por defecto.
- **Copia de seguridad** exportar/importar en JSON.
- Funciona **sin conexión** (service worker) y se instala como app nativa.

## Cómo usarla en tu iPhone 13 Pro
La PWA necesita servirse por **HTTPS** para instalarse. Lo más rápido (gratis):
1. Ve a **netlify.com/drop** y arrastra la carpeta `gymtracker`.
2. Abre la URL que te da en **Safari** de tu iPhone.
3. Toca **Compartir** → **“Añadir a la pantalla de inicio”** → nombre `GymTrack`.

Si ya tenías desplegada una versión anterior en la misma URL, tus datos se conservan automáticamente.

## Privacidad
Todo vive en el almacenamiento local del navegador/PWA de tu iPhone. Borrar la app de la pantalla de inicio
elimina sus datos. Recomendado: usa “Exportar datos” de vez en cuando para guardar una copia en iCloud/Ficheros.

## Estructura
```
gymtracker/
├── index.html
├── styles.css
├── app.js
├── sw.js
├── manifest.webmanifest
├── icons/
└── README.md
```
