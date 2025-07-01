// Menu data
const menuItems = [
    {
        id: 1,
        name: "Samosa",
        description: "Crispy pastry filled with spiced potatoes and peas (4 pieces)",
        price: 5.00,
        category: "appetizers",
        image: "Images/Samosa.jpg.jpeg",
        ingredients: "Farine tout usage, ghee, huile, coriandre, sel, petits pois, pommes de terre, oignons, gingembre, piments et épices indiennes."
    },
    {
        id: 2,
        name: "Pakoras",
        description: "Deep-fried vegetable fritters with mint chutney (per plate)",
        price: 3.00,
        category: "appetizers",
        image: "Images/Pakora.jpg.jpeg",
        ingredients: "Farine de pois chiche, farine de riz, oignon, piment, carotte, épinards, poivron, pomme de terre, coriandre, sel, citron, bicarbonate de soude, huile, épices indiennes."
    },
    {
        id: 3,
        name: "Vada",
        description: "Crispy lentil donuts served with coconut chutney (per piece)",
        price: 1.00,
        category: "appetizers",
        image: "Images/vada.jpg.jpeg",
        ingredients: "Farine de pois chiche, sel, bicarbonate de soude, citron et eau. Rembourrage: Pommes de terre, gingembre, piment, ail, coriandre, épices indiennes."
    },
    {
        id: 4,
        name: "Panipuri",
        description: "Crispy shells filled with spiced water and chutneys (per plate)",
        price: 5.00,
        category: "appetizers",
        image: "Images/Pani Puri.jpg.jpeg",
        ingredients: "Puri: Semoule, farine de blé, sel et eau. Rembourrage: Pommes de terre, pois chiches, sel, épices indiennes. Eau: Menthe, coriandre, gingembre, piment, tamarin, sel, sel noir, sucre, citron, épices indiennes."
    },
    {
        id: 5,
        name: "Lassi Vanilla",
        description: "Creamy yogurt drink with vanilla flavor (per glass)",
        price: 2.00,
        category: "mains",
        image: "Images/Lassi.jpg.jpeg",
        ingredients: "Yaourt nature, sucre, glace à la vanille, cardamome, noix de cajou et amandes."
    },
    {
        id: 6,
        name: "Churma Laddu Gujju Special",
        description: "Traditional Gujarati sweet made with wheat flour and jaggery (per piece)",
        price: 1.50,
        category: "desserts",
        image: "Images/Churma ladoo.jpg.jpeg",
        ingredients: "Farine de blé, ghee, jaggery, noix de cajou, amandes, cardamome, noix de muscade, huile."
    }
];

// Cart functionality
let cart = [];

// DOM elements
const menuGrid = document.getElementById('menu-grid');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const categoryBtns = document.querySelectorAll('.category-btn');
const closeModal = document.querySelector('.close');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayMenuItems(menuItems);
    updateCartDisplay();
});

// Display menu items
function displayMenuItems(items) {
    menuGrid.innerHTML = items.map(item => `
        <div class="menu-item fade-in" data-category="${item.category}">
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-item-footer">
                    <span class="price">€${item.price}</span>
                    <div class="item-buttons">
                        <button class="ingredients-btn" onclick="showIngredients(${item.id})">Ingredients</button>
                        <button class="add-to-cart" onclick="addToCart(${item.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter menu items
categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const category = this.dataset.category;
        
        // Update active button
        categoryBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Filter items
        const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
        displayMenuItems(filteredItems);
    });
});

// Add to cart
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...item, quantity: 1});
    }
    
    updateCartDisplay();
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
    displayCartItems();
}

// Update quantity
function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartDisplay();
            displayCartItems();
        }
    }
}

// Update cart display
function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Display cart items in modal
function displayCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>€${item.price} each</p>
            </div>
            <div>
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                <button onclick="removeFromCart(${item.id})" style="margin-left: 10px; color: red;">Remove</button>
            </div>
        </div>
    `).join('');
}

// Modal functionality
cartBtn.addEventListener('click', function() {
    cartModal.style.display = 'block';
    displayCartItems();
});

closeModal.addEventListener('click', function() {
    cartModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Smooth scrolling
function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({
        behavior: 'smooth'
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Show ingredients
function showIngredients(itemId) {
    window.location.href = `ingredients.html?id=${itemId}`;
}

// Reviews storage
let reviews = [];

// Submit review functionality
function submitReview() {
    const reviewText = document.getElementById('review-text').value.trim();
    const reviewerName = document.getElementById('reviewer-name').value.trim();
    
    if (!reviewText || !reviewerName) {
        alert('Please fill in both name and review!');
        return;
    }
    
    // Add review to array
    const newReview = {
        name: reviewerName,
        text: reviewText,
        date: new Date().toLocaleDateString()
    };
    
    reviews.unshift(newReview);
    
    // If more than 5 reviews, send oldest to WhatsApp
    if (reviews.length > 5) {
        const oldReview = reviews.pop();
        const whatsappMessage = `NEW REVIEW - TASTE OF INDIA%0A%0AName: ${oldReview.name}%0ADate: ${oldReview.date}%0AReview: ${oldReview.text}`;
        window.open(`https://wa.me/917434841112?text=${whatsappMessage}`, '_blank');
    }
    
    displayReviews();
    alert('Thank you for your review!');
    
    // Clear form
    document.getElementById('review-text').value = '';
    document.getElementById('reviewer-name').value = '';
}

// Display reviews
function displayReviews() {
    const reviewsContainer = document.getElementById('reviews-display');
    
    if (reviews.length === 0) {
        reviewsContainer.innerHTML = '<p style="text-align: center; color: #666;">No reviews yet. Be the first to review!</p>';
        return;
    }
    
    reviewsContainer.innerHTML = reviews.map(review => `
        <div class="review">
            <p>"${review.text}"</p>
            <h4>- ${review.name}</h4>
            <small style="color: #999;">${review.date}</small>
        </div>
    `).join('');
}

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.menu-item, .feature, .review');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in', 'visible');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimations);
// Language switching functionality
function changeLanguage() {
    const selectedLang = document.getElementById('language-select').value;
    const elements = document.querySelectorAll('[data-en], [data-fr]');
    
    elements.forEach(element => {
        if (element.hasAttribute(`data-${selectedLang}`)) {
            element.textContent = element.getAttribute(`data-${selectedLang}`);
        }
        if (element.hasAttribute(`data-${selectedLang}-placeholder`)) {
            element.placeholder = element.getAttribute(`data-${selectedLang}-placeholder`);
        }
    });
    
    // Update menu item descriptions
    if (selectedLang === 'fr') {
        menuItems[0].description = "Pâte croustillante farcie aux pommes de terre épicées et petits pois (4 pièces)";
        menuItems[1].description = "Beignets de légumes frits avec chutney à la menthe (par assiette)";
        menuItems[2].description = "Beignets de lentilles croustillants servis avec chutney de coco (par pièce)";
        menuItems[3].description = "Coquilles croustillantes remplies d'eau épicée et de chutneys (par assiette)";
        menuItems[4].description = "Boisson crémeuse au yaourt avec saveur vanille (par verre)";
        menuItems[5].description = "Douceur gujarati traditionnelle à base de farine de blé et jaggery (par pièce)";
    } else {
        menuItems[0].description = "Crispy pastry filled with spiced potatoes and peas (4 pieces)";
        menuItems[1].description = "Deep-fried vegetable fritters with mint chutney (per plate)";
        menuItems[2].description = "Crispy lentil donuts served with coconut chutney (per piece)";
        menuItems[3].description = "Crispy shells filled with spiced water and chutneys (per plate)";
        menuItems[4].description = "Creamy yogurt drink with vanilla flavor (per glass)";
        menuItems[5].description = "Traditional Gujarati sweet made with wheat flour and jaggery (per piece)";
    }
    
    displayMenuItems(menuItems);
}

window.addEventListener('load', () => {
    displayReviews();
    handleScrollAnimations();
});

// Checkout functionality
document.querySelector('.checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Get customer information
    const customerName = document.getElementById('customer-name').value.trim();
    const customerPhone = document.getElementById('customer-phone').value.trim();
    const customerEmail = document.getElementById('customer-email').value.trim();
    
    if (!customerName || !customerPhone || !customerEmail) {
        alert('Please fill in all your details (Name, Phone, Email)');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create order details
    const orderDetails = cart.map(item => `${item.name} x${item.quantity} - €${(item.price * item.quantity).toFixed(2)}`).join('%0A');
    const orderSummary = `NEW ORDER - TASTE OF INDIA%0A%0ACustomer Details:%0AName: ${customerName}%0APhone: ${customerPhone}%0AEmail: ${customerEmail}%0A%0AOrder Details:%0A${orderDetails}%0A%0ATotal: €${total.toFixed(2)}`;
    
    // Send via WhatsApp to phone number
    const whatsappUrl = `https://wa.me/917434841112?text=${orderSummary}`;
    window.open(whatsappUrl, '_blank');
    
    // Also create email link as backup
    const emailBody = `NEW ORDER - TASTE OF INDIA\n\nCustomer Details:\nName: ${customerName}\nPhone: ${customerPhone}\nEmail: ${customerEmail}\n\nOrder Details:\n${cart.map(item => `${item.name} x${item.quantity} - €${(item.price * item.quantity).toFixed(2)}`).join('\n')}\n\nTotal: €${total.toFixed(2)}`;
    const emailUrl = `mailto:Jankikbhadaniya@gmail.com?subject=New Order - Taste Of India&body=${encodeURIComponent(emailBody)}`;
    
    setTimeout(() => {
        if (confirm('Order sent via WhatsApp! Would you also like to send via email?')) {
            window.open(emailUrl, '_blank');
        }
    }, 1000);
    
    alert(`Order placed! Total: €${total.toFixed(2)}\nThank you for choosing Taste Of India!`);
    
    // Clear cart and form
    cart = [];
    updateCartDisplay();
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-phone').value = '';
    document.getElementById('customer-email').value = '';
    cartModal.style.display = 'none';
});