import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchRestaurant } from '../api/restaurants'
import RestaurantDetailPanel from '../components/RestaurantDetailPanel'

export default function DetailPage() {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRestaurant(id)
      .then(setRestaurant)
      .catch(() => setError('Restaurant not found.'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
      <div style={{ fontSize: 40 }}>⏳</div>
    </div>
  )

  if (error || !restaurant) return (
    <div style={{ textAlign: 'center', padding: '80px 0' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
      <div style={{ marginBottom: 20, color: 'var(--text-muted)' }}>{error}</div>
      <Link to="/" style={{ color: 'var(--amber-dark)', fontWeight: 600 }}>← Back to list</Link>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        padding: '20px 24px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Link to="/" style={{
            color: '#9ca3af', fontSize: 14, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            transition: 'color .15s',
          }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = '#9ca3af'}
          >
            ← All Restaurants
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '28px 16px' }}>
        <RestaurantDetailPanel restaurant={restaurant} />
      </div>
    </div>
  )
}
