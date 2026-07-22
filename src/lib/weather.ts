export type WeatherKind = "fog" | "clear" | "rain" | "snow" | "night";

const STORAGE_KEY = "site-weather";
const FETCH_TIMEOUT_MS = 3000;

function isNightHour(): boolean {
  const hour = new Date().getHours();
  return hour < 6 || hour >= 19;
}

// WMO weather codes used by Open-Meteo.
function codeToWeather(code: number): WeatherKind {
  if (code === 0 || code === 1) return "clear";
  if ([2, 3, 45, 48].includes(code)) return "fog";
  if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(
      code,
    )
  )
    return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  return "fog";
}

async function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Detects ambient weather for the loading gate. Always falls back to "fog"
 * on any failure (blocked IP lookup, offline, slow network, API error) —
 * this path must never hang or throw.
 */
export async function detectWeather(): Promise<WeatherKind> {
  if (typeof window === "undefined") return "fog";

  const cached = sessionStorage.getItem(STORAGE_KEY);
  if (cached) return cached as WeatherKind;

  let weather: WeatherKind = "fog";

  try {
    const geoRes = await fetchWithTimeout(
      "https://ipapi.co/json/",
      FETCH_TIMEOUT_MS,
    );
    if (!geoRes.ok) throw new Error("geo lookup failed");
    const geo = await geoRes.json();

    const weatherRes = await fetchWithTimeout(
      `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&current=weather_code`,
      FETCH_TIMEOUT_MS,
    );
    if (!weatherRes.ok) throw new Error("weather lookup failed");
    const data = await weatherRes.json();
    const code = data?.current?.weather_code;

    weather = typeof code === "number" ? codeToWeather(code) : "fog";
  } catch {
    weather = "fog";
  }

  if (isNightHour() && weather !== "rain" && weather !== "snow") {
    weather = "night";
  }

  sessionStorage.setItem(STORAGE_KEY, weather);
  return weather;
}
