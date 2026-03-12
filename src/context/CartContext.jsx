import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('tc-cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('tc-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (product, qty = 1) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.productId === product.id);
      if (exists) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, {
        productId: product.id,
        name: product.name,
        nameAr: product.nameAr,
        price: product.price,
        image: product.images[0],
        quantity: qty
      }];
    });
  };

  const removeItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) { removeItem(productId); return; }
    setCartItems(prev => prev.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQuantity, clearCart, cartCount, total }}>
      {children}
    </CartContext.Provider>
  );
}
