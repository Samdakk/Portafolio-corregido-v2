document.addEventListener('DOMContentLoaded', function() {
    // Inicializa Swiper
    const swiper = new Swiper(".mySwiper", {
        effect: "cube",
        allowTouchMove: true, // Permitir el movimiento táctil
        grabCursor: true, // Cambiar el cursor al pasar sobre el swiper
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        mousewheel: true
    });

    // Agregar evento de cambio de slide
    swiper.on('slideChange', function() {
        updateActiveLink(swiper.activeIndex);
    });

    // Función para actualizar el enlace activo en el menú lateral
    function updateActiveLink(index) {
        const navLinks = document.querySelectorAll(".Links li");
        navLinks.forEach(link => link.classList.remove("activelink"));
        navLinks[index].classList.add("activelink");
    }

    // Función de navegación para los enlaces de la barra lateral
    window.Navigate = function(index) {
        updateActiveLink(index);
        swiper.slideTo(index, 1000, true);
    };

    // Inicializa botones de contacto
    const contactButtons = document.querySelectorAll('button:nth-child(2)');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            Navigate(5); // Navegar a la sección de Contacto
        });
    });

    // Inicializa botones de contratación
    const hireButtons = document.querySelectorAll('button:nth-child(1)');
    hireButtons.forEach(button => {
        button.addEventListener('click', function() {
            const emailLink = "mailto:Vazquezlucas721@gmail.com?subject=Job Opportunity";
            window.location.href = emailLink;
        });
    });
});