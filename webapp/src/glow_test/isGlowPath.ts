/** True when the current URL is a glow prototype page (/glow_test/...). */
export default function isGlowPath(): boolean {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return window.location.pathname.startsWith(`${base}/glow_test`);
}
