document.addEventListener('DOMContentLoaded', function() {

    // Menú móvil
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Cambiar ícono de hamburguesa a X y viceversa
            const icon = mobileMenuButton.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                mobileMenuButton.setAttribute('aria-label', 'Cerrar menú');
                mobileMenuButton.setAttribute('aria-expanded', 'true');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                mobileMenuButton.setAttribute('aria-label', 'Abrir menú');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Cerrar menú al hacer clic en un enlace (para SPAs)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileMenuButton.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    mobileMenuButton.setAttribute('aria-label', 'Abrir menú');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }


    // Efecto de "active" en la navegación al hacer scroll (opcional, más avanzado)
    // Para esto, necesitarías una lógica más compleja para detectar la sección visible.
    // Por ahora, lo dejamos simple.

    // Formulario de contacto (simulación)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Previene el envío real del formulario
            
            // Aquí podrías añadir validación y envío AJAX
            // Por ahora, solo una alerta
            const name = this.elements['name'].value;
            alert(`¡Gracias por tu mensaje, ${name}! Nos pondremos en contacto pronto.`);
            this.reset(); // Limpia el formulario
        });
    }

    // Animación sutil en tarjetas de curso al hacer scroll (opcional)
    const courseCards = document.querySelectorAll('.course-card');
    const testimonialItems = document.querySelectorAll('.testimonial');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% del elemento visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Opcional: dejar de observar una vez animado
                // observer.unobserve(entry.target); 
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elementsToObserve = [...courseCards, ...testimonialItems]; // Combina NodeLists
    
    elementsToObserve.forEach(el => {
        el.style.opacity = '0'; // Iniciar invisible
        el.style.transform = 'translateY(20px)'; // Iniciar un poco abajo
        el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(el);
    });

});