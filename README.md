# 🟢 Clon de WhatsApp - Proyecto Final Front End

## 📌 Descripción del proyecto
Este proyecto consiste en la creación de una **página web funcional inspirada en la interfaz de WhatsApp Web**, desarrollada como trabajo final de la materia **Programación Front End** de la **Universidad Tecnológica Nacional**.

El objetivo fue **replicar la experiencia básica de uso de un chat** aplicando conceptos de desarrollo con **React y JavaScript**, incorporando componentes reutilizables, manejo de estados globales y almacenamiento local.

El proyecto busca simular la interacción entre usuarios, la configuración de preferencias y el cambio de idioma, dentro de una interfaz moderna y responsive.


## ⚙️ Tecnologías utilizadas
- **React** (con Vite)
- **JavaScript (ES6+)**
- **CSS3** para estilos personalizados
- **Context API** para la gestión del estado global del chat
- **Local Storage** para la persistencia de datos
- **React Router DOM** para la navegación entre vistas (por ejemplo, `/help`)
- **Font Awesome** para el uso de íconos


## 💬 Funcionalidades principales

✅ **Simulación de chat funcional:**  
Los usuarios pueden escribir y enviar mensajes dentro del área de conversación, los cuales se registran en el almacenamiento local (`localStorage`), manteniendo la persistencia al recargar la página.

✅ **Sidebar con usuarios:**  
Permite seleccionar con quién chatear y visualizar las conversaciones asociadas a cada usuario.

✅ **Configuración personalizada (Popup):**  
Dentro del chat se incluye un menú emergente de configuración que permite:
- Cambiar el **nombre de usuario**
- Elegir el **idioma (Español / Inglés)**
- Alternar entre **modo claro y oscuro**

Todos estos datos se guardan también en `localStorage`.

✅ **Modo oscuro y claro:**  
Implementado mediante la aplicación de clases dinámicas al `body`, adaptando la interfaz de manera inmediata.

✅ **Página de ayuda / documentación:**  
Desde el ícono de ayuda (`❓`), el usuario accede a una sección estática `/help` donde se explican el funcionamiento general y las tecnologías utilizadas.

✅ **Persistencia de datos:**  
La información de usuario, idioma y configuración se conserva localmente, incluso después de cerrar y volver a abrir el navegador.

✅ **Botones funcionales con posibilidad de expansión:**  
Incluye íconos de cámara, galería, ajustes y más, con estructura preparada para asignarles funcionalidades adicionales en el futuro.


## 🚀 Posibles mejoras
🔸 Integrar una **API de traducción** para extender el soporte multilenguaje a toda la aplicación.  
🔸 Implementar un **sistema de autenticación real** (login / logout).  
🔸 Añadir **envío de imágenes o archivos**.  
🔸 Hacer completamente **responsive** la interfaz en dispositivos móviles.  
🔸 Incorporar **notificaciones visuales y sonoras** para nuevos mensajes.  


## 🧠 Aprendizajes adquiridos
Durante el desarrollo del proyecto se aplicaron conceptos clave del front end moderno, como:
- Creación y uso de componentes funcionales con React.
- Manejo de estado local y global.
- Implementación de hooks (`useState`, `useEffect`, `useContext`).
- Persistencia de datos en `localStorage`.
- Enrutamiento con `React Router`.
- Aplicación de estilos modulares y diseño adaptable.

---

## 👩‍💻 Autoría
**Ayunta Magi Rocío**  
**Programación Front End**  
**Universidad Tecnológica Nacional (UTN)**  