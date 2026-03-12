import { useLanguage } from '../../hooks/useLanguage';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      className="badge" 
      style={{ 
        cursor: 'pointer', 
        border: '1px solid var(--color-border)', 
        background: 'transparent',
        color: 'var(--color-text)'
      }}
      onClick={toggleLanguage}
      aria-label="Toggle Language"
    >
      {language === 'en' ? 'AR' : 'EN'}
    </button>
  );
}
