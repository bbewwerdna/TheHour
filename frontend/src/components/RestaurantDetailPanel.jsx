import { distanceMiles, formatDistance } from '../utils/distance'
import HappyHourDetails from './HappyHourDetails'

const CUISINE_EMOJI = {
  'Mexican': '🌮',
  'American Gastropub': '🍺',
  'Asian BBQ': '🍖',
  'Beer Garden': '🍻',
  'Cocktail Bar': '🍸',
  'Cajun-Creole': '🦐',
  'Italian': '🍝',
  'Spanish Tapas': '🥘',
}

function Stars({ rating }) {
  return (
    <span style={{ color: 'var(--amber)', fontSize: 18 }}>
      {'★'.repeat(Math.floor(rating))}
      <span style={{ color: 'var(--text-muted)', marginLeft: 6, fontSize: 16 }}>
        {rating.toFixed(1)} / 5.0
      </span>
    </span>
  )
}

function InfoRow({ icon, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-muted)' }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      {label}
    </div>
  )
}

// Presentational detail view. Pass `distance` directly, or omit it and the
// component will derive it from the cached user position in sessionStorage.
// Pass `onClose` to render a close button (used in the inline master-detail layout).
export default function RestaurantDetailPanel({ restaurant, distance, onClose }) {
  const { name, address, city, zip, phone, cuisine, rating, latitude, longitude, happyHour } = restaurant
  const emoji = CUISINE_EMOJI[cuisine] || '🍽️'
  const locationLine = [address, [city, zip].filter(Boolean).join(' ')].filter(Boolean).join(', ')

  let dist = distance
  if (dist == null) {
    const cached = sessionStorage.getItem('userPos')
    const userPos = cached ? JSON.parse(cached) : null
    dist = userPos ? distanceMiles(userPos.lat, userPos.lng, latitude, longitude) : null
  }

  return (
    <div>
      <div style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        padding: '24px 28px',
        marginBottom: 18,
        border: '1px solid var(--border)',
        position: 'relative',
      }}>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close details"
            style={{
              position: 'absolute', top: 14, right: 14,
              width: 30, height: 30, borderRadius: '50%',
              border: '1px solid var(--border)', background: 'var(--surface-2)',
              color: 'var(--text-muted)', fontSize: 16, lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ✕
          </button>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, paddingRight: onClose ? 36 : 0 }}>
          <span style={{ fontSize: 40 }}>{emoji}</span>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{name}</h1>
            <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>{cuisine}</div>
          </div>
        </div>

        <Stars rating={rating} />

        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <InfoRow icon="📍" label={locationLine} />
          <InfoRow icon="📞" label={phone} />
          {dist != null && <InfoRow icon="🧭" label={formatDistance(dist)} />}
        </div>
      </div>

      <HappyHourDetails happyHour={happyHour} />
    </div>
  )
}
