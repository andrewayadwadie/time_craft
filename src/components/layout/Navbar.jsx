import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import { ShoppingBag, Heart, Menu } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageToggle from '../ui/LanguageToggle';
import logo from '../../assets/logo.jpg';

export default function Navbar() {
  const { t } = useLanguage();
  const { cartCount } = useCart();
  const { favoriteCount } = useFavorites();

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 'var(--nav-height)',
      background: 'var(--color-glass)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      zIndex: 100,
      borderBottom: '1px solid var(--color-border-light)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%'
      }}>
        {/* Logo */}
        <Link to="/" className="navbar-logo" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontWeight: '700',
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          color: 'var(--color-text)'
        }}>
          <img src={logo} alt="Time Craft" style={{ height: '40px', width: 'auto', borderRadius: '4px' }} />
          <span style={{ color: 'var(--color-primary)' }}>TIME</span> CRAFT
        </Link>

        {/* Desktop Nav Links */}
        <nav className="navbar-nav" style={{ display: 'none', gap: '32px' }}>
          <Link to="/" style={{ fontWeight: 500 }}>{t('navHome')}</Link>
          <Link to="/shop" style={{ fontWeight: 500 }}>{t('navShop')}</Link>
          <Link to="/#categories" style={{ fontWeight: 500 }}>{t('navCategories')}</Link>
        </nav>

        {/* Actions */}
        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <LanguageToggle />
          <ThemeToggle />
          
          <Link to="/favorites" className="btn-icon" style={{ position: 'relative' }}>
            <Heart size={20} />
            {favoriteCount > 0 && (
              <span style={{
                position: 'absolute',
                top: 2,
                right: 2,
                background: 'var(--color-primary)',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: 'bold',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {favoriteCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="btn-icon" style={{ position: 'relative' }}>
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: 2,
                right: 2,
                background: 'var(--color-primary)',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: 'bold',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle (simplified for now) */}
          <button className="btn-icon d-md-none" style={{ display: 'flex' }} onClick={() => alert('Menu opening soon!')}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

// Ensure the nav links show on tablet/desktop
const style = document.createElement('style');
style.innerHTML = `
  @media (min-width: 768px) {
    .navbar-nav { display: flex !important; }
    .d-md-none { display: none !important; }
  }
`;
document.head.appendChild(style);
