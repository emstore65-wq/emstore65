// ===================================================================
// 1. Funcionalidad del Menú Responsive
// ===================================================================

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}


// ===================================================================
// 2. Funcionalidad del Modal de Confirmación
// ===================================================================

const purchaseModal = document.getElementById('purchaseModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalIcon = document.getElementById('modalIcon');

function showModal(title, message, isSuccess = true) {
    modalTitle.innerText = title;
    modalMessage.innerText = message;
    
    // Cambiar ícono y color según el tipo de mensaje
    if (isSuccess) {
        modalIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        modalIcon.style.color = 'var(--secondary-color)';
    } else {
        modalIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        modalIcon.style.color = 'var(--primary-color)';
    }

    purchaseModal.classList.add('active');
}

function closeModal() {
    purchaseModal.classList.remove('active');
}

// Cerrar modal al hacer clic fuera del contenido
document.addEventListener('click', function(e) {
    if (e.target.id === 'purchaseModal') {
        closeModal();
    }
});


// ===================================================================
// 3. Funcionalidad de Compra por WhatsApp (Ajustada para COP)
// ===================================================================

function comprarProducto(producto, precio) {
    const whatsappNumber = '573001234567'; 
    
    // Mensaje de compra actualizado con COP
    let message = encodeURIComponent(`Hola EM Store, estoy interesado en comprar el ${producto} por $${precio} COP. ¿Cómo procedo con el pago y el envío?`);
    
    showModal(
        '¡Redireccionando a WhatsApp!', 
        `Serás dirigido a nuestro chat para asegurar la compra del ${producto}.`, 
        true
    );
    
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappLink, '_blank');
}

// ===================================================================
// 4. Funcionalidad del Filtro de Productos
// ===================================================================

function filterProducts(category) {
    const productCards = document.querySelectorAll('.producto-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // 1. Manejar la clase 'active' en los botones
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(`'${category}'`)) {
            btn.classList.add('active');
        }
    });

    // 2. Filtrar las tarjetas de productos
    productCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' '); 
        
        if (category === 'all' || categories.includes(category)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// ===================================================================
// 5. Lógica del Botón CTA Flotante (Scroll)
// ===================================================================

function handleScrollCta() {
    const scrollCta = document.getElementById('scrollCta');
    // Si la oferta relámpago está visible en la pantalla (a menos de 100px del tope)
    const ofertaSection = document.getElementById('oferta');
    const isOfertaVisible = ofertaSection && ofertaSection.getBoundingClientRect().top < (window.innerHeight || document.documentElement.clientHeight) - 100;

    // Mostrar el CTA si el usuario ha bajado más de 500px Y si la oferta no está en la vista.
    if (window.scrollY > 500 && !isOfertaVisible) {
        scrollCta.classList.add('visible');
    } else {
        scrollCta.classList.remove('visible');
    }
}

// Añadir listener de scroll
window.addEventListener('scroll', handleScrollCta);
// También verificar al cargar la página
window.addEventListener('load', handleScrollCta);


// ===================================================================
// 6. Manejo del Formulario de Contacto y Temporizador (DOM Ready)
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar filtro de productos al cargar
    filterProducts('all'); 
    
    // 6.1 Lógica del Formulario de Contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulación de envío exitoso
            showModal(
                '¡Mensaje Recibido!', 
                'Gracias por contactarnos. Responderemos a tu consulta a la brevedad posible.', 
                true
            );
            
            this.reset();
        });
    }

    // 6.2 Lógica del Temporizador (simulado)
    const timerElement = document.getElementById('ofertaTimer');
    if (timerElement) {
        // Inicializa el temporizador a 1 hora y 30 minutos (5455 segundos)
        let totalSeconds = 5455; 
        const timerValues = timerElement.querySelectorAll('.timer-value');

        function updateTimer() {
            if (totalSeconds <= 0) {
                clearInterval(interval);
                timerElement.innerHTML = '¡Oferta Finalizada!';
                return;
            }

            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            // Formato HH:MM:SS
            timerValues[0].innerText = String(hours).padStart(2, '0');
            timerValues[1].innerText = String(minutes).padStart(2, '0');
            timerValues[2].innerText = String(seconds).padStart(2, '0');

            totalSeconds--;
        }

        const interval = setInterval(updateTimer, 1000);
        updateTimer(); // Llamar inmediatamente para evitar retraso inicial
    }
});
