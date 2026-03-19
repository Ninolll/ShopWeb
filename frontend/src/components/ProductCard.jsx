import { getEmoji } from '../App'

export default function ProductCard({ product: p, onAddToCart, onEdit, onDelete }) {
  const stockClass = p.stock === 0 ? 'stock-out' : p.stock < 5 ? 'stock-low' : 'stock-ok'
  const stockLabel = p.stock === 0 ? 'Out of stock' : p.stock < 5 ? `Only ${p.stock} left` : `${p.stock} in stock`

  return (
    <div className="product-card">
      <div className="product-img">
        {p.image_url
          ? <img src={p.image_url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span className="emoji-icon">{getEmoji(p.id)}</span>
        }
        <span className={`stock-badge ${stockClass}`}>{stockLabel}</span>
      </div>
      <div className="product-body">
        <div className="product-name">{p.name}</div>
        <div className="product-price">${parseFloat(p.price).toFixed(2)}</div>
        <div className="product-actions">
          <button className="btn btn-add" onClick={() => onAddToCart(p.id)}>+ Add to cart</button>
          <button className="btn btn-edit" onClick={() => onEdit(p)}>Edit</button>
          <button className="btn btn-del" onClick={() => onDelete(p.id)}>✕</button>
        </div>
      </div>
    </div>
  )
}
