import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ProductGrid from './components/ProductGrid'
import CartPanel from './components/CartPanel'
import Toast from './components/Toast'
import { apiFetch } from './api'

const EMOJIS = ['🎧','📷','💻','🖥️','⌨️','🖱️','📱','🎮','🔊','📡','🔋','💡','📦','🧲','🎯']
export const getEmoji = (id) => EMOJIS[id % EMOJIS.length]

export default function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [editingProduct, setEditingProduct] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((msg, isErr = false) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, msg, isErr }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2800)
  }, [])

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiFetch('/products')
      setProducts(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadProducts() }, [loadProducts])

  const handleSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await apiFetch(`/products/${editingProduct.id}`, { method: 'PUT', body: JSON.stringify(formData) })
        addToast('Product updated')
      } else {
        await apiFetch('/products', { method: 'POST', body: JSON.stringify(formData) })
        addToast('Product added')
      }
      setEditingProduct(null)
      loadProducts()
    } catch (e) {
      addToast(e.message, true)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    try {
      await apiFetch(`/products/${id}`, { method: 'DELETE' })
      addToast('Product deleted')
      loadProducts()
    } catch (e) {
      addToast(e.message, true)
    }
  }

  const addToCart = (id) => {
    const p = products.find(x => x.id == id)
    if (!p) return
    setCart(prev => ({
      ...prev,
      [id]: prev[id] ? { ...prev[id], qty: prev[id].qty + 1 } : { product: p, qty: 1 },
    }))
    addToast(`${p.name} added to cart`)
  }

  const addAllToCart = () => {
    setCart(prev => {
      const next = { ...prev }
      products.forEach(p => {
        next[p.id] = next[p.id]
          ? { ...next[p.id], qty: next[p.id].qty + 1 }
          : { product: p, qty: 1 }
      })
      return next
    })
    setCartOpen(true)
    addToast(`${products.length} products added to cart`)
  }

  const changeQty = (id, delta) => {
    setCart(prev => {
      const item = prev[id]
      if (!item) return prev
      if (item.qty + delta <= 0) {
        const next = { ...prev }
        delete next[id]
        return next
      }
      return { ...prev, [id]: { ...item, qty: item.qty + delta } }
    })
  }

  const cartItems = Object.values(cart)
  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cartItems.reduce((s, i) => s + i.product.price * i.qty, 0)

  return (
    <>
      <Header cartCount={cartCount} onCartToggle={() => setCartOpen(o => !o)} />
      <div className="main">
        <Sidebar
          editingProduct={editingProduct}
          onSubmit={handleSubmit}
          onCancel={() => setEditingProduct(null)}
        />
        <ProductGrid
          products={products}
          loading={loading}
          error={error}
          onAddToCart={addToCart}
          onEdit={setEditingProduct}
          onDelete={handleDelete}
          onAddAll={addAllToCart}
        />
      </div>
      <CartPanel
        open={cartOpen}
        items={cartItems}
        total={cartTotal}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeQty}
      />
      <div className="toast-container">
        {toasts.map(t => <Toast key={t.id} msg={t.msg} isErr={t.isErr} />)}
      </div>
    </>
  )
}
