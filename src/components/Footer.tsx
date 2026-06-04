export function Footer() {
  return (
    <footer className="bg-sand-950 text-sand-300">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <a href="/" className="flex items-baseline gap-2 group mb-3">
              <span className="font-cormorant font-semibold text-2xl text-sand-50 tracking-tight group-hover:text-sand-50 transition-colors">
                plumsie
              </span>
              <span className="font-cormorant font-semibold text-2xl text-sand-400 italic tracking-tight group-hover:text-sand-50 transition-colors">
                stories
              </span>
            </a>
            <p className="text-sand-600 text-sm leading-relaxed">Game-inspired fiction, told in chapters.</p>
            <p className="text-sand-600 text-xs mt-4">Made with ♥ in The Sims</p>
          </div>

          <div>
            <h3 className="text-sand-400 text-xs uppercase tracking-widest mb-4">Navigate</h3>
            <nav className="flex flex-col gap-2" aria-label="Footer">
              {[
                { href: "/", label: "Home" },
                { href: "/stories", label: "Stories" },
                { href: "/blog", label: "Blog" },
                { href: "/about", label: "About" },
              ].map(({ href, label }) => (
                <a key={href} href={href} className="text-sand-400 hover:text-sand-100 text-sm transition-colors">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sand-400 text-xs uppercase tracking-widest mb-4">Find me</h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://twitch.tv/plumsieco"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand-400 hover:text-sand-100 text-sm transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
                </svg>
                Twitch — PlumsieCo
              </a>
              <a
                href="https://instagram.com/plumsieness"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand-400 hover:text-sand-100 text-sm transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram — @plumsieness
              </a>
              <a
                href="https://ko-fi.com/plumsiepie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sand-400 hover:text-sand-100 text-sm transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" />
                </svg>
                Ko-fi — Support the writing
              </a>
            </div>

          </div>
        </div>

        <div className="border-t border-sand-800 pt-6 text-center text-sand-600 text-xs">
          &copy; {new Date().getFullYear()} Plumsie & Co. — All rights reserved
        </div>
      </div>
    </footer>
  );
}
