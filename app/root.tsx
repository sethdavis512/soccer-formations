import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-1.5 ${isActive ? "bg-emerald-50 text-emerald-800" : "text-slate-700 hover:bg-slate-100"}`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen antialiased">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
            <Link to="/" className="flex items-center gap-2 font-bold text-slate-900">
              <span aria-hidden="true">⚽</span> Formations
            </Link>
            <div className="flex gap-1 text-sm font-medium">
              <NavLink to="/" end className={navClass}>
                Home
              </NavLink>
              <NavLink to="/formations" className={navClass}>
                Browse
              </NavLink>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
        <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-600">
          A React Router 8 static-content demo.{" "}
          <a
            href="https://github.com/sethdavis512/soccer-formations"
            className="font-medium text-emerald-800 underline underline-offset-2 hover:text-emerald-900"
          >
            View the source
          </a>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404: Offside" : "Error";
    details = error.status === 404 ? "That page isn't on the team sheet." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="py-12 text-center">
      {/* Route `meta` doesn't run when a loader throws, so title the error page here. */}
      <title>{`${message} | Soccer Formations`}</title>
      <h1 className="text-3xl font-bold text-slate-900">{message}</h1>
      <p className="mt-2 text-slate-700">{details}</p>
      <Link to="/formations" className="mt-6 inline-block font-medium text-emerald-800 underline underline-offset-2">
        Browse all formations
      </Link>
      {stack && (
        <pre className="mt-8 w-full overflow-x-auto p-4 text-left">
          <code>{stack}</code>
        </pre>
      )}
    </div>
  );
}
