document.getElementById('see-more-btn').addEventListener('click', function() {
  const extraSarees = document.querySelectorAll('.product-card.hidden, .product-card:not(.hidden):not(:nth-child(-n+3))');
  const isShowingMore = this.textContent === 'See More';

  if (isShowingMore) {
    document.querySelectorAll('.product-card.hidden').forEach(saree => {
      saree.classList.remove('hidden');
    });
    this.textContent = 'See Less';
  } else {
    document.querySelectorAll('.product-card').forEach((saree, idx) => {
      if (idx > 2) saree.classList.add('hidden');
    });
    this.textContent = 'See More';
  }
});