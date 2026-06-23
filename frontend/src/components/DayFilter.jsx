const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function DayFilter({ selected, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {DAYS.map((day, i) => {
        const active = selected === day
        return (
          <button
            key={day}
            onClick={() => onSelect(active ? '' : day)}
            style={{
              padding: '7px 14px',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 500,
              border: active ? '1.5px solid var(--amber-dark)' : '1.5px solid var(--border)',
              background: active ? 'var(--amber)' : 'var(--surface)',
              color: active ? '#fff' : 'var(--text-muted)',
              transition: 'all .15s',
            }}
          >
            {SHORT[i]}
          </button>
        )
      })}
    </div>
  )
}
