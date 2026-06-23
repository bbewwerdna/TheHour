import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'react-router-dom'
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

// Emoji pin marker (avoids Leaflet's broken default-icon-with-bundlers issue).
function restaurantIcon(emoji) {
  return L.divIcon({
    className: '',
    html: `<div style="
      font-size: 22px; width: 38px; height: 38px; line-height: 38px;
      text-align: center; background: #fff; border: 2px solid var(--amber, #f59e0b);
      border-radius: 50% 50% 50% 0; transform: rotate(-45deg);
      box-shadow: 0 2px 6px rgba(0,0,0,.3);">
        <span style="display:inline-block; transform: rotate(45deg);">${emoji}</span>
    </div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  })
}

const userIcon = L.divIcon({
  className: '',
  html: `<div style="
    width: 18px; height: 18px; background: #2563eb; border: 3px solid #fff;
    border-radius: 50%; box-shadow: 0 0 0 4px rgba(37,99,235,.3);"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

// Fit the map to show every marker whenever the data changes.
function FitBounds({ points }) {
  const map = useMap()
  useEffect(() => {
    if (!points.length) return
    if (points.length === 1) {
      map.setView(points[0], 14)
    } else {
      map.fitBounds(points, { padding: [50, 50] })
    }
  }, [map, points])
  return null
}

export default function MapView({ restaurants, userPos, height = 600 }) {
  const points = [
    ...restaurants.map(r => [r.latitude, r.longitude]),
    ...(userPos ? [[userPos.lat, userPos.lng]] : []),
  ]

  const center = userPos
    ? [userPos.lat, userPos.lng]
    : restaurants.length
      ? [restaurants[0].latitude, restaurants[0].longitude]
      : [29.7604, -95.3698]

  const cssHeight = typeof height === 'number' ? `${height}px` : height

  return (
    <div style={{
      height: '100%',
      borderRadius: 'var(--radius)', overflow: 'hidden',
      boxShadow: 'var(--shadow)', border: '1px solid var(--border)',
    }}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: cssHeight, width: '100%' }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds points={points} />

        {userPos && (
          <Marker position={[userPos.lat, userPos.lng]} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {restaurants.map(r => (
          <Marker
            key={r.id}
            position={[r.latitude, r.longitude]}
            icon={restaurantIcon(CUISINE_EMOJI[r.cuisine] || '🍽️')}
          >
            <Popup>
              <div style={{ minWidth: 180 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{r.name}</div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>{r.cuisine}</div>
                <div style={{ fontSize: 13, marginBottom: 2 }}>
                  🍻 {r.happyHour.startTime} – {r.happyHour.endTime}
                </div>
                {r.distance != null && (
                  <div style={{ fontSize: 12, color: '#92400e', marginBottom: 6 }}>
                    🧭 {formatDistance(r.distance)}
                  </div>
                )}
                <Link
                  to={`/restaurants/${r.id}`}
                  style={{ fontSize: 13, fontWeight: 600, color: '#d97706' }}
                >
                  View details →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
