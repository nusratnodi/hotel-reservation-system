// Initialize users and currentUser from localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const hotels = [
  {
    id: 1,
    name: "Pan Pacific Sonargaon Dhaka",
    price: "12,500",
    location: "107 Kazi Nazrul Islam Avenue, Dhaka 1215",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/92583733.jpg?k=f3c24f18283ca132bf9069bd15169a65619c8e334abb7fe40083bedd06215cdd&o=&hp=1",
    description:
      "Luxury 5-star hotel in the heart of Dhaka with excellent amenities and service.",
  },
  {
    id: 2,
    name: "Radisson Blu Dhaka Water Garden",
    price: "11,200",
    location: "Kurmitola, Airport Road, Dhaka 1206",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/46/7f/a7/radisson-blu-dhaka-water.jpg?w=700&h=-1&s=1",
    description:
      "Modern hotel with beautiful water garden, located near the airport.",
  },
  {
    id: 3,
    name: "The Westin Dhaka",
    price: "13,800",
    location: "Plot CEN 16, Road 106, Gulshan 2, Dhaka 1212",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/630407098.jpg?k=2cc779d78f0d8a745a4062e320bf1fc5f7d911dc7821559682523e88620d4b76&o=&hp=1",
    description:
      "Premium 5-star hotel in Gulshan offering world-class hospitality.",
  },
  {
    id: 4,
    name: "InterContinental Dhaka",
    price: "10,900",
    location: "1 Minto Road, Dhaka 1000",
    image:
      "https://digital.ihg.com/is/image/ihg/intercontinental-dhaka-8304538615-2x1",
    description:
      "Iconic hotel in central Dhaka with rich history and excellent facilities.",
  },
  {
    id: 5,
    name: "Sheraton",
    price: "15,800",
    location: "44 Kemal Ataturk Ave, Banani",
    image:
      "https://cache.marriott.com/content/dam/marriott-renditions/DACSI/dacsi-exterior-3237-hor-pano.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1920px:*",
    description: "One of the oldest and most prestigious hotels in Dhaka.",
  },
  {
    id: 6,
    name: "Long Beach Hotel Cox's Bazar",
    price: "8,500",
    location: "14 Kalatoli, Cox's Bazar 4700",
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/283183777.jpg?k=899b1542446c88268f790cf9968ddeffe42a7b24c7b228069de09413d5275822&o=&hp=1",
    description:
      "Beachfront property with stunning views of the Bay of Bengal.",
  },
  {
    id: 7,
    name: "Royal Tulip Sea Pearl Beach Resort",
    price: "9,800",
    location: "Marine Drive, Cox's Bazar 4700",
    image:
      "https://seapearlcoxsbazar.com/20230826135945im_/http_/www.seapearlcoxsbazar.com/images/rt001.jpg",
    description: "Luxury resort offering premium beachside accommodation.",
  },
  {
    id: 8,
    name: "Grand Sultan Tea Resort & Golf",
    price: "7,200",
    location: "Sreemangal, Moulvibazar 3210",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/0f/32/e8/grand-sultan-tea-resort.jpg?w=500&h=-1&s=1",
    description: "Unique tea garden resort with golf course in Sylhet region.",
  },
  {
    id: 9,
    name: "The Peninsula Chittagong",
    price: "6,500",
    location: "Nizam Road, Chittagong 4000",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjE_8lLF1PkV809ssPwxUiM2egMiiOUNROQg&s",
    description: "Elegant hotel in the commercial capital of Bangladesh.",
  },
];

// Save data to localStorage
function saveToLocalStorage() {
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  localStorage.setItem("cart", JSON.stringify(cart));
}

function initializePage(page) {
  // Update UI based on currentUser
  const userStatus = document.getElementById("user-status");
  const loginLink = document.getElementById("login-link");
  const signupLink = document.getElementById("signup-link");
  const logoutLink = document.getElementById("logout-link");

  if (currentUser) {
    if (userStatus) {
      userStatus.textContent = `Welcome, ${currentUser.username || "Guest"}`;
      userStatus.style.display = "inline";
    }
    if (loginLink) loginLink.style.display = "none";
    if (signupLink) signupLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "inline";
  } else {
    if (userStatus) userStatus.style.display = "none";
    if (loginLink) loginLink.style.display = "inline";
    if (signupLink) signupLink.style.display = "inline";
    if (logoutLink) logoutLink.style.display = "none";
  }

  if (page === "home") {
    displayHotels();
  } else if (page === "cart") {
    displayCart();
  }
}

function displayHotels() {
  const hotelList = document.getElementById("hotel-list");
  if (!hotelList) return;
  hotelList.innerHTML = "";
  hotels.forEach((hotel) => {
    const hotelDiv = document.createElement("div");
    hotelDiv.className = "hotel-card";
    hotelDiv.innerHTML = `
      <img src="${hotel.image}" alt="${hotel.name}">
      <div class="hotel-card-content">
        <h3>${hotel.name}</h3>
        <p><strong>Location:</strong> ${hotel.location}</p>
        <p><strong>Price:</strong> BDT ${hotel.price}/night</p>
        <p class="hotel-description">${hotel.description}</p>
        <button onclick="addToCart(${hotel.id})" ${
      !currentUser ? "disabled" : ""
    }>
          Book Now
        </button>
      </div>
    `;
    hotelList.appendChild(hotelDiv);
  });
}

function addToCart(hotelId) {
  if (!currentUser) {
    alert("Please login to add hotels to cart.");
    window.location.href = "login.html";
    return;
  }

  const hotel = hotels.find((h) => h.id === hotelId);
  if (!hotel) return;

  const existingItem = cart.find((item) => item.id === hotelId);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({
      ...hotel,
      quantity: 1,
      dateAdded: new Date().toISOString(),
    });
  }

  saveToLocalStorage();
  alert(`${hotel.name} added to cart!`);
  displayCart();
}

function removeFromCart(hotelId) {
  cart = cart.filter((item) => item.id !== hotelId);
  saveToLocalStorage();
  displayCart();
}

function updateCartItemQuantity(hotelId, newQuantity) {
  const item = cart.find((item) => item.id === hotelId);
  if (item) {
    item.quantity = Math.max(1, newQuantity);
    saveToLocalStorage();
    displayCart();
  }
}

function showCart() {
  if (!currentUser) {
    alert("Please login to view cart.");
    window.location.href = "login.html";
    return;
  }

  const homeSection = document.getElementById("home");
  const cartSection = document.getElementById("cart");

  if (homeSection && cartSection) {
    homeSection.style.display = "none";
    cartSection.style.display = "block";
    displayCart();
  }
}

function displayCart() {
  const cartItems = document.getElementById("cart-items");
  if (!cartItems) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const itemTotal =
      parseInt(item.price.replace(/,/g, "")) * (item.quantity || 1);
    total += itemTotal;

    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>BDT ${item.price}/night</p>
        <div class="quantity-controls">
          <button onclick="updateCartItemQuantity(${item.id}, ${
      (item.quantity || 1) - 1
    })">-</button>
          <span>${item.quantity || 1}</span>
          <button onclick="updateCartItemQuantity(${item.id}, ${
      (item.quantity || 1) + 1
    })">+</button>
        </div>
        <p class="item-total">Total: BDT ${itemTotal.toLocaleString()}</p>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${
        item.id
      })">Remove</button>
    `;
    cartItems.appendChild(li);
  });

  // Add checkout section
  const checkoutDiv = document.createElement("div");
  checkoutDiv.className = "checkout-section";
  checkoutDiv.innerHTML = `
    <h3>Order Summary</h3>
    <p>Total Items: ${cart.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    )}</p>
    <p class="total-amount">Total Amount: BDT ${total.toLocaleString()}</p>
    <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
  `;
  cartItems.appendChild(checkoutDiv);
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Thank you for your booking! Your reservation has been confirmed.");
  cart = [];
  saveToLocalStorage();
  displayCart();

  // Show home section
  document.getElementById("home").style.display = "block";
  document.getElementById("cart").style.display = "none";
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
  const re = /^\+?(88)?0?1[3-9]\d{8}$/; // Bangladeshi phone number pattern
  return re.test(phone);
}

function validateDob(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return birthDate <= today && age >= 18;
}

function validateSignup(event) {
  event.preventDefault();

  // Get all form values
  const formData = {
    firstname: document.getElementById("signup-firstname").value.trim(),
    lastname: document.getElementById("signup-lastname").value.trim(),
    username: document.getElementById("signup-username").value.trim(),
    email: document.getElementById("signup-email").value.trim(),
    phone: document.getElementById("signup-phone").value.trim(),
    dob: document.getElementById("signup-dob").value,
    password: document.getElementById("signup-password").value,
  };

  // Reset all error messages
  const errorIds = [
    "signup-firstname-error",
    "signup-lastname-error",
    "signup-username-error",
    "signup-email-error",
    "signup-phone-error",
    "signup-dob-error",
    "signup-password-error",
  ];

  errorIds.forEach((id) => {
    document.getElementById(id).textContent = "";
  });

  let isValid = true;

  // Validate First Name
  if (!formData.firstname) {
    document.getElementById("signup-firstname-error").textContent =
      "First name is required";
    isValid = false;
  } else if (!validateName(formData.firstname)) {
    document.getElementById("signup-firstname-error").textContent =
      "Must be at least 2 characters and contain only letters";
    isValid = false;
  }

  // Validate Last Name
  if (!formData.lastname) {
    document.getElementById("signup-lastname-error").textContent =
      "Last name is required";
    isValid = false;
  } else if (!validateName(formData.lastname)) {
    document.getElementById("signup-lastname-error").textContent =
      "Must be at least 2 characters and contain only letters";
    isValid = false;
  }

  // Validate Username
  if (!formData.username) {
    document.getElementById("signup-username-error").textContent =
      "Username is required";
    isValid = false;
  } else if (!validateUsername(formData.username)) {
    document.getElementById("signup-username-error").textContent =
      "Must be at least 3 characters";
    isValid = false;
  } else if (users.some((user) => user.username === formData.username)) {
    document.getElementById("signup-username-error").textContent =
      "Username already taken";
    isValid = false;
  }

  // Validate Email
  if (!formData.email) {
    document.getElementById("signup-email-error").textContent =
      "Email is required";
    isValid = false;
  } else if (!validateEmail(formData.email)) {
    document.getElementById("signup-email-error").textContent =
      "Please enter a valid email";
    isValid = false;
  } else if (users.some((user) => user.email === formData.email)) {
    document.getElementById("signup-email-error").textContent =
      "Email already registered";
    isValid = false;
  }

  // Validate Phone
  if (!formData.phone) {
    document.getElementById("signup-phone-error").textContent =
      "Phone number is required";
    isValid = false;
  } else if (!validatePhone(formData.phone)) {
    document.getElementById("signup-phone-error").textContent =
      "Please enter a valid Bangladeshi phone number";
    isValid = false;
  }

  // Validate Date of Birth
  if (!formData.dob) {
    document.getElementById("signup-dob-error").textContent =
      "Date of birth is required";
    isValid = false;
  } else if (!validateDob(formData.dob)) {
    document.getElementById("signup-dob-error").textContent =
      "You must be at least 18 years old";
    isValid = false;
  }

  // Validate Password
  if (!formData.password) {
    document.getElementById("signup-password-error").textContent =
      "Password is required";
    isValid = false;
  } else if (formData.password.length < 6) {
    document.getElementById("signup-password-error").textContent =
      "Password must be at least 6 characters";
    isValid = false;
  }

  // If all validations pass
  if (isValid) {
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    currentUser = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };

    saveToLocalStorage();
    alert("Signup successful! You are now logged in.");
    window.location.href = "index.html";
  }
}

function login(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  // Reset error messages
  document.getElementById("login-email-error").textContent = "";
  document.getElementById("login-password-error").textContent = "";

  let isValid = true;

  // Validate email
  if (!email) {
    document.getElementById("login-email-error").textContent =
      "This field is required";
    isValid = false;
  } else if (!validateEmail(email)) {
    document.getElementById("login-email-error").textContent =
      "Please enter a valid email";
    isValid = false;
  }

  // Validate password
  if (!password) {
    document.getElementById("login-password-error").textContent =
      "This field is required";
    isValid = false;
  } else if (password.length < 6) {
    document.getElementById("login-password-error").textContent =
      "Password must be at least 6 characters";
    isValid = false;
  }

  if (isValid) {
    // Find user
    const user = users.find((u) => u.email === email);

    if (!user) {
      document.getElementById("login-email-error").textContent =
        "No account found with this email";
      isValid = false;
    } else if (user.password !== password) {
      document.getElementById("login-password-error").textContent =
        "Incorrect password";
      isValid = false;
    } else {
      // Login successful
      currentUser = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      saveToLocalStorage();
      alert("Login successful!");
      window.location.href = "index.html";
    }
  }

  return isValid;
}

function logout() {
  currentUser = null;
  saveToLocalStorage();
  window.location.href = "index.html";
}

function handleSearch(event) {
  event.preventDefault();
  const checkIn = document.getElementById("check-in").value;
  const checkOut = document.getElementById("check-out").value;
  const destination = document
    .getElementById("destination")
    .value.trim()
    .toLowerCase();
  const rooms = document.getElementById("rooms").value;

  if (!checkIn || !checkOut || !destination || !rooms) {
    alert("Please fill in all search fields.");
    return;
  }

  if (new Date(checkOut) <= new Date(checkIn)) {
    alert("Check-out date must be after check-in date.");
    return;
  }

  const filteredHotels = hotels.filter((hotel) =>
    hotel.location.toLowerCase().includes(destination)
  );

  const hotelList = document.getElementById("hotel-list");
  if (!hotelList) return;
  hotelList.innerHTML = "";

  if (filteredHotels.length === 0) {
    hotelList.innerHTML =
      '<p style="text-align: center; color: #dc2626;">No hotels found for this destination.</p>';
  } else {
    filteredHotels.forEach((hotel) => {
      const hotelDiv = document.createElement("div");
      hotelDiv.className = "hotel-card";
      hotelDiv.innerHTML = `
        <img src="${hotel.image}" alt="${hotel.name}">
        <div class="hotel-card-content">
          <h3>${hotel.name}</h3>
          <p><strong>Location:</strong> ${hotel.location}</p>
          <p><strong>Price:</strong> BDT ${hotel.price}/night</p>
          <p class="hotel-description">${hotel.description}</p>
          <button onclick="addToCart(${hotel.id})" ${
        !currentUser ? "disabled" : ""
      }>
            Add to Cart
          </button>
        </div>
      `;
      hotelList.appendChild(hotelDiv);
    });
  }
}

// Reload to home
document.getElementById("logo", () => {
  window.location.href = "index.html";
});
// Initialize the page when loaded
document.addEventListener("DOMContentLoaded", () => {
  initializePage("home");

  const searchForm = document.getElementById("search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", handleSearch);
  }
});
