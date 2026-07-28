import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Calculators', to: '/tools' },
  { name: 'Newsletter', to: '/newsletters' },
  { name: 'Source', to: '/opensource' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink bg-paper">
      <div className="sheet flex items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-3" aria-label="MeridianAlgo, home">
          <img src="/meridianalgo.png" alt="" className="h-7 w-7 select-none" />
          <span className="font-display text-lg font-bold tracking-tight">MeridianAlgo</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? 'page' : undefined}
                className={`nav-link border-b-2 py-1 ${
                  active ? 'border-stamp text-ink' : 'border-transparent'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-rule md:hidden" aria-label="Main">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              aria-current={pathname === link.to ? 'page' : undefined}
              className={`block px-5 py-3 sm:px-8 ${i % 2 === 1 ? 'bg-band' : ''}`}
            >
              <span className={`nav-link ${pathname === link.to ? 'text-stamp' : ''}`}>
                {link.name}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
