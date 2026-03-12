import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { products } from '../data/products';
import ProductDetail from '../components/product/ProductDetail';

export default function ProductPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="section container text-center">
        <h2>{t('notFoundTitle')}</h2>
        <Link to="/shop" className="btn btn-primary">{t('shopTitle')}</Link>
      </div>
    );
  }

  return (
    <div className="section container">
      {/* Breadcrumb could go here */}
      <ProductDetail product={product} />
    </div>
  );
}
