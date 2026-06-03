import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-20 px-6">
        <div className="max-w-md text-center">
          <h1 className="font-cormorant text-7xl text-sand-900 dark:text-sand-50">404</h1>
          <h2 className="mt-4 text-xl font-medium text-sand-800 dark:text-sand-100">Page not found</h2>
          <p className="mt-2 text-sm text-sand-600 dark:text-sand-400">
            The page you're looking for doesn't exist.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded bg-sand-800 dark:bg-sand-700 px-4 py-2 text-sm font-medium text-sand-50 transition-colors hover:bg-sand-700"
            >
              Go home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-20 px-6">
        <div className="max-w-md text-center">
          <h1 className="font-cormorant text-2xl text-sand-900 dark:text-sand-50">This page didn't load</h1>
          <p className="mt-2 text-sm text-sand-600 dark:text-sand-400">Something went wrong. Try refreshing or head back home.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => { router.invalidate(); reset(); }}
              className="rounded bg-sand-800 dark:bg-sand-700 px-4 py-2 text-sm font-medium text-sand-50"
            >
              Try again
            </button>
            <a
              href="/"
              className="rounded border border-sand-300 dark:border-sand-700 bg-transparent px-4 py-2 text-sm font-medium text-sand-800 dark:text-sand-100"
            >
              Go home
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Plumsie's Place — SimLit by plumsiepie" },
      { name: "description", content: "SimLit fiction told through The Sims. Literary, character-driven stories in chapters." },
      { name: "author", content: "plumsiepie" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function ThemeInit() {
  return (
    <script
      // Initialize theme before paint to avoid FOUC
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
      }}
    />
  );
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <ThemeInit />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-sand-50 dark:bg-sand-950 text-sand-900 dark:text-sand-100 transition-colors duration-300">
        <Navbar />
        <main className="flex-1 pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
