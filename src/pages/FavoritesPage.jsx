import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useFavorites } from '../hooks/useFavorites';
import ProductCard from '../components/product/ProductCard';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const { t } = useLanguage();
  const { favorites } = useFavorites();

  return (
    <div className="section container">
      <div className="section-header">
        <h1>{t('navFavorites')}</h1>
        <div className="gold-line"></div>
      </div>

      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Heart size={64} style={{ color: 'var(--color-border)', marginBottom: 24, display: 'inline-block' }} />
          <h2>{t('noFavorites')}</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 24 }}>{t('startShopping')}</p>
          <Link to="/shop" className="btn btn-primary">{t('shopTitle')}</Link>
        </div>
      ) : (
        <div className="grid grid-4 stagger-children">
          {favorites.map(fav => (
            <ProductCard 
              key={fav.productId} 
              product={{
                id: fav.productId,
                name: fav.name,
                nameAr: fav.nameAr,
                price: fav.price,
                images: [fav.image],
                rating: 0,
                reviewCount: 0,
                tags: []
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
