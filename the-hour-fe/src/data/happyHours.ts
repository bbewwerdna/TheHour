// Sample data from the design. Replace with real data once a backend exists.

export type Status = 'now' | 'soon' | 'later'

type VenueId = 'copper' | 'casa' | 'bayou' | 'harbor' | 'neon'

interface Venue {
  name: string
  hood: string
  dist: string
  /** Map position, as a percentage of the map's width and height. */
  x: number
  y: number
}

export interface Listing {
  venue: VenueId
  time: string
  status: Status
  pill: string
  deals: string[]
}

export interface Day {
  label: string
  num: string
  full: string
  listings: Listing[]
}

export interface HappyHour extends Listing {
  name: string
  meta: string
  x: number
  y: number
}

const VENUES: Record<VenueId, Venue> = {
  copper: { name: 'The Copper Tap', hood: 'Midtown', dist: '0.4 mi', x: 50, y: 40 },
  casa: { name: 'Casa Verde Cantina', hood: 'Montrose', dist: '0.8 mi', x: 30, y: 58 },
  bayou: { name: 'Bayou Oyster Bar', hood: 'Heights', dist: '1.6 mi', x: 44, y: 18 },
  harbor: { name: 'Harbor & Vine', hood: 'Rice Village', dist: '2.1 mi', x: 22, y: 34 },
  neon: { name: 'Neon Lantern', hood: 'EaDo', dist: '2.4 mi', x: 78, y: 30 },
}

export const TODAY_LABEL = 'Wednesday, Nov 4'

export const TODAY: Listing[] = [
  { venue: 'bayou', time: '4–6 pm', status: 'soon', pill: 'Ends in 42 min', deals: ['$1 oysters', '$6 wine'] },
  { venue: 'casa', time: '4–6:30 pm', status: 'now', pill: 'Ends in 1 hr 12 min', deals: ['$5 margaritas', '$2 street tacos'] },
  { venue: 'copper', time: '3–7 pm', status: 'now', pill: 'Ends in 1 hr 42 min', deals: ['$4 drafts', 'Half-price wings'] },
  { venue: 'harbor', time: '9–11 pm', status: 'later', pill: 'Starts 9 pm', deals: ['Half-price bottles', '$8 flatbreads'] },
  { venue: 'neon', time: '10 pm–close', status: 'later', pill: 'Starts 10 pm', deals: ['$3 wells', '$5 sliders'] },
]

const upcoming = (venue: VenueId, time: string, start: string, deals: string[]): Listing => ({
  venue,
  time,
  status: 'later',
  pill: `Starts ${start}`,
  deals,
})

const copper = upcoming('copper', '3–7 pm', '3 pm', ['$4 drafts', 'Half-price wings'])
const bayouWeekday = upcoming('bayou', '4–6 pm', '4 pm', ['$1 oysters', '$6 wine'])
const bayouWeekend = upcoming('bayou', '2–5 pm', '2 pm', ['$1 oysters', '$5 micheladas'])
const casa = upcoming('casa', '4–6:30 pm', '4 pm', ['$5 margaritas', '$2 street tacos'])
const harbor = upcoming('harbor', '9–11 pm', '9 pm', ['Half-price bottles', '$8 flatbreads'])
const neon = upcoming('neon', '10 pm–close', '10 pm', ['$3 wells', '$5 sliders'])

export const UPCOMING_DAYS: Day[] = [
  { label: 'Thu', num: '5', full: 'Thursday, Nov 5', listings: [copper, bayouWeekday, casa] },
  { label: 'Fri', num: '6', full: 'Friday, Nov 6', listings: [copper, harbor, neon] },
  { label: 'Sat', num: '7', full: 'Saturday, Nov 7', listings: [bayouWeekend, neon] },
  {
    label: 'Sun',
    num: '8',
    full: 'Sunday, Nov 8',
    listings: [upcoming('casa', '11 am–3 pm', '11 am', ['$4 mimosas', '$5 bloody marys']), bayouWeekend],
  },
  { label: 'Mon', num: '9', full: 'Monday, Nov 9', listings: [copper, casa] },
  { label: 'Tue', num: '10', full: 'Tuesday, Nov 10', listings: [casa, copper, bayouWeekday] },
]

export function toHappyHour(listing: Listing): HappyHour {
  const { name, hood, dist, x, y } = VENUES[listing.venue]
  return { ...listing, name, meta: `${hood} · ${dist}`, x, y }
}
