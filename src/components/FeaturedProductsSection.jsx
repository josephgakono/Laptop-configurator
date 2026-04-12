import { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { fetchFeaturedLaptops } from '../utils/api'
import { formatCurrency } from '../utils/calculations'

async function requestFeaturedProducts(signal) {
  return fetchFeaturedLaptops(4, signal)
}

function FeaturedProductsSection() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      setIsLoading(true)
      setError('')

      try {
        const featuredProducts = await requestFeaturedProducts(controller.signal)
        setProducts(featuredProducts)
      } catch (loadingError) {
        if (loadingError.name === 'AbortError') {
          return
        }

        setError(
          loadingError.message || 'We could not load laptop picks right now.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()

    return () => controller.abort()
  }, [])

  const handleRetry = async () => {
    setIsLoading(true)
    setError('')

    try {
      const featuredProducts = await requestFeaturedProducts()
      setProducts(featuredProducts)
    } catch (loadingError) {
      setError(
        loadingError.message || 'We could not load laptop picks right now.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="section section--tight">
      <div className="section-heading section-heading--split">
        <div>
          <p className="eyebrow">Popular Picks</p>
          <h2>Explore laptops worth considering alongside your custom build.</h2>
        </div>
        <p className="section-copy">
          Use these picks for inspiration while you narrow down the one that
          fits you best.
        </p>
      </div>

      {isLoading ? <LoadingSpinner label="Loading laptop picks..." /> : null}

      {!isLoading && error ? (
        <div className="empty-state">
          <p>{error}</p>
          <button className="secondary-button" type="button" onClick={handleRetry}>
            Refresh picks
          </button>
        </div>
      ) : null}

      {!isLoading && !error ? (
        <div className="featured-grid">
          {products.map((product) => (
            <article key={product.id} className="featured-card">
              <div className="featured-card__image-wrap">
                <img
                  className="featured-card__image"
                  src={product.thumbnail}
                  alt={product.title}
                />
              </div>
              <div className="featured-card__content">
                <span className="featured-card__tag">{product.category}</span>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="featured-card__meta">
                  <strong>{formatCurrency(product.price)}</strong>
                  <span>{product.brand}</span>
                  <span>{product.rating} / 5 rating</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default FeaturedProductsSection
