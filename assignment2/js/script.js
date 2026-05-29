var restaurants = [
    { id: 'yugen', name: 'Yūgen Dining', deposit: 60, image: 'images/yugen.jpg', tags: ['date','business','luxury'] },
    { id: 'minamishima', name: 'Minamishima', deposit: 90, image: 'images/minamishima.jpg', tags: ['date','business','luxury'] },
    { id: 'nomad', name: 'Nomad', deposit: 45, image: 'images/nomad.jpg', tags: ['family','business','mid'] },
    { id: 'ides', name: 'Ides', deposit: 50, image: 'images/ides.jpg', tags: ['date','celebration','mid'] },
    { id: 'lona-misa', name: 'Lona Misa', deposit: 30, image: 'images/lona-misa.jpg', tags: ['vegan','vegetarian','family','low'] },
    { id: 'il-bacaro', name: 'Il Bacaro', deposit: 45, image: 'images/il-bacaro.jpg', tags: ['date','business','mid'] }
];
function getRestaurant(id) { return restaurants.find(function(item) { return item.id === id; }); }
function setupNavigation() {
    var page = document.body.dataset.page;
    document.querySelectorAll('.site-nav a').forEach(function(link) {
        if (link.dataset.page === page) link.classList.add('active');
    });
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (toggle && nav) toggle.onclick = function() { nav.classList.toggle('open'); };
}
function setupRecommendation() {
    var form = document.getElementById('recommendation-form');
    var results = document.getElementById('recommendation-results');
    if (!form || !results) return;
    form.onsubmit = function(event) {
        event.preventDefault();
        var diet = document.getElementById('dietaryPreference').value;
        var purpose = document.getElementById('diningPurpose').value;
        var budget = document.getElementById('budgetRange').value;
        var matches = restaurants.filter(function(r) {
            return r.tags.indexOf(diet) >= 0 || r.tags.indexOf(purpose) >= 0 || r.tags.indexOf(budget) >= 0;
        });
        if (matches.length === 0) matches = restaurants.slice(0, 2);
        results.innerHTML = matches.slice(0, 3).map(function(r) {
            return '<article class="result-card"><img src="' + r.image + '" alt="' + r.name + ' restaurant"><div><h3>' + r.name + '</h3><p>Suggested from your selected preferences.</p><a class="button button-outline" href="reservation.html?restaurant=' + r.id + '">Select and reserve</a></div></article>';
        }).join('');
    };
}
function setupReservation() {
    var restaurantSelect = document.getElementById('restaurantSelect');
    var depositAmount = document.getElementById('depositAmount');
    var depositMethod = document.getElementById('depositMethod');
    if (!restaurantSelect) return;
    var chosen = new URLSearchParams(location.search).get('restaurant');
    if (chosen && getRestaurant(chosen)) restaurantSelect.value = chosen;
    function updateDeposit() {
        var item = getRestaurant(restaurantSelect.value);
        depositAmount.value = item ? '$' + item.deposit : 'Select restaurant first';
    }
    function updatePayment() {
        document.getElementById('voucher-fields').classList.toggle('hidden', depositMethod.value !== 'voucher');
        document.getElementById('card-fields').classList.toggle('hidden', depositMethod.value !== 'online');
    }
    restaurantSelect.onchange = updateDeposit;
    depositMethod.onchange = updatePayment;
    updateDeposit();
    updatePayment();
}
window.onload = function() { setupNavigation(); setupRecommendation(); setupReservation(); };
