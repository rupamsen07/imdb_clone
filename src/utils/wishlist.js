const WISHLIST_KEY = 'imdb_wishlist';

export const getWishlist = () => {
  const data = localStorage.getItem(WISHLIST_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveWishlist = (wishlist) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  window.dispatchEvent(new CustomEvent('wishlistUpdated'));
};

export const addToWishlist = (movie) => {
  const wishlist = getWishlist();
  if (!wishlist.find(m => m.id === movie.id)) {
    wishlist.push(movie);
    saveWishlist(wishlist);
  }
};

export const removeFromWishlist = (id) => {
  const wishlist = getWishlist();
  const filtered = wishlist.filter(m => m.id !== id);
  saveWishlist(filtered);
};

export const isWishlisted = (id) => {
  const wishlist = getWishlist();
  return !!wishlist.find(m => m.id === id);
};

export const toggleWishlist = (movie) => {
  if (isWishlisted(movie.id)) {
    removeFromWishlist(movie.id);
  } else {
    addToWishlist(movie);
  }
};
