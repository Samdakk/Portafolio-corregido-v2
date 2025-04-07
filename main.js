document.addEventListener('DOMContentLoaded', function() {
    // Inicializa Swiper
    const swiper = new Swiper(".mySwiper", {
        effect: "cube",
        allowTouchMove: true,
        grabCursor: true,
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
            Navigate(5);
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
    
    // Inicializar certificados
    initializeCertificates();
    
    // Inicializar modales para proyectos
    initializeProjects();
});

function initializeServices() {
    const services = document.querySelectorAll('.service');
    services.forEach(service => {
        service.addEventListener('click', function(event) {
            if (event.target.classList.contains('close-details')) {
                service.classList.remove('expanded');
                return;
            }
            // Toggle expanded state
            if (service.classList.contains('expanded')) {
                service.classList.remove('expanded');
            } else {
                services.forEach(s => s.classList.remove('expanded'));
                service.classList.add('expanded');
            }
        });

        // Close when clicking outside
        document.addEventListener('click', function(event) {
            if (!service.contains(event.target) && service.classList.contains('expanded')) {
                service.classList.remove('expanded');
            }
        });
    });
}

function initializeCertificates() {
    const certificates = document.querySelectorAll('.certificate');
    certificates.forEach(cert => {
        cert.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });

        cert.addEventListener('mouseleave', function() {
            this.classList.remove('expanded');
        });
    });
}

function initializeProjects() {
    const projects = document.querySelectorAll('.project');
    let modal = document.getElementById('projectModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'projectModal';
        modal.className = 'project-modal';
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '×';
        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalBody);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
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