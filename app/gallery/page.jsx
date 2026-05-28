import SiteShell from "@/components/SiteShell";
import { gallery } from "@/lib/data";

export default function GalleryPage() {
  return (
    <SiteShell>
      <section className="section mobile-section py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-jade-700">Gallery</p>
        <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">ZenAura ambience</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {gallery.map((item, index) => (
            <figure key={item.title} className={`relative min-h-[260px] overflow-hidden rounded-[8px] shadow-glow sm:min-h-[320px] ${index === 0 ? "md:min-h-[460px]" : ""}`}>
              <div className="absolute inset-0 bg-jade-700" />
              <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105" />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-5 font-display text-xl font-semibold text-white sm:text-2xl">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
