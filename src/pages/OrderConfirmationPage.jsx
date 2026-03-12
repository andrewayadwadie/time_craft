import { Link, useLocation, Navigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmationPage() {
  const { t } = useLanguage();
  const location = useLocation();
  const orderId = location.state?.orderId;

  if (!orderId) {
    return <Navigate to="/shop" />;
  }

  return (
    <div className="section container text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <CheckCircle size={80} style={{ color: 'var(--color-success)', marginBottom: 24 }} />
      <h1 className="h2" style={{ marginBottom: 16 }}>{t('orderPlaced')}</h1>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', marginBottom: 32 }}>
        {t('orderID')}: <strong>{orderId}</strong>
      </p>
      <Link to="/shop" className="btn btn-primary">
        {t('continueShopping')}
      </Link>
    </div>
  );
}
