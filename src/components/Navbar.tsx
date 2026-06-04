import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/stories", label: "Stories" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);

    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "navbar-scrolled" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-baseline gap-2 group">
          <span className="font-cormorant font-semibold text-2xl text-sand-900 tracking-tight group-hover:text-sand-700 transition-colors">
            plumsie
          </span>
          <span className="font-cormorant font-semibold text-2xl text-sand-400 italic tracking-tight group-hover:text-sand-700 transition-colors">
            stories
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className={`text-sm tracking-wide transition-colors hover:text-sand-700 dark:hover:text-sand-200 ${
                pathname === href
                  ? "text-sand-800 dark:text-sand-100 font-medium"
                  : "text-sand-700 dark:text-sand-400"
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-8 h-8 flex items-center justify-center rounded-full text-sand-600 dark:text-sand-400 hover:bg-sand-800 dark:hover:bg-sand-100 transition-colors group"
          >
            {isDark ? (
              <svg className="w-4 h-4 group-hover:text-sand-800 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9H21M3 12H2m15.36-6.36l-.71.71M6.34 17.66l-.71.71M17.66 17.66l.71.71M6.34 6.34l.71.71M12 7a5 5 0 100 10A5 5 0 0012 7z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-sand-400 dark:group-hover:text-sand-100 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
              </svg>
            )}
          </button>
        </nav>

        <button
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className="w-5 h-0.5 bg-sand-700 dark:bg-sand-300 block" />
          <span className="w-5 h-0.5 bg-sand-700 dark:bg-sand-300 block" />
          <span className="w-5 h-0.5 bg-sand-700 dark:bg-sand-300 block" />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-sand-50/98 dark:bg-sand-950/98 backdrop-blur-md border-t border-sand-200 dark:border-sand-800">
          <nav className="flex flex-col px-6 py-4 gap-4" aria-label="Mobile">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setMobileOpen(false)}
                className={`text-base transition-colors hover:text-sand-700 dark:hover:text-sand-200 ${
                  pathname === href ? "text-sand-800 dark:text-sand-100 font-medium" : "text-sand-700 dark:text-sand-400"
                }`}
              >
                {label}
              </Link>
            ))}
            <button onClick={toggleTheme} className="text-left text-sand-700 dark:text-sand-400 text-base">
              {isDark ? "Switch to light mode" : "Switch to dark mode"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
