import SiteShell from "@/components/SiteShell";
import { services } from "@/lib/data";

export default function ServicesPage() {
  return (
    <SiteShell>
      <section className="section mobile-section py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-jade-700">Services</p>
        <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Luxury spa menu</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.name} className="glass luxury-border soft-hover animate-in rounded-[8px] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-[1.6rem] font-semibold leading-tight">{service.name}</h2>
                <span className="shrink-0 rounded-full bg-champagne px-3 py-1 text-sm font-semibold text-rosewood">{service.price}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-jade-700">{service.duration}</p>
              <p className="mt-4 leading-7 text-ink/62">{service.description}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
