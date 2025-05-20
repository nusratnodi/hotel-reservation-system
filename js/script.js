let users = [];
let currentUser = null;
let cart = [];

const hotels = [
    {
        id: 1,
        name: "Sayeman Beach Resort",
        price: "5,239",
        location: "Kolatoli, Cox's Bazar, Chattogram, Chattogram, Bangladesh",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/46/7f/a7/radisson-blu-dhaka-water.jpg?w=700&h=-1&s=1"
    },
    {
        id: 2,
        name: "Ramada by Wyndham Cox's Bazar",
        price: "6,985",
        location: "Kolatoli, Cox's Bazar, Chattogram, Chattogram, Bangladesh",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/46/7f/a7/radisson-blu-dhaka-water.jpg?w=700&h=-1&s=1"
    },
    {
        id: 3,
        name: "Baywatch Cox's Bazar",
        price: "7,639",
        location: "Inani, Cox's Bazar, Chattogram, Chattogram, Bangladesh",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/46/7f/a7/radisson-blu-dhaka-water.jpg?w=700&h=-1&s=1"
    },
    {
        id: 4,
        name: "Sayeman Beach Resort",
        price: "5,239",
        location: "Kolatoli, Cox's Bazar, Chattogram, Chattogram, Bangladesh",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/46/7f/a7/radisson-blu-dhaka-water.jpg?w=700&h=-1&s=1"
    },
    {
        id: 5,
        name: "Ramada by Wyndham Cox's Bazar",
        price: "6,985",
        location: "Kolatoli, Cox's Bazar, Chattogram, Chattogram, Bangladesh",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/46/7f/a7/radisson-blu-dhaka-water.jpg?w=700&h=-1&s=1"
    },
    {
        id: 6,
        name: "Baywatch Cox's Bazar",
        price: "7,639",
        location: "Inani, Cox's Bazar, Chattogram, Chattogram, Bangladesh",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/46/7f/a7/radisson-blu-dhaka-water.jpg?w=700&h=-1&s=1"
    },
    {
        id: 7,
        name: "Sayeman Beach Resort",
        price: "5,239",
        location: "Kolatoli, Cox's Bazar, Chattogram, Chattogram, Bangladesh",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/46/7f/a7/radisson-blu-dhaka-water.jpg?w=700&h=-1&s=1"
    },
    {
        id: 8,
        name: "Ramada by Wyndham Cox's Bazar",
        price: "6,985",
        location: "Kolatoli, Cox's Bazar, Chattogram, Chattogram, Bangladesh",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/46/7f/a7/radisson-blu-dhaka-water.jpg?w=700&h=-1&s=1"
    },
    {
        id: 9,
        name: "Baywatch Cox's Bazar",
        price: "7,639",
        location: "Inani, Cox's Bazar, Chattogram, Chattogram, Bangladesh",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/46/7f/a7/radisson-blu-dhaka-water.jpg?w=700&h=-1&s=1"
    }
];

function initializePage(page) {
    if (currentUser) {
        const userStatus = document.getElementById('user-status');
        const loginLink = document.getElementById('login-link');
        const signupLink = document.getElementById('signup-link');
        const logoutLink = document.getElementById('logout-link');
        if (userStatus) userStatus.textContent = `Welcome, ${currentUser.username}`;
        if (userStatus) userStatus.style.display = 'inline';
        if (loginLink) loginLink.style.display = 'none';
        if (signupLink) signupLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'inline';
    }

    if (page === 'home') {
        displayHotels();
    } else if (page === 'cart') {
        displayCart();
    }
}

function displayHotels() {
    const hotelList = document.getElementById('hotel-list');
    if (!hotelList) return;
    hotelList.innerHTML = '';
    hotels.forEach(hotel => {
        const hotelDiv = document.createElement('div');
        hotelDiv.className = 'hotel-card';
        hotelDiv.innerHTML = `
            <img src="${hotel.image}" alt="${hotel.name}">
            <div class="hotel-card-content">
                <h3>${hotel.name}</h3>
                <p>Location: ${hotel.location}</p>
                <p>Price: BDT ${hotel.price}/night</p>
                <button onclick="addToCart(${hotel.id})" ${!currentUser ? 'disabled' : ''}>Add to Cart</button>
            </div>
        `;
        hotelList.appendChild(hotelDiv);
    });
    if (!currentUser) {
        hotelList.innerHTML += '<p style="text-align: center; color: #dc2626;">Please login to add hotels to cart.</p>';
    }
}

function addToCart(hotelId) {
    if (!currentUser) {
        alert('Please login to add hotels to cart.');
        window.location.href = 'login.html';
        return;
    }
    const hotel = hotels.find(h => h.id === hotelId);
    if (!cart.find(item => item.id === hotelId)) {
        cart.push(hotel);
        alert(`${hotel.name} added to cart!`);
        displayCart();
    } else {
        alert('Hotel already in cart!');
    }
}

function showCart() {
    if (!currentUser) {
        alert('Please login to view cart.');
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('home').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - BDT ${item.price}/night
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
            `;
            cartItems.appendChild(li);
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateUsername(username) {
    return username.length >= 3;
}

function validateName(name) {
    return name.length >= 2 && /^[a-zA-Z\s-]+$/.test(name);
}

function validatePhone(phone) {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phone);
}

function validateDob(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return birthDate <= today && age >= 18;
}

function validateSignup(event) {
    event.preventDefault();

    const firstname = document.getElementById('signup-firstname').value.trim();
    const lastname = document.getElementById('signup-lastname').value.trim();
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const phone = document.getElementById('signup-phone').value.trim();
    const dob = document.getElementById('signup-dob').value;
    const password = document.getElementById('signup-password').value;

    document.getElementById('signup-firstname-error').textContent = '';
    document.getElementById('signup-lastname-error').textContent = '';
    document.getElementById('signup-username-error').textContent = '';
    document.getElementById('signup-email-error').textContent = '';
    document.getElementById('signup-phone-error').textContent = '';
    document.getElementById('signup-dob-error').textContent = '';
    document.getElementById('signup-password-error').textContent = '';

    let isValid = true;

    if (!validateName(firstname)) {
        document.getElementById('signup-firstname-error').textContent = 'First name must be at least 2 characters and contain only letters, spaces, or hyphens.';
        isValid = false;
    }

    if (!validateName(lastname)) {
        document.getElementById('signup-lastname-error').textContent = 'Last name must be at least 2 characters and contain only letters, spaces, or hyphens.';
        isValid = false;
    }

    if (!validateUsername(username)) {
        document.getElementById('signup-username-error').textContent = 'Username must be at least 3 characters.';
        isValid = false;
    }

    if (!validateEmail(email)) {
        document.getElementById('signup-email-error').textContent = 'Invalid email format.';
        isValid = false;
    }

    if (!validatePhone(phone)) {
        document.getElementById('signup-phone-error').textContent = 'Invalid phone number (e.g., +1234567890).';
        isValid = false;
    }

    if (!validateDob(dob)) {
        document.getElementById('signup-dob-error').textContent = 'You must be at least 18 years old.';
        isValid = false;
    }

    if (!validatePassword(password)) {
        document.getElementById('signup-password-error').textContent = 'Password must be at least 6 characters.';
        isValid = false;
    }

    if (users.find(user => user.email === email)) {
        document.getElementById('signup-email-error').textContent = 'Email already registered.';
        isValid = false;
    }

    if (users.find(user => user.username === username)) {
        document.getElementById('signup-username-error').textContent = 'Username already taken.';
        isValid = false;
    }

    return isValid;
}
function login(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    document.getElementById('login-email-error').textContent = '';
    document.getElementById('login-password-error').textContent = '';

    let isValid = true;

    if (email === '') {
        document.getElementById('login-email-error').textContent = 'Email is required.';
        isValid = false;
    }

    if (password === '') {
        document.getElementById('login-password-error').textContent = 'Password is required.';
        isValid = false;
    }

    if (isValid) {
        currentUser = { username: 'Guest' };
        alert('Login successful!');
        window.location.href = `index.html?username=Guest`;
        document.getElementById('login-form').reset();
    }

    return isValid;
}


function logout() {
    currentUser = null;
    cart = [];
    window.location.href = 'index.html';
}

function handleSearch(event) {
    event.preventDefault();
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const destination = document.getElementById('destination').value.trim().toLowerCase();
    const rooms = document.getElementById('rooms').value;

    if (!checkIn || !checkOut || !destination || !rooms) {
        alert('Please fill in all search fields.');
        return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
        alert('Check-out date must be after check-in date.');
        return;
    }

    const filteredHotels = hotels.filter(hotel =>
        hotel.location.toLowerCase().includes(destination)
    );

    const hotelList = document.getElementById('hotel-list');
    if (!hotelList) return;
    hotelList.innerHTML = '';
    if (filteredHotels.length === 0) {
        hotelList.innerHTML = '<p style="text-align: center; color: #dc2626;">No hotels found for this destination.</p>';
    } else {
        filteredHotels.forEach(hotel => {
            const hotelDiv = document.createElement('div');
            hotelDiv.className = 'hotel-card';
            hotelDiv.innerHTML = `
                <img src="${hotel.image}" alt="${hotel.name}">
                <div class="hotel-card-content">
                    <h3>${hotel.name}</h3>
                    <p>Location: ${hotel.location}</p>
                    <p>Price: BDT ${hotel.price}/night</p>
                    <button onclick="addToCart(${hotel.id})" ${!currentUser ? 'disabled' : ''}>Add to Cart</button>
                </div>
            `;
            hotelList.appendChild(hotelDiv);
        });
    }

    console.log(`Search: Check-in: ${checkIn}, Check-out: ${checkOut}, Destination: ${destination}, Rooms: ${rooms}`);
}

document.addEventListener('DOMContentLoaded', () => {
    initializePage('home');
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }
});