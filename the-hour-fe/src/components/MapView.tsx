import type { HappyHour } from '../data/happyHours'
import HappyHourSummary from './HappyHourSummary'

interface MapViewProps {
  hours: HappyHour[]
  selected: HappyHour
  onSelect: (hour: HappyHour) => void
}

/** Placeholder street map. Lines run past the design's 390×600 frame so it fills any screen. */
function MapBackdrop() {
  return (
    <svg className="map-view__backdrop" width="100%" height="100%" fill="none" aria-hidden="true">
      <path d="M-10 420 C 90 380, 140 470, 240 430 S 380 360, 410 390 S 470 400, 500 380" stroke="#22324A" strokeWidth="22" />
      <rect x="250" y="40" width="90" height="70" rx="10" fill="#1F2A24" />
      <rect x="40" y="250" width="70" height="60" rx="10" fill="#1F2A24" />
      <path d="M0 120 H500" stroke="#2A2E38" strokeWidth="8" />
      <path d="M0 260 H500" stroke="#2A2E38" strokeWidth="12" />
      <path d="M0 510 H500" stroke="#2A2E38" strokeWidth="8" />
      <path d="M90 0 V1400" stroke="#2A2E38" strokeWidth="8" />
      <path d="M210 0 V1400" stroke="#2A2E38" strokeWidth="12" />
      <path d="M320 0 V1400" stroke="#2A2E38" strokeWidth="8" />
      <path d="M0 40 L500 450.26" stroke="#262A34" strokeWidth="6" />
    </svg>
  )
}

export default function MapView({ hours, selected, onSelect }: MapViewProps) {
  return (
    <div className="map-view">
      <MapBackdrop />
      <div className="map-view__you" aria-hidden="true" />

      {hours.map((hour) => {
        const isSelected = hour.venue === selected.venue
        return (
          <button
            key={hour.venue}
            className="map-pin"
            style={{ left: `${hour.x}%`, top: `${hour.y}%` }}
            aria-label={hour.name}
            aria-pressed={isSelected}
            onClick={() => onSelect(hour)}
          >
            <span className={`dot map-pin__dot dot--${hour.status}${isSelected ? ' is-selected' : ''}`} />
          </button>
        )
      })}

      <div className="map-legend">
        <span className="map-legend__item">
          <span className="dot map-legend__dot dot--now" />
          Now
        </span>
        <span className="map-legend__item">
          <span className="dot map-legend__dot dot--soon" />
          Ending soon
        </span>
        <span className="map-legend__item">
          <span className="dot map-legend__dot dot--later" />
          Later
        </span>
      </div>

      <article className="map-card">
        <HappyHourSummary hour={selected} timeText={`${selected.time} · ${selected.deals.join(' · ')}`} />
        <div className="map-card__actions">
          <button className="map-card__action map-card__action--primary">View details</button>
          <button className="map-card__action">Directions</button>
        </div>
      </article>
    </div>
  )
}
