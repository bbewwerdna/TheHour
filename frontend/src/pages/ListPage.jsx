import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { fetchRestaurants } from '../api/restaurants'
import { distanceMiles } from '../utils/distance'
import { useMediaQuery } from '../hooks/useMediaQuery'
import SearchBar from '../components/SearchBar'
import DayFilter from '../components/DayFilter'
import RestaurantCard from '../components/RestaurantCard'
import RestaurantDetailPanel from '../components/RestaurantDetailPanel'
import MapView from '../components/MapView'

export default function ListPage() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [day, setDay] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const debounceRef = useRef(null)

  // Geolocation state
  const [userPos, setUserPos] = useState(() => {
    const cached = sessionStorage.getItem('userPos')
    return cached ? JSON.parse(cached) : null
  })
  const [geoStatus, setGeoStatus] = useState('idle') // idle | locating | granted | denied | unsupported
  const [view, setView] = useState('list') // list | map
  const [selectedId, setSelectedId] = useState(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const load = useCallback(async (name, selectedDay, loc) => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchRestaurants(name, selectedDay, loc)
      setRestaurants(data)
    } catch {
      setError('Could not connect to server. Make sure the backend is running on port 8080.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => load(query, day, location), 300)
    return () => clearTimeout(debounceRef.current)
  }, [query, day, location, load])

  const requestLocation = () => {
    if (!('geolocation' in navigator)) {
      setGeoStatus('unsupported')
      return
    }
    setGeoStatus('locating')
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        setUserPos(coords)
        sessionStorage.setItem('userPos', JSON.stringify(coords))
        setGeoStatus('granted')
      },
      () => setGeoStatus('denied'),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    )
  }

  const clearLocation = () => {
    setUserPos(null)
    sessionStorage.removeItem('userPos')
    setGeoStatus('idle')
  }

  // Attach distance and sort by proximity when we have the user's position.
  const displayed = useMemo(() => {
    if (!userPos) return restaurants
    return restaurants
      .map(r => ({
        ...r,
        distance: distanceMiles(userPos.lat, userPos.lng, r.latitude, r.longitude),
      }))
      .sort((a, b) => a.distance - b.distance)
  }, [restaurants, userPos])

  const locating = geoStatus === 'locating'

  // The selected restaurant, if it's still present in the current filtered list.
  const selected = displayed.find(r => r.id === selectedId) || null

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <header style={{
        flexShrink: 0,
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        color: '#fff',
        padding: isMobile ? '12px 16px' : '14px 24px',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 26 }}>🍺</span>
          <h1 style={{
            fontSize: isMobile ? 20 : 24, fontWeight: 800, letterSpacing: '-.02em',
          }}>
            Happy Hour Finder
          </h1>
          {!isMobile && (
            <p style={{ color: '#9ca3af', fontSize: 14, marginLeft: 4 }}>
              Discover the best happy hour deals near you
            </p>
          )}
        </div>
      </header>

      <div style={{
        flex: 1, minHeight: 0, width: '100%',
        maxWidth: 1200, margin: '0 auto',
        padding: isMobile ? '16px 12px' : '24px 16px',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          flexShrink: 0,
          background: 'var(--surface)',
          borderRadius: 'var(--radius)',
          padding: '20px 22px',
          boxShadow: 'var(--shadow)',
          marginBottom: 16,
          border: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
            <SearchBar value={query} onChange={setQuery} autoFocus />
            <SearchBar
              value={location}
              onChange={setLocation}
              placeholder="City or ZIP..."
              icon="🏙️"
            />
            {userPos ? (
              <button
                onClick={clearLocation}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '12px 18px', borderRadius: 'var(--radius)',
                  border: '1.5px solid var(--amber-dark)', background: 'var(--amber)',
                  color: '#fff', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap',
                }}
              >
                📍 Near Me ✕
              </button>
            ) : (
              <button
                onClick={requestLocation}
                disabled={locating}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '12px 18px', borderRadius: 'var(--radius)',
                  border: '1.5px solid var(--border)', background: 'var(--surface)',
                  color: 'var(--text)', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap',
                  opacity: locating ? 0.6 : 1,
                }}
              >
                {locating ? '⏳ Locating…' : '📍 Near Me'}
              </button>
            )}
          </div>
          <DayFilter selected={day} onSelect={setDay} />
        </div>

        {geoStatus === 'denied' && (
          <div style={{
            flexShrink: 0,
            background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 8,
            padding: '12px 16px', color: '#92400e', fontSize: 13, marginBottom: 16,
          }}>
            📍 Location access was blocked. Enable location permission in your browser to sort by distance.
          </div>
        )}
        {geoStatus === 'unsupported' && (
          <div style={{
            flexShrink: 0,
            background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 8,
            padding: '12px 16px', color: '#92400e', fontSize: 13, marginBottom: 16,
          }}>
            📍 Your browser doesn't support geolocation.
          </div>
        )}

        {error && (
          <div style={{
            flexShrink: 0,
            background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8,
            padding: '14px 18px', color: '#991b1b', fontSize: 14, marginBottom: 16,
          }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{
          flexShrink: 0,
          marginBottom: 12, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
        }}>
          <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            {!loading && !error && (
              <>
                {displayed.length} restaurant{displayed.length !== 1 ? 's' : ''} found
                {location && <> in <strong>{location}</strong></>}
                {day && <> on <strong>{day}s</strong></>}
                {query && <> matching "<strong>{query}</strong>"</>}
                {userPos && <> · <strong>sorted by distance</strong> 📍</>}
              </>
            )}
          </div>
          <div style={{
            display: 'flex', background: 'var(--surface)', borderRadius: 'var(--radius)',
            border: '1px solid var(--border)', padding: 3, gap: 2,
          }}>
            {[['list', '📋 List'], ['map', '🗺️ Map']].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setView(key)}
                style={{
                  padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                  border: 'none',
                  background: view === key ? 'var(--amber)' : 'transparent',
                  color: view === key ? '#fff' : 'var(--text-muted)',
                  transition: 'all .15s',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Fills remaining viewport height; children manage their own scroll. */}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>⏳</div>
              Loading happy hours...
            </div>
          ) : displayed.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🤷</div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No results found</div>
              <div style={{ fontSize: 14 }}>Try a different search term or day filter</div>
            </div>
          ) : view === 'map' ? (
            <div style={{ flex: 1, minHeight: 0 }}>
              <MapView restaurants={displayed} userPos={userPos} height="100%" />
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 20, flex: 1, minHeight: 0 }}>
              {/* Left: single-column list with its OWN internal scroll */}
              <div style={{
                flex: selected && !isMobile ? '0 0 380px' : '1 1 auto',
                minWidth: 0,
                overflowY: 'auto',
                display: 'flex', flexDirection: 'column', gap: 14,
                paddingRight: 4, paddingBottom: 4,
              }}>
                {displayed.map(r => (
                  <RestaurantCard
                    key={r.id}
                    restaurant={r}
                    distance={r.distance}
                    selected={r.id === selectedId}
                    onSelect={() => setSelectedId(r.id)}
                  />
                ))}
              </div>

              {/* Right: detail panel.
                  Desktop: side column with its own scroll, full height of the row.
                  Mobile: full-screen overlay so the narrow list isn't squeezed. */}
              {selected && !isMobile && (
                <div style={{
                  flex: '1 1 0',
                  minHeight: 0,
                  overflowY: 'auto',
                  paddingRight: 4,
                }}>
                  <RestaurantDetailPanel
                    restaurant={selected}
                    distance={selected.distance}
                    onClose={() => setSelectedId(null)}
                  />
                </div>
              )}
              {selected && isMobile && (
                <div style={{
                  position: 'fixed', inset: 0, zIndex: 1000,
                  background: 'var(--surface-2)', overflowY: 'auto',
                  padding: '16px 12px',
                }}>
                  <RestaurantDetailPanel
                    restaurant={selected}
                    distance={selected.distance}
                    onClose={() => setSelectedId(null)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
