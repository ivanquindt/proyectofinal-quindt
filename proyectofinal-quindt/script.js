
const perfumes = [
    {
        id: 1,
        name: 'Chanel No. 5',
        price: 99.99,
        description: 'Un clásico intemporal que evoca la elegancia y el lujo. Su aroma floral y aldehídico lo convierte en una elección perfecta para cualquier ocasión.',
        image: 'https://www.chanel.com/images/c_2_2_0/chanel-no5-eau-de-parfum.jpg',
    },
    {
        id: 2,
        name: 'Dior Sauvage',
        price: 89.99,
        description: 'Una fragancia fresca y potente, ideal para el hombre moderno. Con notas de bergamota y ambroxan, es una declaración de libertad.',
        image: 'https://www.dior.com/couture/var/dior/storage/images/media/dior-fragrance/11.4-28523.jpg',
    },
    {
        id: 3,
        name: 'Yves Saint Laurent Black Opium',
        price: 79.99,
        description: 'Una fragancia dulce y seductora que ilumina la noche. Su mezcla de café y vainilla la convierte en la elección perfecta para una salida especial.',
        image: 'https://www.yslbeauty.com/on/demandware.static/-/Sites-ysl-master-catalog/default/dw6469b206/images/large/3605971280240.jpg',
    },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];


const renderProducts = (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'col-md-4';
        productElement.innerHTML = `
            <div class="product card mb-4">
                <img src="${product.image}" alt="${product.name}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="font-weight-bold">Precio: $${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al carrito</button>
                </div>
            </div>
        `;
        productList.appendChild(productElement);
    });
};


const addToCart = (id) => {
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: id, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification();
};


const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
};


const showNotification = () => {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
};


const toggleCart = () => {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    renderCartItems();
};


const renderCartItems = () => {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>El carrito está vacío.</p>';
        cartTotal.innerHTML = '';
        return;
    }

    cart.forEach(item => {
        const product = perfumes.find(p => p.id === item.id);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        cartItems.innerHTML += `
            <div class="d-flex justify-content-between align-items-center">
                <span>${product.name} - Cantidad: ${item.quantity} - Precio: $${itemTotal.toFixed(2)}</span>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Eliminar</button>
            </div>
        `;
    });

    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
};



const updateCartCount = () => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = count;
};


const openCheckoutModal = () => {
    toggleCart();  
    toggleCheckoutModal();  
};


const toggleCheckoutModal = () => {
    const modal = document.getElementById('checkout-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
};


const submitCheckout = () => {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    if (name && address && phone) {
        alert(`Compra realizada con éxito!\nNombre: ${name}\nDirección: ${address}\nTeléfono: ${phone}`);
        cart = [];
        localStorage.removeItem('cart');
        updateCartCount();
        toggleCheckoutModal();
    } else {
        alert("Por favor, completa todos los campos.");
    }
};


document.addEventListener('DOMContentLoaded', () => {
    renderProducts(perfumes);
    updateCartCount();
});
