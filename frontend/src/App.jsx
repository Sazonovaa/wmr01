import { useState, useEffect } from 'react'
import WebApp from '@twa-dev/sdk'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Инициализация Telegram WebApp
    WebApp.ready()
    WebApp.expand()
    
    // Загружаем продукты
    fetchProducts()
  }, [])

  useEffect(() => {
    // Обновляем главную кнопку при изменении корзины
    if (cart.length > 0) {
      const total = cart.reduce((sum, item) => sum + item.price, 0)
      WebApp.MainButton.setText(`Заказать (${total.toLocaleString('ru-RU')} ₽)`)
      WebApp.MainButton.show()
      WebApp.MainButton.onClick(handleOrder)
    } else {
      WebApp.MainButton.hide()
    }

    return () => {
      WebApp.MainButton.offClick(handleOrder)
    }
  }, [cart])

  const fetchProducts = async () => {
    try {
      // В продакшене укажите реальный URL вашего API
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      const response = await fetch(`${API_URL}/api/products`)
      const data = await response.json()
      setProducts(data)
      setLoading(false)
    } catch (error) {
      console.error('Ошибка загрузки продуктов:', error)
      setLoading(false)
    }
  }

  const addToCart = (product) => {
    setCart([...cart, product])
    WebApp.HapticFeedback.impactOccurred('light')
  }

  const removeFromCart = (productId) => {
    const index = cart.findIndex(item => item.id === productId)
    if (index !== -1) {
      const newCart = [...cart]
      newCart.splice(index, 1)
      setCart(newCart)
      WebApp.HapticFeedback.impactOccurred('light')
    }
  }

  const handleOrder = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0)
    
    // Отправляем данные через Telegram WebApp
    WebApp.sendData(JSON.stringify({
      type: 'order',
      items: cart,
      total: total,
      userId: WebApp.initDataUnsafe?.user?.id
    }))
    
    WebApp.close()
  }

  const getCartCount = (productId) => {
    return cart.filter(item => item.id === productId).length
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Загрузка...</p>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🛍 IT Магазин</h1>
        <div className="cart-badge">
          🛒 {cart.length}
        </div>
      </header>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <div className="price">{product.price.toLocaleString('ru-RU')} ₽</div>
            
            <div className="product-actions">
              {getCartCount(product.id) > 0 ? (
                <div className="quantity-controls">
                  <button 
                    className="btn-small"
                    onClick={() => removeFromCart(product.id)}
                  >
                    −
                  </button>
                  <span className="quantity">{getCartCount(product.id)}</span>
                  <button 
                    className="btn-small"
                    onClick={() => addToCart(product)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button 
                  className="btn-add"
                  onClick={() => addToCart(product)}
                >
                  Добавить
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Корзина ({cart.length})</h3>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <span>{item.name}</span>
                <span>{item.price.toLocaleString('ru-RU')} ₽</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
