import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import { Heart, Star } from 'lucide-react';
import Badge from '../ui/Badge';
import OutOfStockBadge from './OutOfStockBadge';

export default function ProductCard({ product }) {
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const name = language === 'ar' ? product.nameAr : product.name;
  const favorite = isFavorite(product.id);
  const isOutOfStock = product.stock === 0;

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (favorite) removeFavorite(product.id);
    else addFavorite(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isOutOfStock) addItem(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="card hover-lift" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--color-bg-tertiary)' }}>
        {isOutOfStock && <OutOfStockBadge />}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6, zIndex: 5 }}>
          {product.isBestSeller && <Badge type="bestseller" text={t('bestSeller')} />}
          {product.isNew && <Badge type="new" text={t('new')} />}
          {product.originalPrice && (
            <Badge type="sale" text={`${Math.round((1 - product.price / product.originalPrice) * 100)}% ${t('off')}`} />
          )}
        </div>
        <button 
          onClick={toggleFavorite}
          className="btn-icon"
          style={{ position: 'absolute', top: 12, right: 12, zIndex: 5, background: 'var(--color-bg-secondary)' }}
        >
          <Heart size={18} fill={favorite ? 'var(--color-error)' : 'none'} color={favorite ? 'var(--color-error)' : 'currentColor'} />
        </button>
        <img src={product.images[0]} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }} className="stars">
          <Star size={14} fill="currentColor" />
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        
        <h3 style={{ fontSize: '1.1rem', marginBottom: 8, flex: 1 }}>{name}</h3>
        
        <div className="product-card-actions" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div>
            <span style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--color-primary)' }}>
              {t('currency')}{product.price}
            </span>
            {product.originalPrice && (
              <span style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginLeft: 8 }}>
                {t('currency')}{product.originalPrice}
              </span>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`btn ${isOutOfStock ? 'btn-ghost' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            {t('addToCart')}
          </button>
        </div>
      </div>
    </Link>
  );
}
