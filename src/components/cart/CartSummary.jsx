import { useLanguage } from '../../hooks/useLanguage';
import { useCart } from '../../hooks/useCart';

export default function CartSummary({ onCheckout }) {
  const { t } = useLanguage();
  const { total, cartCount } = useCart();
  
  const shipping = total > 0 ? 0 : 0; // Free shipping
  const tax = total * 0.15; // 15% VAT

  return (
    <div style={{ background: 'var(--color-bg-secondary)', padding: '24px', borderRadius: 'var(--radius-lg)' }}>
      <h3 style={{ marginBottom: '24px' }}>{t('orderSummary')}</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
          <span>{t('subtotal')} ({cartCount} {t('items')})</span>
          <span>{t('currency')}{total.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
          <span>{t('shipping')}</span>
          <span style={{ color: 'var(--color-success)' }}>{t('freeShipping')}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
          <span>VAT (15%)</span>
          <span>{t('currency')}{tax.toFixed(2)}</span>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.25rem' }}>
        <span>{t('total')}</span>
        <span>{t('currency')}{(total + shipping + tax).toFixed(2)}</span>
      </div>

      <button 
        className="btn btn-primary" 
        style={{ width: '100%', padding: '16px', fontWeight: 'bold' }}
        onClick={onCheckout}
      >
        {t('checkout')}
      </button>
    </div>
  );
}
