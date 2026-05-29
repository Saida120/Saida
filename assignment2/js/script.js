/* Marz Reservec JavaScript for navigation, forms, recommendations and bill calculator. */
const restaurants = [
    { id: "yugen", name: "Yūgen Dining", cuisine: "Modern Japanese / Asian fusion", deposit: 60, lowPrice: 180, highPrice: 260, image: "images/yugen.jpg", tags: ["seafood", "gluten-free", "date", "business", "celebration", "luxury"], reason: "A dramatic underground restaurant for premium Japanese-inspired dining and special occasions." },
    { id: "minamishima", name: "Minamishima", cuisine: "Japanese omakase / sushi", deposit: 90, lowPrice: 225, highPrice: 325, image: "images/minamishima.jpg", tags: ["seafood", "date", "business", "solo", "celebration", "luxury"], reason: "Best for guests who want a quiet, precise omakase experience focused on sushi and seafood." },
    { id: "nomad", name: "Nomad", cuisine: "Contemporary Australian / Mediterranean", deposit: 45, lowPrice: 95, highPrice: 170, image: "images/nomad.jpg", tags: ["none", "vegetarian", "gluten-free", "family", "business", "celebration", "mid"], reason: "A flexible shared-menu venue that works well for groups, business meals and relaxed celebrations." },
    { id: "ides", name: "Ides", cuisine: "Modern Australian tasting menu", deposit: 50, lowPrice: 55, highPrice: 166, image: "images/ides.jpg", tags: ["none", "date", "celebration", "solo", "mid", "luxury"], reason: "A moody and creative choice for diners who like tasting menus, bar energy and surprise-driven dishes." },
    { id: "lona-misa", name: "Lona Misa", cuisine: "Vegan / Latin-inspired dining", deposit: 30, lowPrice: 45, highPrice: 90, image: "images/lona-misa.jpg", tags: ["vegan", "vegetarian", "halal-friendly", "gluten-free", "family", "date", "low"], reason: "The strongest match for vegan, vegetarian and halal-friendly diners because the menu is plant-based." },
    { id: "il-bacaro", name: "Il Bacaro", cuisine: "Italian / Venetian", deposit: 45, lowPrice: 85, highPrice: 150, image: "images/il-bacaro.jpg", tags: ["vegetarian", "date", "business", "celebration", "mid"], reason: "A classic CBD Italian restaurant for romantic dinners, professional meals and refined familiar flavours." }
];

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const byId = (id) => document.getElementById(id);
const value = (id) => byId(id)?.value.trim() || "";
const restaurantById = (id) => restaurants.find((item) => item.id === id);
const emailOk = (text) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim());
const money = (amount) => `$${Math.round(amount).toLocaleString("en-AU")}`;

function setError(id, message = "") {
    const field = byId(`${id}-error`);
    if (field) field.textContent = message;
    return !message;
}

function clearErrors(ids) {
    ids.forEach((id) => setError(id));
}

function fail(id, message) {
    setError(id, message);
    return false;
}

/* Shared navigation and reveal animation. */
function setupLayout() {
    const page = document.body.dataset.page;
    $$(".site-nav a").forEach((link) => {
        const active = link.dataset.page === page;
        link.classList.toggle("active", active);
        active ? link.setAttribute("aria-current", "page") : link.removeAttribute("aria-current");
    });

    const nav = byId("site-nav"), toggle = $(".nav-toggle");
    toggle?.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
    });
    $$("a", nav || document).forEach((link) => link.addEventListener("click", () => {
        nav?.classList.remove("open");
        toggle?.setAttribute("aria-expanded", "false");
    }));

    const revealItems = $$(".reveal");
    if (!("IntersectionObserver" in window)) return revealItems.forEach((item) => item.classList.add("is-visible"));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        }
    }), { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
}

/* Rule-based scoring for the recommendation page. */
function setupRecommendations() {
    const form = byId("recommendation-form"), results = byId("recommendation-results");
    if (!form || !results) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const fields = ["dietaryPreference", "budgetRange", "diningPurpose"];
        const [diet, budget, purpose] = fields.map(value);
        clearErrors(fields);

        let valid = true;
        if (!diet) valid = fail("dietaryPreference", "Please select a dietary preference.");
        if (!budget) valid = fail("budgetRange", "Please select a budget range.");
        if (!purpose) valid = fail("diningPurpose", "Please select a dining purpose.");
        if (!valid) return;

        const matches = restaurants.map((restaurant) => {
            let score = 0;
            const reasons = [];
            const avg = (restaurant.lowPrice + restaurant.highPrice) / 2;
            const tag = (name) => restaurant.tags.includes(name);
            const add = (points, reason) => { score += points; if (reason) reasons.push(reason); };

            if (diet === "none") add(1);
            else if (tag(diet)) add(5, `Matches ${diet.replace("-", " ")} preference`);
            else if (diet === "halal-friendly" && tag("vegetarian")) add(3, "Has vegetarian-friendly options; confirm halal requirements when booking");

            if (budget === "low" && avg <= 90) add(4, "Fits the lower budget range");
            else if (budget === "mid" && avg > 90 && avg <= 150) add(4, "Fits the mid budget range");
            else if (budget === "luxury" && avg > 150) add(4, "Fits the luxury budget range");
            else if (budget === "mid" && restaurant.lowPrice <= 150) add(2, "Has menu options close to your budget");
            if (tag(purpose)) add(4, `Suitable for ${purpose.replace("-", " ")}`);
            return { ...restaurant, score, reasons };
        }).sort((a, b) => b.score - a.score).slice(0, 3);

        results.innerHTML = matches.map((restaurant) => `
            <article class="result-card">
                <img src="${restaurant.image}" alt="${restaurant.name} restaurant interior">
                <div>
                    <p class="eyebrow">${restaurant.cuisine}</p>
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.reason}</p>
                    <div class="match-tags">${(restaurant.reasons.length ? restaurant.reasons : ["Balanced recommendation"]).map((reason) => `<span>${reason}</span>`).join("")}</div>
                    <p><strong>Deposit:</strong> $${restaurant.deposit} · <strong>Guide:</strong> $${restaurant.lowPrice}–$${restaurant.highPrice} pp</p>
                    <a class="button button-outline" href="reservation.html?restaurant=${restaurant.id}">Select and reserve</a>
                </div>
            </article>`).join("");
    });
}

/* Registration validation required by the brief. */
function setupRegisterValidation() {
    const form = byId("register-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        const fields = ["username", "regEmail", "regPhone", "password", "confirmPassword", "gender", "dietaryRegister", "country"];
        const data = Object.fromEntries(fields.map((id) => [id, value(id)]));
        const gender = $('input[name="gender"]:checked');
        let valid = true;

        clearErrors(fields);
        byId("register-success").textContent = "";
        if (!/^[A-Za-z0-9_]{5,}$/.test(data.username)) valid = fail("username", "Username must be at least 5 characters and use only letters, numbers and underscores.");
        if (!emailOk(data.regEmail)) valid = fail("regEmail", "Enter a valid email address.");
        if (!/^\d{8,15}$/.test(data.regPhone)) valid = fail("regPhone", "Phone number must contain digits only and be 8 to 15 digits long.");
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/.test(byId("password").value)) valid = fail("password", "Password must be 10+ characters and include uppercase, lowercase, number and special character.");
        if (!byId("confirmPassword").value || byId("confirmPassword").value !== byId("password").value) valid = fail("confirmPassword", "Confirm password must match the password.");
        if (!gender) valid = fail("gender", "Please select a gender option.");
        if (!data.dietaryRegister) valid = fail("dietaryRegister", "Please select a dietary preference.");
        if (!data.country) valid = fail("country", "Please select a country or region.");

        if (!valid) event.preventDefault();
        else byId("register-success").textContent = "Registration details passed validation. Submitting to the test server now.";
    });
}

/* Reservation page: deposit, payment fields, pre-fill and validation. */
function setupReservationForm() {
    const form = byId("reservation-form"), restaurantSelect = byId("restaurantSelect");
    if (!form || !restaurantSelect) return;

    const depositMethod = byId("depositMethod"), bookingEmail = byId("bookingEmail"), billingEmail = byId("billingEmail"), sameAsEmail = byId("sameAsEmail");
    const syncBilling = () => { if (sameAsEmail.checked) billingEmail.value = bookingEmail.value; };
    const updateDeposit = () => byId("depositAmount").value = restaurantById(restaurantSelect.value) ? `$${restaurantById(restaurantSelect.value).deposit}` : "Select restaurant first";
    const updatePayment = () => {
        byId("voucher-fields").classList.toggle("hidden", depositMethod.value !== "voucher");
        byId("card-fields").classList.toggle("hidden", depositMethod.value !== "online");
    };

    const chosen = new URLSearchParams(location.search).get("restaurant");
    if (restaurantById(chosen)) restaurantSelect.value = chosen;
    restaurantSelect.addEventListener("change", updateDeposit);
    depositMethod.addEventListener("change", updatePayment);
    sameAsEmail.addEventListener("change", syncBilling);
    bookingEmail.addEventListener("input", syncBilling);
    updateDeposit();
    updatePayment();

    form.addEventListener("submit", (event) => {
        const fields = ["fullName", "bookingEmail", "bookingPhone", "restaurantSelect", "reservationDateTime", "peopleCount", "depositMethod", "cardType", "cardNumber", "billingEmail"];
        const method = value("depositMethod"), cardType = value("cardType"), cardNumber = value("cardNumber").replace(/\s+/g, "");
        let valid = true;

        clearErrors(fields);
        byId("reservation-success").textContent = "";
        if (!value("fullName")) valid = fail("fullName", "Full name is required.");
        if (!emailOk(value("bookingEmail"))) valid = fail("bookingEmail", "Enter a valid email address.");
        if (!/^\d{10,}$/.test(value("bookingPhone"))) valid = fail("bookingPhone", "Phone number must contain at least 10 digits.");
        if (!value("restaurantSelect")) valid = fail("restaurantSelect", "Please select a restaurant.");
        if (!value("reservationDateTime") || new Date(value("reservationDateTime")) < new Date()) valid = fail("reservationDateTime", "Reservation date and time must not be in the past.");
        if (Number(value("peopleCount")) <= 0) valid = fail("peopleCount", "Number of people must be greater than 0.");
        if (!method) valid = fail("depositMethod", "Please choose a deposit method.");
        if (!emailOk(value("billingEmail"))) valid = fail("billingEmail", "Enter a valid billing email address.");

        if (method === "online") {
            if (!cardType) valid = fail("cardType", "Please select Visa, Mastercard or Amex.");
            if (!/^\d+$/.test(cardNumber)) valid = fail("cardNumber", "Credit card number must contain digits only.");
            else if (["visa", "mastercard"].includes(cardType) && cardNumber.length !== 16) valid = fail("cardNumber", "Visa and Mastercard numbers must be 16 digits.");
            else if (cardType === "amex" && cardNumber.length !== 15) valid = fail("cardNumber", "Amex numbers must be 15 digits.");
        }

        if (!valid) event.preventDefault();
        else byId("reservation-success").textContent = "Reservation details passed validation. Submitting to the Mercury test server now.";
    });
}



document.addEventListener("DOMContentLoaded", () => {
    setupLayout();
    setupRecommendations();
    setupRegisterValidation();
    setupReservationForm();
});
