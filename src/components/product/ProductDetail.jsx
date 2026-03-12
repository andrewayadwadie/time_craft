import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import { Heart, Star, CheckCircle, Shield, Truck } from 'lucide-react';
import Badge from '../ui/Badge';

export default function ProductDetail({ product }) {
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const favorite = isFavorite(product.id);
  const name = language === 'ar' ? product.nameAr : product.name;
  const desc = language === 'ar' ? product.descriptionAr : product.description;
  const brand = language === 'ar' ? product.brandAr : product.brand;
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) addItem(product, quantity);
  };

  return (
    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
      {/* Gallery */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--color-bg-tertiary)' }}>
          <img 
            src={product.images[activeImg]} 
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        {product.images.length > 1 && (
          <div style={{ display: 'flex', gap: 12 }}>
            {product.images.map((img, i) => (
              <button 
                key={i}
                onClick={() => setActiveImg(i)}
                style={{
                  width: 80, height: 80, borderRadius: 'var(--radius-md)', overflow: 'hidden',
                  border: `2px solid ${activeImg === i ? 'var(--color-primary)' : 'transparent'}`,
                  background: 'var(--color-bg-tertiary)'
                }}
              >
                <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="product-detail-info" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <span style={{ color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.85rem' }}>
            {brand}
          </span>
          <h1 style={{ fontSize: '2.5rem', margin: '8px 0' }}>{name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="stars">
            <Star size={16} fill="currentColor" />
            <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              {product.rating} ({product.reviewCount} {t('reviews')})
            </span>
          </div>
        </div>

        <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
          {t('currency')}{product.price}
          {product.originalPrice && (
            <span style={{ color: 'var(--color-text-muted)', textDecoration: 'line-through', fontSize: '1.1rem', marginLeft: 12 }}>
              {t('currency')}{product.originalPrice}
            </span>
          )}
        </div>

        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>{desc}</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {product.tags.map(tag => (
            <span key={tag} className="badge" style={{ background: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}>
              #{tag}
            </span>
          ))}
        </div>

        <div style={{ background: 'var(--color-bg-tertiary)', padding: 16, borderRadius: 'var(--radius-md)', display: 'flex', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: isOutOfStock ? 'var(--color-error)' : 'var(--color-success)', fontWeight: 500 }}>
            {isOutOfStock ? <Shield size={20} /> : <CheckCircle size={20} />}
            {isOutOfStock ? t('outOfStock') : `${product.stock} ${t('inStock')}`}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-secondary)' }}>
            <Truck size={20} />
            {t('freeShipping')}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)' }} />

        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)' }} className="qty-controls">
            <button 
              className="btn-ghost" 
              style={{ width: 48, borderRadius: 'var(--radius-full)' }}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={isOutOfStock}
            >-</button>
            <div style={{ width: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {quantity}
            </div>
            <button 
              className="btn-ghost" 
              style={{ width: 48, borderRadius: 'var(--radius-full)' }}
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={isOutOfStock}
            >+</button>
          </div>

          <button 
            className={`btn ${isOutOfStock ? 'btn-ghost' : 'btn-primary'}`} 
            style={{ flex: 1, height: 48 }}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            {t('addToCart')}
          </button>

          <button 
            className="btn-icon" 
            style={{ width: 48, height: 48, border: '1px solid var(--color-border)' }}
            onClick={() => favorite ? removeFavorite(product.id) : addFavorite(product)}
          >
            <Heart size={20} fill={favorite ? 'var(--color-error)' : 'none'} color={favorite ? 'var(--color-error)' : 'currentColor'} />
          </button>
        </div>
      </div>
    </div>
  );
}
