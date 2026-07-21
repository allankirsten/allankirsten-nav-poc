/**
 * Scrolls to a home-page section by id, measuring its live position instead
 * of trusting a precomputed offset — stays correct even if layout shifted
 * since mount (late-loading images/fonts, a case cover that just got added,
 * etc). Used both by the home page's own mount/hash handling and by nav
 * links that jump to a section, so there's one definition of "how we get
 * there" instead of two that can drift apart.
 */
export function scrollToHomeSection(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: "instant" });
  return true;
}
