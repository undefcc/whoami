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
          <NavLink to="/studio">工作室</NavLink>
        </nav>
      </header>
      <Outlet />
      <footer className="footer">
        <span>本地 Vite 启动，不经过 SSR。</span>
        <span>密钥可在闲鱼 / 小红书私下发给买家。</span>
      </footer>
    </div>
  )
}
