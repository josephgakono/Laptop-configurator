import { NavLink } from 'react-router-dom'

function Navbar({ currentAccount, onSignOut, savedBuildCount }) {
  const navLinkClassName = ({ isActive }) =>
    isActive ? 'nav-link nav-link--active' : 'nav-link'

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink className="brand-mark" to="/">
          <span className="brand-mark__eyebrow">Laptop Studio</span>
          <span className="brand-mark__title">Choose a laptop that fits your life</span>
        </NavLink>

        <nav className="navbar__links" aria-label="Primary">
          <div className="navbar__account">
            <span className="navbar__account-label">
              {currentAccount.name}
            </span>
            <button
              className="secondary-button secondary-button--small"
              type="button"
              onClick={onSignOut}
            >
              Sign Out
            </button>
          </div>
          <NavLink className={navLinkClassName} to="/" end>
            Home
          </NavLink>
          <NavLink className={navLinkClassName} to="/configurator">
            Customize
          </NavLink>
          <NavLink className={navLinkClassName} to="/saved-builds">
            Saved
            <span className="nav-link__badge">{savedBuildCount}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
