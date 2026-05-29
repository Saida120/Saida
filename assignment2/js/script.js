function highlightCurrentPage() {
    var page = document.body.dataset.page;
    document.querySelectorAll('.site-nav a').forEach(function(link) {
        if (link.dataset.page === page) link.classList.add('active');
    });
}
window.onload = highlightCurrentPage;
