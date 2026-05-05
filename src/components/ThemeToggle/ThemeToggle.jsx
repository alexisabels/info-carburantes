import { useTheme } from "../../hooks/useTheme";
import "./ThemeToggle.css";

const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M12 2v3M12 19v3M2 12h3M19 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M21 13.5A9 9 0 1 1 10.5 3a7 7 0 0 0 10.5 10.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const MonitorIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    aria-hidden="true"
    focusable="false"
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="13"
      rx="2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M8 21h8M12 17v4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const OPTIONS = [
  { value: "system", label: "Sistema", Icon: MonitorIcon },
  { value: "light", label: "Claro", Icon: SunIcon },
  { value: "dark", label: "Oscuro", Icon: MoonIcon },
];

export default function ThemeToggle() {
  const { preference, setPreference } = useTheme();

  return (
    <div
      className="themetoggle"
      role="radiogroup"
      aria-label="Tema de la interfaz"
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = preference === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-pressed={active}
            className={
              active
                ? "themetoggle__btn themetoggle__btn--active"
                : "themetoggle__btn"
            }
            onClick={() => setPreference(value)}
          >
            <span className="themetoggle__icon">
              <Icon />
            </span>
            <span className="themetoggle__label">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
