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

    // Inicializar funcionalidad para servicios expandibles
    initializeServices();
    
    // Inicializar modales para proyectos
    initializeProjects();
});

function initializeServices() {
    // Obtener todos los elementos de servicio
    const services = document.querySelectorAll('.service');
    
    // Para cada servicio, crear el elemento de detalles
    services.forEach(service => {
        const serviceId = service.getAttribute('data-service');
        const detailsContent = document.getElementById(serviceId);
        
        if (detailsContent) {
            // Crear el contenedor de detalles
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'service-details-content';
            
            // Agregar botón de cerrar
            const closeButton = document.createElement('span');
            closeButton.className = 'close-details';
            closeButton.innerHTML = '&times;';
            detailsDiv.appendChild(closeButton);
            
            // Agregar el título
            const title = document.createElement('h3');
            title.textContent = detailsContent.querySelector('h2').textContent;
            detailsDiv.appendChild(title);
            
            // Agregar el contenido
            detailsDiv.innerHTML += detailsContent.innerHTML;
            
            // Agregar al servicio
            service.appendChild(detailsDiv);
            
            // Agregar evento de clic al servicio
            service.addEventListener('click', function(event) {
                // Si el clic fue en el botón de cerrar, ocultar detalles
                if (event.target.classList.contains('close-details')) {
                    service.classList.remove('active');
                    return;
                }
                
                // Alternar clase activa
                service.classList.add('active');
            });
            
            // Cerrar al hacer clic fuera
            document.addEventListener('click', function(event) {
                if (!service.contains(event.target)) {
                    service.classList.remove('active');
                }
            });
        }
    });
}

function initializeProjects() {
    // Obtener todos los proyectos
    const projects = document.querySelectorAll('.project');
    
    // Crear el modal si no existe
    let modal = document.getElementById('projectModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'projectModal';
        modal.className = 'project-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        
        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalBody);
        modal.appendChild(modalContent);
        
        document.body.appendChild(modal);
        
        // Eventos para cerrar el modal
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Agregar eventos a los proyectos
    projects.forEach(project => {
        project.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const projectDetails = document.getElementById(projectId);
            
            if (projectDetails) {
                const modalBody = document.querySelector('.modal-body');
                modalBody.innerHTML = projectDetails.innerHTML;
                modal.style.display = 'block';
            }
        });
    });
}
