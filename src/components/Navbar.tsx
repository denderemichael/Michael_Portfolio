import { useEffect, useState } from "react";

const links = [
  { id: "about", label: "About Me" },
  { id: "skills", label: "Core Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
      const offsets = links.map((l) => {
        const el = document.getElementById(l.id);
        if (!el) return { id: l.id, top: Number.POSITIVE_INFINITY };
        const rect = el.getBoundingClientRect();
        return { id: l.id, top: Math.abs(rect.top - 120) };
      });
      offsets.sort((a, b) => a.top - b.top);
      setActive(offsets[0].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Primary"
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <ul className="flex items-center gap-2 sm:gap-4 bg-background/95 backdrop-blur shadow-md rounded-full px-3 sm:px-6 py-2 border border-border/20">
        {links.map((l) => (
          <li key={l.id}>
            <button
              onClick={() => handleClick(l.id)}
              className={`text-sm sm:text-base font-medium px-3 py-1.5 rounded-full transition-colors ${
                active === l.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
