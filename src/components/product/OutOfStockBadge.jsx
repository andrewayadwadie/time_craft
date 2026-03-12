import { useLanguage } from '../../hooks/useLanguage';

export default function OutOfStockBadge() {
  const { t } = useLanguage();
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(255,255,255,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      backdropFilter: 'blur(2px)'
    }}>
      <span className="badge badge-outofstock" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
        {t('outOfStock')}
      </span>
    </div>
  );
}
