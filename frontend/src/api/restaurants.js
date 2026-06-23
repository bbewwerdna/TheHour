export async function fetchRestaurants(name = '', day = '', location = '') {
  const params = new URLSearchParams()
  if (name) params.set('name', name)
  if (day) params.set('day', day)
  if (location) params.set('location', location)
  const qs = params.toString()
  const res = await fetch(`/api/restaurants${qs ? `?${qs}` : ''}`)
  if (!res.ok) throw new Error('Failed to fetch restaurants')
  return res.json()
}

export async function fetchRestaurant(id) {
  const res = await fetch(`/api/restaurants/${id}`)
  if (!res.ok) throw new Error('Restaurant not found')
  return res.json()
}
