import { useState } from 'react'
import { FaBars, FaLaptopCode, FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router'

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const base = 'transition hover:text-blue-400'
  const active = 'text-blue-400 font-semibold'

  function getNavLinkClass({ isActive }: { isActive: boolean }) {
    return isActive ? active : base
  }

  function collapseMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-blue-300"
        >
          <FaLaptopCode className="text-blue-400 text-xl" />
          <span>The Friendly Dev</span>
        </NavLink>

        <div className="hidden md:flex items-center gap-6">
          <div className="space-x-4 text-sm text-gray-300">
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/project" className={getNavLinkClass}>
              Projects
            </NavLink>
            <NavLink to="/blog" className={getNavLinkClass}>
              Blog
            </NavLink>
            <NavLink to="/about" className={getNavLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={getNavLinkClass}>
              Contact
            </NavLink>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => {
              setMenuOpen(!menuOpen)
            }}
            className="text-blue-400 text-xl cursor-pointer"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-2 space-x-4 text-center">
          <NavLink to="/" onClick={collapseMenu} className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink
            to="/project"
            onClick={collapseMenu}
            className={getNavLinkClass}
          >
            Projects
          </NavLink>
          <NavLink
            to="/blog"
            onClick={collapseMenu}
            className={getNavLinkClass}
          >
            Blog
          </NavLink>
          <NavLink
            to="/about"
            onClick={collapseMenu}
            className={getNavLinkClass}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={collapseMenu}
            className={getNavLinkClass}
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  )
}
