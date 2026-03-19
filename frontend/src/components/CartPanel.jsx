import { getEmoji } from '../App'

export default function CartPanel({ open, items, total, onClose, onChangeQty }) {
  return (
    <div className={`cart-panel${open ? ' open' : ''}`}>
      <div className="cart-header">
        <h2>Cart</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="cart-items">
        {items.length === 0
          ? <div className="empty-cart">Your cart is empty</div>
          : items.map(({ product: p, qty }) => (
              <div key={p.id} className="cart-item">
                <div className="cart-item-img">
                  {p.image_url
                    ? <img src={p.image_url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
                    : getEmoji(p.id)
                  }
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{p.name}</div>
                  <div className="cart-item-price">${parseFloat(p.price).toFixed(2)} × {qty}</div>
                </div>
                <div className="qty-ctrl">
                  <button className="qty-btn" onClick={() => onChangeQty(p.id, -1)}>−</button>
                  <span className="qty-num">{qty}</span>
                  <button className="qty-btn" onClick={() => onChangeQty(p.id, +1)}>+</button>
                </div>
              </div>
            ))
        }
      </div>

      <div className="cart-footer">
        <div className="cart-total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button className="checkout-btn">Checkout →</button>
      </div>
    </div>
  )
}
