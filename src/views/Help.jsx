import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="help-page">
      <h1>❓ Centro de Ayuda</h1>
      <p>Bienvenido a la sección de ayuda del chat. Aquí vas a encontrar información sobre cómo utilizar la aplicación, qué tecnologías se usaron para desarrollarla y algunas ideas de mejoras futuras.</p>

      <section className="help-section">
        <h2>💡 Funcionamiento general del chat</h2>
        <p>Esta aplicación de chat permite la comunicación simulada entre distintos usuarios registrados en el sistema. Cada usuario puede:</p>
        <ul>
          <li>Enviar y recibir mensajes en tiempo real.</li>
          <li>Visualizar la hora de cada mensaje enviado o recibido.</li>
          <li>Cambiar entre modo claro y oscuro desde el menú de configuración.</li>
          <li>Editar su nombre de usuario (alias) de manera personalizada.</li>
          <li>Cerrar sesión de forma segura.</li>
        </ul>
        <p>Los mensajes y configuraciones se almacenan de manera local en tu navegador, por lo que la información se mantiene aunque recargues la página.</p>
      </section>

      <section className="help-section">
        <h2>🧠 Tecnologías utilizadas</h2>
        <ul>
          <li><strong>React.js</strong> — para crear la interfaz de usuario y manejar los estados.</li>
          <li><strong>React Router</strong> — para la navegación entre páginas como Chat y Ayuda.</li>
          <li><strong>Context API</strong> — para compartir información global entre componentes (usuarios, mensajes, etc.).</li>
          <li><strong>CSS</strong> — para el diseño visual, incluyendo el modo claro/oscuro.</li>
          <li><strong>LocalStorage</strong> — para guardar los mensajes y configuraciones localmente.</li>
        </ul>
      </section>

      <section className="help-section">
        <h2>🚀 Posibles mejoras futuras</h2>
        <ul>
          <li>Incorporar conexión en tiempo real mediante <strong>WebSockets</strong>.</li>
          <li>Agregar soporte para envío de imágenes, audios o archivos.</li>
          <li>Crear una base de datos remota para almacenar los mensajes.</li>
          <li>Diseñar una versión móvil optimizada del chat.</li>
          <li>Implementar notificaciones y estados en línea reales.</li>
        </ul>
      </section>

      <footer className="help-footer">
        <p>💬 Gracias por usar nuestro chat. Seguimos mejorando cada día.</p>
      </footer>
      <div className="help-back">
        <Link to="/chat"><button>volver</button></Link>
      </div>
    </div>
  );
}

export default Help
