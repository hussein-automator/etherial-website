import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import closet from "@/assets/hero-closet.jpg";
import kitchen from "@/assets/hero-kitchen.jpg";
import living from "@/assets/hero-living.jpg";

const slides = [
  { src: closet, label: "Fitted closets", alt: "Concept rendering of a fitted closet in a Dubai residence" },
  { src: kitchen, label: "Bespoke kitchens", alt: "Concept rendering of a bespoke kitchen in a Dubai residence" },
  { src: living, label: "Living spaces", alt: "Concept rendering of fitted living-room joinery in a Dubai residence" },
];

export function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || hovered || reducedMotion) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, reducedMotion]);

  const go = (index: number) => setActive((index + slides.length) % slides.length);

  return (
    <div
      className="frame-fold relative aspect-[3/4] min-h-0 w-full overflow-hidden rounded-[120px_6px_120px_6px] bg-linen"
      aria-roledescription="carousel"
      aria-label="Interior design concepts"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHovered(false);
      }}
    >
      {slides.map((slide, index) => (
        <img
          key={slide.label}
          src={slide.src}
          alt={slide.alt}
          width={1024}
          height={1280}
          loading={index === 0 ? "eager" : "lazy"}
          aria-hidden={index !== active}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-ink-deep/70 px-5 pb-5 pt-8 text-linen sm:px-7">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-linen/75">Concept imagery · not client work</p>
          <p className="font-display mt-1 text-2xl">{slides[active].label}</p>
          <div className="mt-3 flex gap-2" aria-label="Choose slide">
            {slides.map((slide, index) => (
              <Button key={slide.label} type="button" variant="ghost" size="icon" onClick={() => go(index)} aria-label={`Show ${slide.label}`} aria-current={index === active ? "true" : undefined} className="h-6 w-6 rounded-full p-1 hover:bg-linen/20">
                <span className={`block h-2 w-2 rounded-full ${index === active ? "bg-brass" : "bg-linen/60"}`} />
              </Button>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 gap-1">
          <Button type="button" variant="ghost" size="icon" onClick={() => go(active - 1)} aria-label="Previous image" title="Previous image" className="rounded-full text-linen hover:bg-linen/20 hover:text-linen"><ChevronLeft /></Button>
          <Button type="button" variant="ghost" size="icon" onClick={() => go(active + 1)} aria-label="Next image" title="Next image" className="rounded-full text-linen hover:bg-linen/20 hover:text-linen"><ChevronRight /></Button>
          <Button type="button" variant="ghost" size="icon" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play slideshow" : "Pause slideshow"} title={paused ? "Play slideshow" : "Pause slideshow"} className="rounded-full text-linen hover:bg-linen/20 hover:text-linen">{paused ? <Play /> : <Pause />}</Button>
        </div>
      </div>
    </div>
  );
}
