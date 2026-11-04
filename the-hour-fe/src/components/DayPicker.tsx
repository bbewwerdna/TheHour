import type { Day } from '../data/happyHours'

interface DayPickerProps {
  days: Day[]
  selectedIndex: number
  onSelect: (index: number) => void
}

export default function DayPicker({ days, selectedIndex, onSelect }: DayPickerProps) {
  return (
    <div className="day-picker">
      {days.map((day, index) => (
        <button
          key={day.full}
          className={`day-picker__day${index === selectedIndex ? ' is-active' : ''}`}
          aria-label={day.full}
          aria-pressed={index === selectedIndex}
          onClick={() => onSelect(index)}
        >
          <span className="day-picker__label">{day.label}</span>
          <span className="day-picker__num">{day.num}</span>
        </button>
      ))}
    </div>
  )
}
