import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useCart } from '../hooks/useCart';

export default function CheckoutPage() {
  const { t } = useLanguage();
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', address: '', phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    // Simulate order placement
    clearCart();
    navigate('/order-confirmation', { state: { orderId: 'ORD-' + Math.floor(Math.random() * 1000000) } });
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const tax = total * 0.15;
  const finalTotal = total + tax;

  return (
    <div className="section container">
      <div className="section-header">
        <h1>{t('checkout')}</h1>
        <div className="gold-line"></div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 400px', gap: 40, alignItems: 'start' }}>
        <form onSubmit={handleSubmit} style={{ background: 'var(--color-bg-secondary)', padding: 32, borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ marginBottom: 24 }}>{t('shippingAddress')}</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                {t('name')}
              </label>
              <input 
                required 
                type="text" 
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})}
                style={{ width: '100%', padding: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                Email
              </label>
              <input 
                required 
                type="email" 
                value={form.email} 
                onChange={e => setForm({...form, email: e.target.value})}
                style={{ width: '100%', padding: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                {t('phone')}
              </label>
              <input 
                required 
                type="tel" 
                value={form.phone} 
                onChange={e => setForm({...form, phone: e.target.value})}
                style={{ width: '100%', padding: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                {t('address')}
              </label>
              <textarea 
                required 
                rows="3"
                value={form.address} 
                onChange={e => setForm({...form, address: e.target.value})}
                style={{ width: '100%', padding: 12, borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text)' }}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: 16, marginTop: 16, width: '100%', fontWeight: 'bold' }}>
              {t('placeOrder')} — {t('currency')}{finalTotal.toFixed(2)}
            </button>
          </div>
        </form>

        <div style={{ background: 'var(--color-bg-secondary)', padding: 32, borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ marginBottom: 24 }}>{t('orderSummary')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cartItems.map(item => (
              <div key={item.productId} style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 60, height: 60, borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.name}</div>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>Qty: {item.quantity}</div>
                </div>
                <div style={{ fontWeight: 600 }}>{t('currency')}{(item.price * item.quantity)}</div>
              </div>
            ))}
          </div>
          <hr style={{ margin: '24px 0', borderTop: '1px solid var(--color-border)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>{t('subtotal')}</span>
            <span>{t('currency')}{total.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>VAT (15%)</span>
            <span>{t('currency')}{tax.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--color-border)' }}>
            <span>{t('total')}</span>
            <span>{t('currency')}{finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
