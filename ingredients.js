// Menu data with ingredients
const menuItems = [
    {
        id: 1,
        name: "Samosa",
        description: "Crispy pastry filled with spiced potatoes and peas",
        price: 5.00,
        category: "appetizers",
        image: "Images/Samosa.jpg.jpeg",
        ingredients: "Farine tout usage, ghee, huile, coriandre, sel, petits pois, pommes de terre, oignons, gingembre, piments et épices indiennes."
    },
    {
        id: 2,
        name: "Pakoras",
        description: "Deep-fried vegetable fritters with mint chutney",
        price: 3.00,
        category: "appetizers",
        image: "Images/Pakora.jpg.jpeg",
        ingredients: "Farine de pois chiche, farine de riz, oignon, piment, carotte, épinards, poivron, pomme de terre, coriandre, sel, citron, bicarbonate de soude, huile, épices indiennes."
    },
    {
        id: 3,
        name: "Vada",
        description: "Crispy lentil donuts served with coconut chutney",
        price: 1.00,
        category: "appetizers",
        image: "Images/vada.jpg.jpeg",
        ingredients: "Farine de pois chiche, sel, bicarbonate de soude, citron et eau. Rembourrage: Pommes de terre, gingembre, piment, ail, coriandre, épices indiennes."
    },
    {
        id: 4,
        name: "Panipuri",
        description: "Crispy shells filled with spiced water and chutneys",
        price: 5.00,
        category: "appetizers",
        image: "Images/Pani Puri.jpg.jpeg",
        ingredients: "Puri: Semoule, farine de blé, sel et eau. Rembourrage: Pommes de terre, pois chiches, sel, épices indiennes. Eau: Menthe, coriandre, gingembre, piment, tamarin, sel, sel noir, sucre, citron, épices indiennes."
    },
    {
        id: 5,
        name: "Lassi Vanilla",
        description: "Creamy yogurt drink with vanilla flavor",
        price: 2.00,
        category: "mains",
        image: "Images/Lassi.jpg.jpeg",
        ingredients: "Yaourt nature, sucre, glace à la vanille, cardamome, noix de cajou et amandes."
    },
    {
        id: 6,
        name: "Churma Laddu Gujju Special",
        description: "Traditional Gujarati sweet made with wheat flour and jaggery",
        price: 1.50,
        category: "desserts",
        image: "Images/Churma ladoo.jpg.jpeg",
        ingredients: "Farine de blé, ghee, jaggery, noix de cajou, amandes, cardamome, noix de muscade, huile."
    }
];

// Get item ID from URL
const urlParams = new URLSearchParams(window.location.search);
const itemId = parseInt(urlParams.get('id'));

// Display ingredient details
document.addEventListener('DOMContentLoaded', function() {
    const item = menuItems.find(item => item.id === itemId);
    const detailsContainer = document.getElementById('ingredient-details');
    
    if (item) {
        detailsContainer.innerHTML = `
            <div class="ingredient-card">
                <img src="${item.image}" alt="${item.name}">
                <div class="ingredient-info">
                    <h2>${item.name}</h2>
                    <p class="description">${item.description}</p>
                    <div class="price">€${item.price}</div>
                    <div class="ingredients">
                        <h3>Ingredients:</h3>
                        <p>${item.ingredients}</p>
                    </div>
                </div>
            </div>
        `;
    } else {
        detailsContainer.innerHTML = '<p>Item not found.</p>';
    }
});