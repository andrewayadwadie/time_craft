import { useLanguage } from '../../hooks/useLanguage';
import { useCart } from '../../hooks/useCart';
import { Trash2 } from 'lucide-react';

export default function CartItem({ item }) {
  const { t, language } = useLanguage();
  const { updateQuantity, removeItem } = useCart();
  
  const name = language === 'ar' ? item.nameAr : item.name;

  return (
    <div style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid var(--color-border)' }}>
      <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-md)', background: 'var(--color-bg-secondary)', overflow: 'hidden' }}>
        <img src={item.image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h4 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 4 }}>{name}</h4>
            <div style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{t('currency')}{item.price}</div>
          </div>
          <button 
            className="btn-icon" 
            onClick={() => removeItem(item.productId)}
            style={{ color: 'var(--color-text-muted)', background: 'transparent' }}
          >
            <Trash2 size={18} />
          </button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto', gap: 12 }}>
          <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', background: 'var(--color-bg-secondary)' }}>
            <button 
              style={{ width: 32, height: 32, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text)' }}
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            >-</button>
            <div style={{ width: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>
              {item.quantity}
            </div>
            <button 
              style={{ width: 32, height: 32, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text)' }}
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            >+</button>
          </div>
          <div style={{ marginLeft: 'auto', fontWeight: 'bold' }}>
            {t('currency')}{item.price * item.quantity}
          </div>
        </div>
      </div>
    </div>
  );
}
