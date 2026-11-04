import { useState } from 'react'
import DayPicker from './components/DayPicker'
import Header from './components/Header'
import { ListIcon, MapIcon } from './components/icons'
import ListView, { type Section } from './components/ListView'
import MapView from './components/MapView'
import { TODAY, TODAY_LABEL, UPCOMING_DAYS, toHappyHour } from './data/happyHours'
import './App.css'

type Tab = 'today' | 'upcoming'
type View = 'list' | 'map'

function App() {
  const [tab, setTab] = useState<Tab>('today')
  const [view, setView] = useState<View>('list')
  const [dayIndex, setDayIndex] = useState(0)
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null)

  const isToday = tab === 'today'
  const day = UPCOMING_DAYS[dayIndex]
  const hours = (isToday ? TODAY : day.listings).map(toHappyHour)
  const selected = hours.find((hour) => hour.venue === selectedVenue) ?? hours[0]

  const liveHours = hours.filter((hour) => hour.status !== 'later')
  const laterHours = hours.filter((hour) => hour.status === 'later')

  const sections: Section[] = isToday
    ? [
        { title: 'Happening now', dot: 'now', items: liveHours },
        { title: 'Later today', dot: 'later', items: laterHours },
      ]
    : [{ title: day.full, dot: 'soon', items: hours }]

  const changeTab = (next: Tab) => {
    setTab(next)
    setSelectedVenue(null)
  }

  const changeDay = (index: number) => {
    setDayIndex(index)
    setSelectedVenue(null)
  }

  return (
    <main className="app">
      <Header />

      <div className="tabs-wrap">
        <div className="tabs">
          <button className={`tabs__tab${isToday ? ' is-active' : ''}`} aria-pressed={isToday} onClick={() => changeTab('today')}>
            Today
          </button>
          <button className={`tabs__tab${isToday ? '' : ' is-active'}`} aria-pressed={!isToday} onClick={() => changeTab('upcoming')}>
            Upcoming
          </button>
        </div>
      </div>

      {!isToday && <DayPicker days={UPCOMING_DAYS} selectedIndex={dayIndex} onSelect={changeDay} />}

      <div className="summary-bar">
        <div className="summary-bar__text">
          <span className="summary-bar__date">{isToday ? TODAY_LABEL : day.full}</span>
          <span className="summary-bar__count">
            {isToday
              ? `${liveHours.length} happening now · ${laterHours.length} later tonight`
              : `${hours.length} happy hours that day`}
          </span>
        </div>
        <div className="view-toggle">
          <button
            className={`view-toggle__option${view === 'list' ? ' is-active' : ''}`}
            aria-label="List view"
            aria-pressed={view === 'list'}
            onClick={() => setView('list')}
          >
            <ListIcon />
            List
          </button>
          <button
            className={`view-toggle__option${view === 'map' ? ' is-active' : ''}`}
            aria-label="Map view"
            aria-pressed={view === 'map'}
            onClick={() => setView('map')}
          >
            <MapIcon />
            Map
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <ListView sections={sections} />
      ) : (
        <MapView hours={hours} selected={selected} onSelect={(hour) => setSelectedVenue(hour.venue)} />
      )}
    </main>
  )
}

export default App
