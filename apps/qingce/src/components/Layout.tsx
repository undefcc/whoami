import { NavLink, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="shell">
      <header className="nav">
        <NavLink to="/" className="brand">
          <span className="mark" aria-hidden="true">
            青
          </span>
          青测
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end>
            测评
          </NavLink>
          <NavLink to="/unlock">解锁</NavLink>
        </nav>
      </header>
      <Outlet />
      <footer className="footer">
        <span>青测</span>
      </footer>
    </div>
  )
}
