export default function Header({ cartCount, onCartToggle }) {
  return (
    <header>
      <div className="logo">
        <div className="logo-dot" />
        Shop Admin
      </div>
      <div className="header-actions">
        <button className="cart-btn" onClick={onCartToggle}>
          🛒 Cart
          <span className="cart-badge">{cartCount}</span>
        </button>
      </div>
    </header>
  )
}
