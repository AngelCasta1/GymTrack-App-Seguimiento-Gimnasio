<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=E08216&height=160&section=header&text=GymTrack&fontSize=48&fontColor=FFFFFF&animation=fadeIn&fontAlignY=38&desc=App%20privada%20de%20seguimiento%20de%20gimnasio&descSize=16&descAlignY=58&descColor=C8C3F0" width="100%" />


App web progresiva (PWA) 100% cliente para registrar tus entrenamientos en el iPhone.

**Tus datos se guardan solo en tu iPhone** (localStorage). Sin servidores, sin cuentas, sin internet obligatorio.

</div>

---

## ✨ Funciones

| Función | Descripción |
|---|---|
| 📋 **Rutinas** | Crea plantillas de ejercicios con series objetivo y empieza un entreno con un toque |
| 📝 **Registro de entrenos** | Ejercicios con series, repeticiones y peso (o tiempo/distancia para cardio) |
| ⏱️ **Temporizador de descanso** | Anillo de progreso entre series con aviso sonoro |
| 📊 **Ficha de ejercicio** | Histórico completo, récords personales (peso máx, reps máx, volumen) y gráfica de progreso |
| 📚 **Biblioteca de ejercicios** | Organizada por grupo muscular; crea los tuyos (fuerza o cardio) |
| 📅 **Calendario** | Vista mensual con días de entrenamiento; toca un día para ver el detalle |
| ⚖️ **Medidas corporales** | Peso y medidas personalizadas con gráfica y registros por fecha |
| 🕓 **Historial** | Sesiones pasadas con detalle completo |
| ⚙️ **Ajustes** | Unidades (kg/lb, km/mi), nombre y descanso por defecto |
| 💾 **Copia de seguridad** | Exportar/importar en JSON |
| 📲 **PWA offline** | Funciona sin conexión (service worker) e instalable como app nativa |

---

## 📲 Instalación en iPhone 

La PWA necesita servirse por **HTTPS** para instalarse. La forma más rápida (y gratuita):

1. Ve a **netlify.com/drop**
2. Arrastra la carpeta `gymtracker`
3. Abre la URL en Safari (iPhone)
4. Toca **Compartir → “Añadir a la pantalla de inicio”** → nombre `GymTrack`

> Si ya tenías una versión anterior desplegada en la misma URL, tus datos se conservan automáticamente.

---

## 🔒 Privacidad

Todo vive en el **almacenamiento local** del navegador/PWA de tu iPhone.

- Borrar la app de la pantalla de inicio elimina sus datos.
- Recomendado: usa **“Exportar datos”** de vez en cuando para guardar una copia en iCloud/Ficheros.

---

## Estructura
```
gymtracker/
├── index.html            # Punto de entrada
├── styles.css            # Estilos globales
├── app.js                # Lógica principal
├── sw.js                 # Service worker (offline)
├── manifest.webmanifest  # Configuración PWA
├── icons/                # Iconos de la app
└── README.md
```

---

## 🛠️ Stack

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white)

</div>

<p align="center">
  <sub>Hecho para uso personal · Sin servidores · Sin tracking · Solo tú y tus datos</sub>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=E08216&height=100&section=footer" width="100%" />
