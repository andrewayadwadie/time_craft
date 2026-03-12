import { useState, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/product/ProductCard';

export default function ShopPage() {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCat !== 'all') {
      result = result.filter(p => p.categoryId === selectedCat);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.nameAr.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low': result.sort((a,b) => a.price - b.price); break;
      case 'price-high': result.sort((a,b) => b.price - a.price); break;
      case 'rating': result.sort((a,b) => b.rating - a.rating); break;
      case 'newest': 
      default:
        result.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return result;
  }, [search, selectedCat, sortBy]);

  return (
    <div className="section container">
      <div className="section-header">
        <h1>{t('shopTitle')}</h1>
        <div className="gold-line"></div>
        <p style={{ marginTop: 16 }}>{t('shopSubtitle')}</p>
      </div>

      {/* Filters & Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 40, justifyContent: 'space-between' }}>
        <input 
          type="text" 
          placeholder={t('searchPlaceholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '12px 20px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg-secondary)',
            color: 'var(--color-text)',
            minWidth: 280
          }}
        />
        
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <select 
            value={selectedCat} 
            onChange={e => setSelectedCat(e.target.value)}
            style={{ padding: '12px 20px', borderRadius: 'var(--radius-full)', background: 'var(--color-bg-secondary)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
          >
            <option value="all">{t('allCategories')}</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {language === 'ar' ? c.nameAr : c.name}
              </option>
            ))}
          </select>

          <select 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value)}
            style={{ padding: '12px 20px', borderRadius: 'var(--radius-full)', background: 'var(--color-bg-secondary)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
          >
            <option value="newest">{t('sortNewest')}</option>
            <option value="price-low">{t('sortPriceLow')}</option>
            <option value="price-high">{t('sortPriceHigh')}</option>
            <option value="rating">{t('sortRating')}</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-4">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-text-secondary)' }}>
          <h3>{t('noProducts')}</h3>
        </div>
      )}
    </div>
  );
}
