// Cursor Glow Effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-glow');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navWrapper = document.querySelector('.nav-wrapper');
const dropdownItems = document.querySelectorAll('.has-dropdown');
const navLinks = document.querySelectorAll('.nav-links a');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navWrapper.classList.toggle('active');
    document.body.style.overflow = navWrapper.classList.contains('active') ? 'hidden' : '';
});

// Dropdown Menu
dropdownItems.forEach(item => {
    const link = item.querySelector('a');
    const dropdown = item.querySelector('.dropdown-menu');
    
    // Para desktop
    item.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            dropdown.style.display = 'block';
            setTimeout(() => {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateY(0)';
            }, 10);
        }
    });

    item.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.transform = 'translateY(10px)';
            setTimeout(() => {
                dropdown.style.display = 'none';
            }, 300);
        }
    });

    // Para móvil
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            item.classList.toggle('active');
            dropdown.style.display = item.classList.contains('active') ? 'block' : 'none';
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container') && navWrapper.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navWrapper.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Search Box Animation and Functionality
const searchBox = document.querySelector('.search-box');
const searchInput = searchBox.querySelector('input');
const searchIcon = searchBox.querySelector('i');

searchBox.addEventListener('click', (e) => {
    e.stopPropagation();
    if (window.innerWidth <= 768) {
        searchInput.style.width = '100%';
        searchInput.style.opacity = '1';
        searchInput.focus();
    }
});

searchInput.addEventListener('click', (e) => {
    e.stopPropagation();
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    // Aquí puedes implementar la lógica de búsqueda
    console.log('Buscando:', searchTerm);
});

searchIcon.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Implementar la lógica de búsqueda
        console.log('Buscando:', searchTerm);
    }
});

// Close search when clicking outside
document.addEventListener('click', () => {
    if (window.innerWidth > 768) {
        searchInput.blur();
    }
});

// --- LOGIN Y REGISTRO ROBUSTO ---
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const accountSection = document.getElementById('accountSection');
const accountIcon = document.querySelector('.account-icon');
const closeLoginBtn = document.querySelector('.close-login');
const closeRegisterBtn = document.querySelector('.close-register');
const closeAccountBtn = document.querySelector('.close-account');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const logoutBtn = document.getElementById('logoutBtn');

// --- CARRITO ---
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.querySelector('.cart-items');
const subtotalAmount = document.querySelector('.subtotal-amount');
const shippingAmount = document.querySelector('.shipping-amount');
const totalAmount = document.querySelector('.total-amount');
const closeCartBtn = document.querySelector('.close-cart');
const continueShoppingBtn = document.querySelector('.continue-shopping');
const checkoutBtn = document.querySelector('.checkout-btn');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');

// --- UTILIDADES ---
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPassword(password) {
    return password.length >= 6;
}
function showError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4d4d';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.3rem';
    const existingError = element.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    element.parentElement.appendChild(errorDiv);
    element.style.borderColor = '#ff4d4d';
    setTimeout(() => {
        errorDiv.remove();
        element.style.borderColor = '#ddd';
    }, 3000);
}
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.position = 'fixed';
    successDiv.style.top = '20px';
    successDiv.style.right = '20px';
    successDiv.style.background = '#4CAF50';
    successDiv.style.color = 'white';
    successDiv.style.padding = '1rem';
    successDiv.style.borderRadius = '5px';
    successDiv.style.zIndex = '1001';
    successDiv.style.animation = 'slideIn 0.3s ease';
    document.body.appendChild(successDiv);
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => successDiv.remove(), 300);
    }, 3000);
}

// --- LOGIN Y REGISTRO ---
function isLoggedIn() {
    return localStorage.getItem('user') !== null;
}
function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}
function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}
function removeUser() {
    localStorage.removeItem('user');
}
function updateAccountIcon() {
    if (isLoggedIn()) {
        accountIcon.innerHTML = '<i class="fas fa-user-check"></i>';
        accountIcon.style.color = '#4CAF50';
    } else {
        accountIcon.innerHTML = '<i class="fas fa-user"></i>';
        accountIcon.style.color = '';
    }
}
function updateAccountInfo() {
    const user = getUser();
    if (user) {
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
        const date = user.lastLogin || user.joinDate;
        if (date) {
            const formattedDate = new Date(date).toLocaleDateString();
            const dateElement = document.createElement('p');
            dateElement.style.fontSize = '0.8rem';
            dateElement.style.color = '#666';
            dateElement.textContent = user.lastLogin ? `Último acceso: ${formattedDate}` : `Miembro desde: ${formattedDate}`;
            const accountInfo = document.querySelector('.account-info');
            const existingDate = accountInfo.querySelector('p:last-child');
            if (existingDate) existingDate.remove();
            accountInfo.appendChild(dateElement);
        }
    }
}
function closeModals() {
    loginModal.classList.remove('active');
    registerModal.classList.remove('active');
    accountSection.classList.remove('active');
    document.body.style.overflow = '';
}
function showLogin() {
    loginModal.classList.add('active');
    registerModal.classList.remove('active');
    document.body.style.overflow = 'hidden';
}
function showRegister() {
    registerModal.classList.add('active');
    loginModal.classList.remove('active');
}
function showAccount() {
    accountSection.classList.add('active');
    updateAccountInfo();
    document.body.style.overflow = 'hidden';
}

accountIcon.addEventListener('click', (e) => {
    e.preventDefault();
    if (isLoggedIn()) showAccount();
    else showLogin();
});
closeLoginBtn.addEventListener('click', closeModals);
closeRegisterBtn.addEventListener('click', closeModals);
closeAccountBtn.addEventListener('click', closeModals);
window.addEventListener('click', (e) => {
    if (e.target === loginModal || e.target === registerModal) closeModals();
});
showRegisterLink.addEventListener('click', (e) => { e.preventDefault(); showRegister(); });
showLoginLink.addEventListener('click', (e) => { e.preventDefault(); showLogin(); });
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!isValidEmail(email)) {
        showError(document.getElementById('email'), 'Por favor, ingresa un email válido');
        return;
    }
    if (!isValidPassword(password)) {
        showError(document.getElementById('password'), 'La contraseña debe tener al menos 6 caracteres');
        return;
    }
    const user = { name: 'Usuario Demo', email, lastLogin: new Date().toISOString() };
    setUser(user);
    closeModals();
    showSuccess('¡Bienvenido de nuevo!');
    updateAccountIcon();
    updateAddToCartButtons();
});
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (name.length < 3) {
        showError(document.getElementById('registerName'), 'El nombre debe tener al menos 3 caracteres');
        return;
    }
    if (!isValidEmail(email)) {
        showError(document.getElementById('registerEmail'), 'Por favor, ingresa un email válido');
        return;
    }
    if (!isValidPassword(password)) {
        showError(document.getElementById('registerPassword'), 'La contraseña debe tener al menos 6 caracteres');
        return;
    }
    if (password !== confirmPassword) {
        showError(document.getElementById('confirmPassword'), 'Las contraseñas no coinciden');
        return;
    }
    const user = { name, email, joinDate: new Date().toISOString() };
    setUser(user);
    closeModals();
    showSuccess('¡Cuenta creada exitosamente!');
    updateAccountIcon();
    updateAddToCartButtons();
});
logoutBtn.addEventListener('click', () => {
    removeUser();
    closeModals();
    showSuccess('Sesión cerrada correctamente');
    updateAccountIcon();
    updateAddToCartButtons();
});

// --- CARRITO DE COMPRAS ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.animation = 'none';
    cartCount.offsetHeight;
    cartCount.style.animation = 'bounce 0.5s ease';
}
function updateCart() {
    cartItems.innerHTML = '';
    let subtotal = 0;
    if (cart.length === 0) {
        cartItems.innerHTML = `<div class="empty-cart"><i class="fas fa-shopping-cart"></i><p>Tu carrito está vacío</p></div>`;
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping;
    subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
    shippingAmount.textContent = `$${shipping.toFixed(2)}`;
    totalAmount.textContent = `$${total.toFixed(2)}`;
    saveCart();
}
function addToCart(product) {
    if (!isLoggedIn()) {
        showLogin();
        showSuccess('Por favor, inicia sesión para realizar compras');
        return;
    }

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    updateCartCount();
    toggleCart();
    
    // Feedback visual
    const button = document.querySelector(`[data-id="${product.id}"] .add-to-cart`);
    if (button) {
        const originalText = button.textContent;
        button.textContent = '¡Agregado!';
        button.style.background = '#4CAF50';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }
}
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    updateCartCount();
    saveCart();
}
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        updateCart();
        updateCartCount();
        saveCart();
    }
}
function toggleCart() {
    if (!isLoggedIn()) {
        showLogin();
        showSuccess('Por favor, inicia sesión para ver tu carrito');
        return;
    }
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
    document.body.classList.toggle('cart-active');
    document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : '';
}
cartIcon.addEventListener('click', (e) => { e.preventDefault(); toggleCart(); });
closeCartBtn.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);
continueShoppingBtn.addEventListener('click', toggleCart);
checkoutBtn.addEventListener('click', () => {
    if (!isLoggedIn()) {
        showLogin();
        showSuccess('Por favor, inicia sesión para realizar el pago');
        return;
    }

    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 10;
    alert(`¡Gracias por tu compra!\nTotal a pagar: $${total.toFixed(2)}\nRedirigiendo al proceso de pago...`);
    
    cart = [];
    updateCart();
    updateCartCount();
    saveCart();
    toggleCart();
});

// --- BOTONES DE COMPRA SEGÚN LOGIN ---
function updateAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        const productCard = button.closest('.product-card');
        const product = {
            id: parseInt(productCard.dataset.id),
            name: productCard.querySelector('h3').textContent,
            price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
            image: productCard.querySelector('img').src
        };

        button.onclick = (e) => {
            e.preventDefault();
            if (!isLoggedIn()) {
                showLogin();
                showSuccess('Por favor, inicia sesión para realizar compras');
                return;
            }
            addToCart(product);
        };
    });
}

// --- INICIALIZACIÓN ---
updateAccountIcon();
updateAddToCartButtons();
updateCart();
updateCartCount();

// --- FIN DEL BLOQUE MEJORADO ---
// El resto de tu JS (chatbot, animaciones, etc.) permanece igual.

// Smooth Scroll with Active State
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        if (navWrapper.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navWrapper.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Add active state based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add bounce animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);

// Chatbot Toggle
const chatbotFab = document.getElementById('chatbotFab');
const chatContainer = document.getElementById('chatContainer');
const minimizeBtn = document.querySelector('.minimize-btn');

chatbotFab.addEventListener('click', () => {
    chatContainer.classList.add('active');
    chatbotFab.style.display = 'none';
});

minimizeBtn.addEventListener('click', () => {
    chatContainer.classList.remove('active');
    chatbotFab.style.display = 'flex';
});

// Chatbot Functionality
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input input');
const sendButton = document.querySelector('.chat-input button');

// Chatbot responses
const botResponses = {
    greeting: [
        "¡Bienvenido a Fashion Elite! ¿En qué puedo ayudarte hoy?",
        "¡Hola! Estoy aquí para asistirte con tu experiencia de compra.",
        "¡Saludos! ¿Cómo puedo ayudarte a encontrar tu estilo perfecto?"
    ],
    products: [
        "Nuestra colección incluye piezas exclusivas y elegantes. ¿Qué tipo de prendas te interesan?",
        "Tenemos una selección cuidadosamente curada de prendas de alta gama. ¿Te gustaría explorar alguna categoría en particular?",
        "¡Por supuesto! Nuestras prendas combinan elegancia y modernidad. ¿Qué estilo buscas?"
    ],
    prices: [
        "Nuestros precios reflejan la calidad y exclusividad de cada pieza. ¿Hay algún producto específico que te interese?",
        "Ofrecemos diferentes rangos de precios para adaptarnos a tus necesidades. ¿Qué tipo de prenda buscas?",
        "¡Con gusto te ayudo! ¿Te gustaría conocer nuestras ofertas actuales?"
    ],
    default: [
        "Disculpa, ¿podrías reformular tu pregunta? Estoy aquí para ayudarte.",
        "Interesante consulta. ¿Podrías ser más específico?",
        "No estoy seguro de entender. ¿Te gustaría que te ayude con información sobre nuestros productos?"
    ]
};

// Function to get random response from array
function getRandomResponse(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to add message to chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user' : 'bot');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to process user input
function processUserInput(input) {
    input = input.toLowerCase();
    
    if (input.includes('hola') || input.includes('buenas')) {
        return getRandomResponse(botResponses.greeting);
    } else if (input.includes('producto') || input.includes('ropa') || input.includes('colección')) {
        return getRandomResponse(botResponses.products);
    } else if (input.includes('precio') || input.includes('costo') || input.includes('valor')) {
        return getRandomResponse(botResponses.prices);
    } else {
        return getRandomResponse(botResponses.default);
    }
}

// Send message function
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // Simulate bot thinking
        setTimeout(() => {
            const response = processUserInput(message);
            addMessage(response);
        }, 1000);
    }
}

// Event listeners for chat
sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Add hover effect to product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Trending Slider
const trendingSlider = document.querySelector('.trending-slider');
let isDown = false;
let startX;
let scrollLeft;

trendingSlider.addEventListener('mousedown', (e) => {
    isDown = true;
    trendingSlider.style.cursor = 'grabbing';
    startX = e.pageX - trendingSlider.offsetLeft;
    scrollLeft = trendingSlider.scrollLeft;
});

trendingSlider.addEventListener('mouseleave', () => {
    isDown = false;
    trendingSlider.style.cursor = 'grab';
});

trendingSlider.addEventListener('mouseup', () => {
    isDown = false;
    trendingSlider.style.cursor = 'grab';
});

trendingSlider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - trendingSlider.offsetLeft;
    const walk = (x - startX) * 2;
    trendingSlider.scrollLeft = scrollLeft - walk;
});

// Testimonials Animation
const testimonialCards = document.querySelectorAll('.testimonial-card');

const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

testimonialCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterInput = newsletterForm.querySelector('input');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterInput.value.trim();
    
    if (email) {
        // Aquí puedes implementar la lógica para guardar el email
        console.log('Email suscrito:', email);
        
        // Feedback visual
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = '¡Gracias por suscribirte!';
        button.style.background = '#4CAF50';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            newsletterInput.value = '';
        }, 3000);
    }
});

// Smooth Scroll for Footer Links
document.querySelectorAll('.footer-section a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Social Media Links
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Aquí puedes implementar la lógica para abrir las redes sociales
        console.log('Red social:', link.getAttribute('href'));
    });
}); 