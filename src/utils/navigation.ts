export const scrollToSection = (id: string, behavior: ScrollBehavior = 'smooth') => {
  const el = document.getElementById(id);
  if (!el) return;

  window.scrollTo({
    top: el.offsetTop,
    behavior,
  });
};
