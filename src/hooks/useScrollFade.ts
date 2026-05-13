import { useEffect, useState } from "react";

export function useScrollFade(fadeDistance = 400) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setOpacity(Math.max(0, 1 - y / fadeDistance));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fadeDistance]);

  return opacity;
}
