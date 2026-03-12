import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { categories } from '../data/categories';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';

export default function CategoryPage() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  
  const category = categories.find(c => c.id === id);
  const categoryProducts = products.filter(p => p.categoryId === id);

  if (!category) {
    return (
      <div className="section container text-center">
        <h2>{t('notFoundTitle')}</h2>
        <Link to="/shop" className="btn btn-primary">{t('shopTitle')}</Link>
      </div>
    );
  }

  const name = language === 'ar' ? category.nameAr : category.name;
  const desc = language === 'ar' ? category.descriptionAr : category.description;

  return (
    <div>
      {/* Hero */}
      <div style={{
        position: 'relative',
        height: '40vh',
        minHeight: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${category.image}) center/cover`,
        color: '#fff',
        textAlign: 'center'
      }}>
        <div style={{ zIndex: 1, padding: 24, maxWidth: 600 }}>
          <span style={{ fontSize: '3rem', marginBottom: 16, display: 'inline-block' }}>{category.icon}</span>
          <h1 style={{ color: '#fff', marginBottom: 16 }}>{name}</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>{desc}</p>
        </div>
      </div>

      <div className="section container">
        <div className="grid grid-4" style={{ marginTop: 24 }}>
          {categoryProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
