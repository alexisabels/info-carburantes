import { Geist } from "next/font/google";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { buildMetadata } from "../lib/seo";
import { jsonLdWebSite } from "../lib/seo";
import { getSiteUrl } from "../lib/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-geist",
});

// Script inline para resolver el tema ANTES del primer paint y evitar FOUC.
// Lee la preferencia persistida, calcula el tema resuelto y aplica
// data-theme en <html>. El hook useTheme se sincroniza después.
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
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0a0a0a" : "#ffffff");
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
  return (
    <html lang="es" className={geist.variable}>
      <head>
        {/* Pre-paint theme switch — debe ir antes del primer render del DOM. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
        <link rel="mask-icon" href="/gas.svg" color="#0a0a0a" />
        {/* JSON-LD del sitio: ayuda a Google a entender el sitebox y el
            potencial enlace de sitelink-search. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
