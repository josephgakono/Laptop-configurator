const LAPTOP_SEARCH_URL = 'https://dummyjson.com/products/search?q=laptop'

export async function fetchFeaturedLaptops(limit = 4, signal) {
  const response = await fetch(`${LAPTOP_SEARCH_URL}&limit=${limit}`, {
    signal,
  })

  if (!response.ok) {
    throw new Error('Laptop picks are temporarily unavailable.')
  }

  const data = await response.json()

  return (data.products ?? []).slice(0, limit).map((product) => ({
    id: product.id,
    title: product.title,
    brand: product.brand,
    price: product.price,
    rating: product.rating,
    thumbnail: product.thumbnail,
    description: product.description,
    category: product.category,
  }))
}
