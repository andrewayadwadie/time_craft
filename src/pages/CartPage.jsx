import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { t } = useLanguage();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  return (
    <div className="section container">
      <div className="section-header">
        <h1>{t('navCart')}</h1>
        <div className="gold-line"></div>
      </div>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <ShoppingBag size={64} style={{ color: 'var(--color-border)', marginBottom: 24, display: 'inline-block' }} />
          <h2>{t('emptyCart')}</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 24 }}>{t('startShopping')}</p>
          <Link to="/shop" className="btn btn-primary">{t('shopTitle')}</Link>
        </div>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: '1fr 350px', gap: 40, alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--color-border)', marginBottom: 16, fontWeight: 600 }}>
              <span>{t('items')}</span>
              <span>{t('price')}</span>
            </div>
            {cartItems.map(item => (
              <CartItem key={item.productId} item={item} />
            ))}
          </div>
          <div>
            <CartSummary onCheckout={() => navigate('/checkout')} />
          </div>
        </div>
      )}
    </div>
  );
}
