import { AccountIcon, LocationIcon, LogoIcon } from './icons'

export default function Header() {
  return (
    <header className="header">
      <div className="header__brand">
        <div className="header__logo">
          <LogoIcon />
        </div>
        <div className="header__titles">
          <span className="header__title">Happy Hour Finder</span>
          <span className="header__location">
            <LocationIcon />
            Midtown, Houston
          </span>
        </div>
      </div>
      <button className="header__account" aria-label="Account">
        <AccountIcon />
      </button>
    </header>
  )
}
