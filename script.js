// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const welcomeScreen = document.getElementById('welcomeScreen');
    const welcomeTitle = document.getElementById('welcomeTitle');
    const mainContent = document.getElementById('mainContent');
    const contactText = document.getElementById('contactText');
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.getElementById('closeModal');
    const contactForm = document.getElementById('contactForm');
    const letterCarousel = document.getElementById('letterCarousel');
    
    // Frase para el carrusel letra por letra
    const slogan = "VER DONDE OTROS MIRAN";
    let currentLetterIndex = 0;
    let carouselInterval;
    let isDeleting = false;
    let typingSpeed = 100; // Velocidad de escritura en ms
    
    // Función para mostrar la pantalla de bienvenida
    function showWelcomeScreen() {
        // Reiniciar la posición de la pantalla de bienvenida
        welcomeScreen.style.transform = 'translateY(0)';
        welcomeScreen.style.display = 'flex';
        mainContent.style.display = 'none';
        
        // Efecto de letras individuales para el título de bienvenida
        const text = welcomeTitle.textContent;
        welcomeTitle.innerHTML = '';
        
        // Crear cada letra como un span para animación individual
        for(let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '&nbsp;' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
            welcomeTitle.appendChild(span);
        }
        
        // Animar la aparición de cada letra
        setTimeout(() => {
            const letters = welcomeTitle.querySelectorAll('span');
            letters.forEach(letter => {
                letter.style.opacity = '1';
                letter.style.transform = 'translateY(0)';
            });
        }, 300);
        
        // Después de 5 segundos, ocultar la pantalla de bienvenida
        setTimeout(() => {
            // Efecto de cortina hacia arriba
            welcomeScreen.style.transform = 'translateY(-100%)';
            welcomeScreen.style.transition = 'transform 1s ease-in-out';
            
            // Mostrar el contenido principal después de la animación
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                mainContent.style.display = 'flex';
                
                // Efecto de aparición del contenido principal
                setTimeout(() => {
                    mainContent.style.opacity = '1';
                }, 50);
                
                // Iniciar el carrusel de eslogan letra por letra
                startLetterCarousel();
            }, 1000);
        }, 5000); // 5 segundos
    }
    
    // Función para el carrusel de eslogan letra por letra
    function startLetterCarousel() {
        // Limpiar el contenedor
        letterCarousel.innerHTML = '';
        currentLetterIndex = 0;
        isDeleting = false;
        
        // Iniciar el efecto de escritura
        typeLetter();
    }
    
    function typeLetter() {
        // Obtener el texto actual
        const currentText = slogan.substring(0, currentLetterIndex);
        
        // Limpiar el contenedor
        letterCarousel.innerHTML = '';
        
        // Crear cada letra como un elemento separado
        for(let i = 0; i < currentText.length; i++) {
            const letterSpan = document.createElement('span');
            const char = currentText[i];
            
            if(char === ' ') {
                letterSpan.className = 'space';
                letterSpan.innerHTML = '&nbsp;';
            } else {
                letterSpan.className = 'letter';
                letterSpan.textContent = char;
                // Añadir un pequeño retraso a cada letra para efecto cascada
                letterSpan.style.animationDelay = `${i * 50}ms`;
            }
            
            letterCarousel.appendChild(letterSpan);
        }
        
        // Si estamos escribiendo
        if(!isDeleting && currentLetterIndex < slogan.length) {
            currentLetterIndex++;
            typingSpeed = 100; // Velocidad normal de escritura
        } 
        // Si hemos terminado de escribir
        else if(!isDeleting && currentLetterIndex === slogan.length) {
            // Esperar 2 segundos antes de empezar a borrar
            isDeleting = true;
            typingSpeed = 2000; // Pausa antes de borrar
        }
        // Si estamos borrando
        else if(isDeleting && currentLetterIndex > 0) {
            currentLetterIndex--;
            typingSpeed = 50; // Velocidad más rápida para borrar
        }
        // Si hemos terminado de borrar
        else {
            isDeleting = false;
            typingSpeed = 500; // Pausa antes de comenzar de nuevo
        }
        
        // Programar el próximo paso
        clearInterval(carouselInterval);
        carouselInterval = setTimeout(typeLetter, typingSpeed);
    }
    
    // Mostrar/ocultar modal de contacto
    contactText.addEventListener('click', function(e) {
        e.preventDefault();
        contactModal.style.display = 'flex';
    });
    
    closeModal.addEventListener('click', function() {
        contactModal.style.display = 'none';
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === contactModal) {
            contactModal.style.display = 'none';
        }
    });
    
    // Manejar envío del formulario de contacto
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí normalmente enviarías los datos a un servidor
        // Por ahora solo mostraremos un mensaje de confirmación
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        alert(`¡Gracias ${name}! Hemos recibido tu mensaje. Te contactaremos pronto en ${email}.`);
        
        // Limpiar el formulario
        contactForm.reset();
        
        // Cerrar el modal
        contactModal.style.display = 'none';
    });
    
    // Ejecutar la pantalla de bienvenida al cargar la página
    showWelcomeScreen();
    
    // Detener el carrusel cuando la página no está visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(carouselInterval);
        } else {
            startLetterCarousel();
        }
    });
    
    // Repetir la pantalla de bienvenida al recargar la página
    window.addEventListener('beforeunload', function() {
        // Esto asegura que la pantalla de bienvenida se muestre nuevamente al recargar
        sessionStorage.setItem('showWelcome', 'true');
    });
});