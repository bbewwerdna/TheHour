import { Fragment } from 'react'
import type { HappyHour, Status } from '../data/happyHours'
import HappyHourSummary from './HappyHourSummary'

export interface Section {
  title: string
  dot: Status
  items: HappyHour[]
}

export default function ListView({ sections }: { sections: Section[] }) {
  return (
    <div className="list-view">
      {sections.map((section) => (
        <Fragment key={section.title}>
          <div className="section-heading">
            <span className={`dot section-heading__dot dot--${section.dot}`} />
            <span className="section-heading__title">{section.title}</span>
            <span className="section-heading__count">{section.items.length}</span>
          </div>
          {section.items.map((hour) => (
            <article className="card" key={hour.venue}>
              <HappyHourSummary hour={hour} timeText={hour.time} />
              <div className="card__deals">
                {hour.deals.map((deal) => (
                  <span className="card__deal" key={deal}>
                    {deal}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </Fragment>
      ))}
    </div>
  )
}
