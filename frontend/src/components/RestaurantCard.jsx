import { formatDistance } from '../utils/distance'

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
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span style={{ color: 'var(--amber)', fontSize: 14 }}>
      {'★'.repeat(full)}{half ? '½' : ''}
      <span style={{ color: 'var(--text-muted)', marginLeft: 4, fontSize: 13 }}>
        {rating.toFixed(1)}
      </span>
    </span>
  )
}

export default function RestaurantCard({ restaurant, distance, selected, onSelect }) {
  const { name, address, city, zip, cuisine, rating, happyHour } = restaurant
  const emoji = CUISINE_EMOJI[cuisine] || '🍽️'
  const locationLine = [address, [city, zip].filter(Boolean).join(' ')].filter(Boolean).join(', ')

  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect?.() } }}
    >
      <div style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius)',
        boxShadow: selected ? 'var(--shadow-hover)' : 'var(--shadow)',
        padding: '20px 22px',
        transition: 'box-shadow .2s, transform .2s, border-color .2s',
        cursor: 'pointer',
        border: selected ? '2px solid var(--amber)' : '1px solid var(--border)',
      }}
        onMouseEnter={e => {
          if (!selected) e.currentTarget.style.boxShadow = 'var(--shadow-hover)'
        }}
        onMouseLeave={e => {
          if (!selected) e.currentTarget.style.boxShadow = 'var(--shadow)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 22 }}>{emoji}</span>
              <h2 style={{ fontSize: 17, fontWeight: 700 }}>{name}</h2>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{cuisine}</div>
          </div>
          <Stars rating={rating} />
        </div>

        <div style={{
          fontSize: 13, color: 'var(--text-muted)', marginBottom: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
        }}>
          <span>📍 {locationLine}</span>
          {distance != null && (
            <span style={{
              flexShrink: 0, background: 'var(--amber-light)', color: 'var(--amber-dark)',
              borderRadius: 20, padding: '3px 10px', fontSize: 12, fontWeight: 600,
            }}>
              {formatDistance(distance)}
            </span>
          )}
        </div>

        <div style={{
          background: 'var(--amber-light)',
          borderRadius: 8,
          padding: '10px 14px',
          borderLeft: '3px solid var(--amber)',
        }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--amber-dark)', marginBottom: 4 }}>
            🍻 Happy Hour
          </div>
          <div style={{ fontSize: 13, color: '#92400e' }}>
            <span style={{ fontWeight: 500 }}>
              {happyHour.startTime} – {happyHour.endTime}
            </span>
            &nbsp;·&nbsp;
            {happyHour.days.length === 7
              ? 'Every day'
              : happyHour.days.map(d => d.slice(0, 3)).join(', ')}
          </div>
          <div style={{ fontSize: 12, color: '#92400e', marginTop: 4, opacity: 0.85 }}>
            {happyHour.drinkDeals[0]}
            {happyHour.foodDeals.length > 0 && ` · ${happyHour.foodDeals[0]}`}
          </div>
        </div>
      </div>
    </div>
  )
}
