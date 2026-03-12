import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { testimonials } from '../data/testimonials';
import ProductCard from '../components/product/ProductCard';
import { Star, Shield, Clock, Award } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function HomePage() {
  const { t, language } = useLanguage();
  
  const revealFeatures = useScrollReveal();
  const revealCategories = useScrollReveal();
  const revealBestSellers = useScrollReveal();
  const revealTestimonials = useScrollReveal();

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: 'url(https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1600) center/cover',
        color: '#fff'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 600 }} className="hero-text-enter-group">
            <span className="hero-text-enter" style={{ color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', display: 'block' }}>
              Time Craft Exclusives
            </span>
            <h1 className="h1 hero-text-enter" style={{ color: '#fff', margin: '16px 0 24px' }}>
              {t('heroTitle')}
            </h1>
            <p className="hero-text-enter" style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: 32 }}>
              {t('heroSubtitle')}
            </p>
            <div className="hero-text-enter" style={{ display: 'flex', gap: 16 }}>
              <Link to="/shop" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                {t('shopNow')}
              </Link>
              <Link to="#categories" className="btn" style={{ padding: '16px 32px', fontSize: '1.1rem', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                {t('navCategories')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={revealFeatures} className="section bg-secondary reveal-scale">
        <div className="container">
          <div className="grid grid-3 text-center">
            <div style={{ padding: 24 }}>
              <Shield size={40} style={{ color: 'var(--color-primary)', margin: '0 auto 16px' }} />
              <h3 style={{ marginBottom: 8, fontSize: '1.2rem' }}>Quality Guarantee</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Authentic, handcrafted timepieces with international warranty.</p>
            </div>
            <div style={{ padding: 24 }}>
              <Clock size={40} style={{ color: 'var(--color-primary)', margin: '0 auto 16px' }} />
              <h3 style={{ marginBottom: 8, fontSize: '1.2rem' }}>Fast Delivery</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Express worldwide shipping on all orders over $500.</p>
            </div>
            <div style={{ padding: 24 }}>
              <Award size={40} style={{ color: 'var(--color-primary)', margin: '0 auto 16px' }} />
              <h3 style={{ marginBottom: 8, fontSize: '1.2rem' }}>Premium Service</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Dedicated customer support for all your horological needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" ref={revealCategories} className="section container reveal">
        <div className="section-header">
          <h2>{t('categoriesTitle')}</h2>
          <div className="gold-line"></div>
        </div>
        <div className="grid grid-3">
          {categories.slice(0, 3).map((category, idx) => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`} 
              className="hover-lift"
              style={{
                position: 'relative',
                height: 350,
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'block',
                animationDelay: `${idx * 0.15}s`
              }}
            >
              <img src={category.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: 24,
                color: '#fff'
              }}>
                <div>
                  <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: 4 }}>
                    {language === 'ar' ? category.nameAr : category.name}
                  </h3>
                  <p style={{ color: 'var(--color-primary)', fontWeight: 500, fontSize: '0.9rem', textTransform: 'uppercase' }}>
                    View Collection →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section ref={revealBestSellers} className="section container reveal">
        <div className="section-header">
          <h2>{t('bestsellersTitle')}</h2>
          <div className="gold-line"></div>
        </div>
        <div className="grid grid-4 stagger-children">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link to="/shop" className="btn btn-secondary" style={{ padding: '12px 32px' }}>
            {t('viewAllProducts')}
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={revealTestimonials} className="section bg-secondary reveal-scale">
        <div className="container">
          <div className="section-header">
            <h2>{t('testimonialsTitle')}</h2>
            <div className="gold-line"></div>
          </div>
          <div className="grid grid-3">
            {testimonials.slice(0, 3).map(test => (
              <div key={test.id} className="card hover-lift" style={{ padding: 32 }}>
                <div style={{ display: 'flex', gap: 4, color: 'var(--color-primary)', marginBottom: 16 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < test.rating ? "currentColor" : "none"} />)}
                </div>
                <p style={{ fontStyle: 'italic', color: 'var(--color-text-secondary)', marginBottom: 24, fontSize: '1.1rem', lineHeight: 1.6 }}>
                  "{language === 'ar' ? test.commentAr : test.comment}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={test.avatar} alt="Avatar" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ fontWeight: 600 }}>{language === 'ar' ? test.authorNameAr : test.authorName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
