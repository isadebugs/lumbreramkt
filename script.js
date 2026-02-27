// script.js

// Esperamos a que toda la página (incluyendo imágenes, estilos, etc.) esté cargada
window.addEventListener('load', function() {
    // Obtenemos la pantalla de carga y el contenido principal
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    // La animación CSS dura 5 segundos. Esperamos 5 segundos para ocultar
    // completamente el elemento y que no bloquee los clics.
    setTimeout(function() {
        // Ocultamos la pantalla de carga para siempre
        splashScreen.style.display = 'none';
        
        // Aseguramos que el contenido principal sea visible (aunque ya lo es por la animación CSS)
        // El display:flex asegura que ocupe su espacio correctamente.
        mainContent.style.display = 'flex'; 
    }, 5000); // 5000 milisegundos = 5 segundos
});