import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);

    // Fake Loading Bar Animation
    const bar = document.getElementById('top-loading-bar');
    if (bar) {
      // Reset state immediately
      bar.style.transition = 'none';
      bar.style.width = '0%';
      bar.style.opacity = '1';

      // Start animation sequence
      setTimeout(() => {
        bar.style.transition = 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease';
        bar.style.width = '60%';
      }, 50);

      setTimeout(() => {
        bar.style.width = '100%';
      }, 500);

      // Fade out
      setTimeout(() => {
        bar.style.opacity = '0';
        setTimeout(() => {
          bar.style.width = '0%';
        }, 400);
      }, 1000);
    }
  }, [pathname]);
  return null;
}

export default ScrollToTop;
