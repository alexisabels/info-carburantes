import { Geist } from "next/font/google";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {
  buildMetadata,
  jsonLdOrganization,
  jsonLdWebSite,
} from "../lib/seo";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-geist",
});

// Script inline para resolver el tema ANTES del primer paint y evitar FOUC.
// Si la preferencia es "system" deja que ganen las dos <meta name=theme-color
// media="..."> que pone el viewport (cada una con su media query). Si el
// usuario eligió explícitamente claro/oscuro, sustituye AMBAS por una sola
// meta sin media query (evita que el SO sobreescriba la elección manual).
const THEME_BOOTSTRAP = `
(function () {
  try {
    var pref = localStorage.getItem("theme.preference");
    if (pref !== "light" && pref !== "dark" && pref !== "system") pref = "system";
    var theme = pref;
    if (pref === "system") {
      theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    document.documentElement.setAttribute("data-theme", theme);
    if (pref !== "system") {
      var metas = document.querySelectorAll('meta[name="theme-color"]');
      metas.forEach(function (m) { m.parentNode && m.parentNode.removeChild(m); });
      var override = document.createElement("meta");
      override.setAttribute("name", "theme-color");
      override.setAttribute("content", theme === "dark" ? "#0a0a0a" : "#ffffff");
      document.head.appendChild(override);
    }
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`;

export const metadata = {
  ...buildMetadata({
    title: "Carburantes — Precios de gasolineras en España",
    path: "/",
  }),
  applicationName: "Carburantes",
  authors: [{ name: "alexisabel", url: "https://alexisabel.com" }],
  creator: "alexisabel",
  publisher: "alexisabel",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Carburantes",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/gas.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }) {
  const websiteJsonLd = jsonLdWebSite();
  const orgJsonLd = jsonLdOrganization();
  return (
    <html lang="es" className={geist.variable}>
      <head>
        {/* Pre-paint theme switch — debe ir antes del primer render del DOM. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
        <link rel="mask-icon" href="/gas.svg" color="#0a0a0a" />
        {/* MITECO se llama desde el cliente para "Cerca de mí" y el histórico:
            preconnect resuelve DNS + TLS antes del primer fetch real y baja
            cientos de ms en redes móviles. */}
        <link
          rel="preconnect"
          href="https://sedeaplicaciones.minetur.gob.es"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://sedeaplicaciones.minetur.gob.es"
        />
        {/* JSON-LD del sitio: WebSite con SearchAction + Organization.
            Ayudan a construir el knowledge graph + sitelink-search en
            resultados de marca ("carburantes"). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Saltar al contenido
        </a>
        <div className="app">
          <div className="container">
            <Header />
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
