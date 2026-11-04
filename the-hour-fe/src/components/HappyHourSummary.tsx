import type { HappyHour } from '../data/happyHours'
import { ClockIcon } from './icons'

interface HappyHourSummaryProps {
  hour: HappyHour
  timeText: string
}

/** The name, status pill and time rows shared by the list and map cards. */
export default function HappyHourSummary({ hour, timeText }: HappyHourSummaryProps) {
  return (
    <>
      <div className="summary__top">
        <div className="summary__titles">
          <span className="summary__name">{hour.name}</span>
          <span className="summary__meta">{hour.meta}</span>
        </div>
        <span className={`pill pill--${hour.status}`}>{hour.pill}</span>
      </div>
      <div className="summary__time">
        <ClockIcon />
        {timeText}
      </div>
    </>
  )
}
