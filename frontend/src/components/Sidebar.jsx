import { useState, useEffect } from 'react'

export default function Sidebar({ editingProduct, onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name)
      setPrice(editingProduct.price)
      setStock(editingProduct.stock)
      setImageUrl(editingProduct.image_url || '')
    } else {
      setName('')
      setPrice('')
      setStock('')
      setImageUrl('')
    }
  }, [editingProduct])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      name: name.trim(),
      price: parseFloat(price),
      stock: parseInt(stock),
      image_url: imageUrl.trim() || null,
    })
  }

  return (
    <aside className="sidebar">
      <p className="sidebar-title">{editingProduct ? 'Edit product' : 'Add product'}</p>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Wireless Headphones"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Price ($)</label>
            <input
              className="form-input"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Stock</label>
            <input
              className="form-input"
              type="number"
              min="0"
              value={stock}
              onChange={e => setStock(e.target.value)}
              placeholder="0"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Image URL (optional)</label>
            <input
              className="form-input"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              {editingProduct ? 'Save changes' : 'Add product'}
            </button>
            {editingProduct && (
              <button type="button" className="btn-cancel" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </aside>
  )
}
