import ProductCard from './ProductCard'

export default function ProductGrid({ products, loading, error, onAddToCart, onEdit, onDelete, onAddAll }) {
  return (
    <div className="products-area">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 className="section-title">Products</h1>
          <span className="count-badge">{products.length} item{products.length !== 1 ? 's' : ''}</span>
        </div>
        <button className="add-all-btn" onClick={onAddAll}>+ Add all to cart</button>
      </div>

      {error && <div className="error-banner">⚠️ {error}</div>}
      {loading && <div className="loader">Loading products…</div>}

      {!loading && (
        <div className="product-grid">
          {products.length === 0
            ? <p style={{ color: 'var(--muted)', fontSize: 14 }}>No products yet. Add one!</p>
            : products.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={onAddToCart}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
          }
        </div>
      )}
    </div>
  )
}
