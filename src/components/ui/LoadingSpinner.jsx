export default function LoadingSpinner({ fullPage = false }) {
  const containerStyle = fullPage ? {
    position: 'fixed',
    inset: 0,
    background: 'var(--color-bg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  } : {
    padding: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={containerStyle}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid var(--color-border-light)',
        borderTop: '3px solid var(--color-primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
    </div>
  );
}
