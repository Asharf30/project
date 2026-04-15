export const VIEWPORT_PROFILES = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 900 },
};

export function setViewport(width, height = 900) {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });

  Object.defineProperty(window, "innerHeight", {
    configurable: true,
    writable: true,
    value: height,
  });

  window.dispatchEvent(new Event("resize"));
}

export function setViewportProfile(profile) {
  const nextProfile = VIEWPORT_PROFILES[profile];

  if (!nextProfile) {
    throw new Error(`Unknown viewport profile: ${profile}`);
  }

  setViewport(nextProfile.width, nextProfile.height);
}

export function getViewportProfileEntries() {
  return Object.entries(VIEWPORT_PROFILES);
}
