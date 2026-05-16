const MOBILE_QUERY = '(max-width: 768px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const matchesMedia = (query: string) => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(query).matches;
};

export const isMobileViewport = () => matchesMedia(MOBILE_QUERY);

export const prefersReducedMotion = () => matchesMedia(REDUCED_MOTION_QUERY);

export const shouldAnimate = () => !prefersReducedMotion();

export const shouldUseScrollMotion = () => !prefersReducedMotion() && !isMobileViewport();

export const killGsap = (animation?: GSAPTween | GSAPTimeline | null) => {
  animation?.scrollTrigger?.kill();
  animation?.kill();
};
