// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const welcomeScreen = document.getElementById('welcomeScreen');
    const welcomeTitle = document.getElementById('welcomeTitle');
    const mainContent = document.getElementById('mainContent');
    const contactBtn = document.getElementById('contactBtn');
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.getElementById('closeModal');
    const contactForm = document.getElementById('contactForm');
    const carouselSlides = document.querySelectorAll('.slide');
    const carouselDots = document.querySelectorAll('.dot');
    
    // Variables para el carrusel
    let currentSlide = 0;
    const slideCount = carouselSlides.length;
    let slideInterval;
    
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
                mainContent.style.display = 'block';
                
                // Efecto de aparición del contenido principal
                setTimeout(() => {
                    mainContent.style.opacity = '1';
                }, 50);
                
                // Iniciar el carrusel de eslogan
                startCarousel();
            }, 1000);
        }, 5000); // 5 segundos
    }
    
    // Función para el carrusel de eslogan
    function startCarousel() {
        // Inicializar el primer slide
        showSlide(currentSlide);
        
        // Cambiar slide automáticamente cada 4 segundos
        slideInterval = setInterval(() => {
            nextSlide();
        }, 4000);
    }
    
    function showSlide(index) {
        // Ocultar todos los slides
        carouselSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remover clase active de todos los dots
        carouselDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar el slide actual
        carouselSlides[index].classList.add('active');
        carouselDots[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }
    
    // Event listeners para los dots del carrusel
    carouselDots.forEach(dot => {
        dot.addEventListener('click', function() {
            // Reiniciar el intervalo cuando se hace click manual
            clearInterval(slideInterval);
            currentSlide = parseInt(this.getAttribute('data-slide'));
            showSlide(currentSlide);
            
            // Reiniciar el intervalo
            slideInterval = setInterval(() => {
                nextSlide();
            }, 4000);
        });
    });
    
    // Mostrar/ocultar modal de contacto
    contactBtn.addEventListener('click', function() {
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
    
    // Repetir la pantalla de bienvenida al recargar la página
    window.addEventListener('beforeunload', function() {
        // Esto asegura que la pantalla de bienvenida se muestre nuevamente al recargar
        sessionStorage.setItem('showWelcome', 'true');
    });
});