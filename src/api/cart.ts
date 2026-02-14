// Description: Cart management functions
// Endpoint: N/A (Local storage based)
// Request: N/A
// Response: N/A

// Mock localStorage for SSR
const localStorageMock = {
  getItem: () => null,
  setItem: () => { },
  removeItem: () => { },
  clear: () => { },
};

const safeLocalStorage = typeof window !== 'undefined' ? window.localStorage : localStorageMock;

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
  type: 'product' | 'machinery';
}

export const getCart = (): CartItem[] => {
  try {
    const cart = safeLocalStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

export const addToCart = (item: CartItem): void => {
  try {
    const cart = getCart();
    const existingItem = cart.find((i) => i._id === item._id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.push(item);
    }

    safeLocalStorage.setItem('cart', JSON.stringify(cart));
  } catch {
    // Ignore storage errors
  }
};

export const removeFromCart = (itemId: string): void => {
  try {
    const cart = getCart();
    const filtered = cart.filter((i) => i._id !== itemId);
    safeLocalStorage.setItem('cart', JSON.stringify(filtered));
  } catch {
    // Ignore storage errors
  }
};

export const updateCartItem = (itemId: string, quantity: number): void => {
  try {
    const cart = getCart();
    const item = cart.find((i) => i._id === itemId);

    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        removeFromCart(itemId);
      } else {
        safeLocalStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  } catch {
    // Ignore storage errors
  }
};

export const clearCart = (): void => {
  try {
    safeLocalStorage.removeItem('cart');
  } catch {
    // Ignore storage errors
  }
};