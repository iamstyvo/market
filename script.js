// Sample product data - now loaded from localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Conversion rate from USD to RWF (example rate: 1 USD = 1200 RWF)
const USD_TO_RWF_RATE = 1200;

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Add item to cart
function addToCart(productId) {
    // Refresh products from localStorage
    products = JSON.parse(localStorage.getItem('products')) || products;
    
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to cart!`);
    }
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

// Render cart items
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
        if (totalElement) totalElement.textContent = '0 RWF';
        return;
    }
    
    let total = 0;
    let cartHTML = '';
    
    cart.forEach((item, index) => {
        total += item.price;
        // Convert price to RWF
        const priceInRwf = (item.price * USD_TO_RWF_RATE).toFixed(0);
        cartHTML += `
            <div class="cart-item">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-price">${priceInRwf} RWF</p>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });
    
    cartContainer.innerHTML = cartHTML;
    
    if (totalElement) {
        // Convert total to RWF
        const totalInRwf = (total * USD_TO_RWF_RATE).toFixed(0);
        totalElement.textContent = `${totalInRwf} RWF`;
    }
}

// Search products
function searchProducts() {
    // Refresh products from localStorage
    products = JSON.parse(localStorage.getItem('products')) || products;
    
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const searchResults = document.getElementById('search-results');
    
    if (!searchResults) return;
    
    if (searchTerm.trim() === '') {
        searchResults.innerHTML = '';
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.category.toLowerCase().includes(searchTerm)
    );
    
    if (filteredProducts.length === 0) {
        searchResults.innerHTML = '<p>No products found</p>';
        return;
    }
    
    let resultsHTML = '<div class="product-grid">';
    
    filteredProducts.forEach(product => {
        // Convert price to RWF
        const priceInRwf = (product.price * USD_TO_RWF_RATE).toFixed(0);
        resultsHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${priceInRwf} RWF</p>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
    });
    
    resultsHTML += '</div>';
    searchResults.innerHTML = resultsHTML;
}

// Display products by category
function displayCategoryProducts(category) {
    // Refresh products from localStorage
    products = JSON.parse(localStorage.getItem('products')) || products;
    
    const productGrid = document.getElementById('product-grid');
    
    if (!productGrid) return;
    
    const categoryProducts = products.filter(product => product.category === category);
    
    if (categoryProducts.length === 0) {
        productGrid.innerHTML = '<p>No products in this category</p>';
        return;
    }
    
    let productsHTML = '';
    
    categoryProducts.forEach(product => {
        // Convert price to RWF
        const priceInRwf = (product.price * USD_TO_RWF_RATE).toFixed(0);
        productsHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">${priceInRwf} RWF</p>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
    });
    
    productGrid.innerHTML = productsHTML;
}

// Admin login validation
function adminLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'styvo' && password === 'styvo100@') {
        localStorage.setItem('adminLoggedIn', 'true');
        window.location.href = '../admin/dashboard.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

// Check if admin is logged in
function checkAdminAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    const protectedPages = ['dashboard.html', 'upload.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// Admin logout
function adminLogout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add some products first!');
        return;
    }
    window.location.href = 'buy.html';
}

// Delete product (admin only)
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        // Get products from localStorage
        let storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        
        // Filter out the product to be deleted
        storedProducts = storedProducts.filter(product => product.id !== productId);
        
        // Save updated products back to localStorage
        localStorage.setItem('products', JSON.stringify(storedProducts));
        
        // Show success message
        alert('Product deleted successfully!');
        
        // Refresh the page to show updated product list
        location.reload();
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Check if we're on the cart page
    if (document.getElementById('cart-items')) {
        renderCart();
    }
    
    // Check if we're on a category page
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        displayCategoryProducts(category);
    }
    
    // Check admin authentication
    checkAdminAuth();
});