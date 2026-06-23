export default function HappyHourDetails({ happyHour }) {
  const { days, startTime, endTime, drinkDeals, foodDeals, description } = happyHour

  return (
    <div style={{
      background: 'var(--amber-light)',
      borderRadius: 'var(--radius)',
      padding: '24px 28px',
      border: '1px solid #fcd34d',
    }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#92400e', marginBottom: 16 }}>
        🍻 Happy Hour Details
      </h2>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        background: 'var(--amber)', borderRadius: 8, padding: '10px 16px',
        marginBottom: 18,
      }}>
        <span style={{ fontSize: 20 }}>⏰</span>
        <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>
          {startTime} – {endTime}
        </span>
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: '#92400e', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.05em' }}>
          Days
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {days.map(day => (
            <span key={day} style={{
              background: 'var(--amber-dark)', color: '#fff',
              borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 500,
            }}>
              {day}
            </span>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 14, color: '#78350f', marginBottom: 20, lineHeight: 1.6 }}>
        {description}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
        <DealList title="🍹 Drink Specials" items={drinkDeals} />
        <DealList title="🍟 Food Deals" items={foodDeals} />
      </div>
    </div>
  )
}

function DealList({ title, items }) {
  return (
    <div>
      <div style={{ fontWeight: 600, fontSize: 14, color: '#92400e', marginBottom: 10 }}>
        {title}
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {items.map((item, i) => (
          <li key={i} style={{
            fontSize: 14, color: '#78350f',
            display: 'flex', alignItems: 'flex-start', gap: 8,
          }}>
            <span style={{ color: 'var(--amber-dark)', marginTop: 2 }}>✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
