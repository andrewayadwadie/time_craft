import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../../assets/logo.jpg';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer style={{ 
      marginTop: 'auto', 
      padding: '80px 0 40px', 
      background: 'var(--color-bg-secondary)',
      borderTop: '1px solid var(--color-border-light)' 
    }}>
      <div className="container">
        <div className="grid grid-4" style={{ gap: '40px', marginBottom: '60px' }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1.5' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', color: 'var(--color-text)' }}>
              <img src={logo} alt="Logo" style={{ height: '32px', width: 'auto', borderRadius: '4px' }} />
              <span style={{ color: 'var(--color-primary)' }}>TIME</span> CRAFT
            </Link>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
              Time Craft is a premiere luxury horology workshop dedicated to the art of handcrafted precision. Each timepiece tells a unique story of heritage, engineering, and timeless elegance.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" className="btn-icon" style={{ background: 'var(--color-bg-tertiary)' }}><Instagram size={18} /></a>
              <a href="#" className="btn-icon" style={{ background: 'var(--color-bg-tertiary)' }}><Facebook size={18} /></a>
              <a href="#" className="btn-icon" style={{ background: 'var(--color-bg-tertiary)' }}><Twitter size={18} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ marginBottom: '24px', position: 'relative', display: 'inline-block' }}>
              Quick Links
              <span style={{ position: 'absolute', bottom: -8, left: language === 'ar' ? 'auto' : 0, right: language === 'ar' ? 0 : 'auto', width: '30px', height: '2px', background: 'var(--color-primary)' }}></span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/shop" style={{ color: 'var(--color-text-secondary)' }}>Shop All</Link></li>
              <li><Link to="/category/mechanical" style={{ color: 'var(--color-text-secondary)' }}>Mechanical Collection</Link></li>
              <li><Link to="/category/quartz" style={{ color: 'var(--color-text-secondary)' }}>Modern Quartz</Link></li>
              <li><Link to="/category/vintage" style={{ color: 'var(--color-text-secondary)' }}>Vintage Inspired</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ marginBottom: '24px', position: 'relative', display: 'inline-block' }}>
              Support
              <span style={{ position: 'absolute', bottom: -8, left: language === 'ar' ? 'auto' : 0, right: language === 'ar' ? 0 : 'auto', width: '30px', height: '2px', background: 'var(--color-primary)' }}></span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="#" style={{ color: 'var(--color-text-secondary)' }}>Track Order</Link></li>
              <li><Link to="#" style={{ color: 'var(--color-text-secondary)' }}>Warranty Info</Link></li>
              <li><Link to="#" style={{ color: 'var(--color-text-secondary)' }}>Watch Care Guide</Link></li>
              <li><Link to="#" style={{ color: 'var(--color-text-secondary)' }}>Returns & Exchanges</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ marginBottom: '24px', position: 'relative', display: 'inline-block' }}>
              Connect
              <span style={{ position: 'absolute', bottom: -8, left: language === 'ar' ? 'auto' : 0, right: language === 'ar' ? 0 : 'auto', width: '30px', height: '2px', background: 'var(--color-primary)' }}></span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', gap: '12px', color: 'var(--color-text-secondary)' }}>
                <MapPin size={18} style={{ color: 'var(--color-primary)', shrink: 0 }} />
                <span>123 Horology Lane, Geneva, CH</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', color: 'var(--color-text-secondary)' }}>
                <Phone size={18} style={{ color: 'var(--color-primary)', shrink: 0 }} />
                <span>+41 22 123 4567</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', color: 'var(--color-text-secondary)' }}>
                <Mail size={18} style={{ color: 'var(--color-primary)', shrink: 0 }} />
                <span>concierge@timecraft.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ 
          paddingTop: '32px', 
          borderTop: '1px solid var(--color-border-light)', 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: '16px',
          color: 'var(--color-text-secondary)',
          fontSize: '0.9rem'
        }}>
          <div>© 2026 Time Craft. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="#" style={{ color: 'inherit' }}>Privacy Policy</Link>
            <Link to="#" style={{ color: 'inherit' }}>Terms of Service</Link>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" height="12" alt="Visa" style={{ filter: 'grayscale(1) opacity(0.6)' }} />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" height="20" alt="Mastercard" style={{ filter: 'grayscale(1) opacity(0.6)' }} />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" height="16" alt="Paypal" style={{ filter: 'grayscale(1) opacity(0.6)' }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
