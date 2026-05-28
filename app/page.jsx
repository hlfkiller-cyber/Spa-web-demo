import Link from "next/link";
import { ArrowRight, CalendarCheck, Gem, MapPin, ShieldCheck } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import BookingWidget from "@/components/BookingWidget";
import { services } from "@/lib/data";

export default function Home() {
  return (
    <SiteShell>
      <section className="section mobile-section grid gap-7 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-14">
        <div className="animate-in flex min-h-0 flex-col justify-center py-3 lg:min-h-[560px] lg:py-0">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#d5ba76]/30 bg-white/70 px-4 py-2 text-sm font-semibold text-jade-700">
            <MapPin size={16} aria-hidden="true" />
            Rajajinagar luxury spa
          </div>
          <h1 className="font-display text-4xl font-semibold leading-[1.04] text-ink sm:text-5xl md:text-7xl">
            ZenAura Spa Rajajinagar
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/68 sm:text-lg sm:leading-8">
            Premium spa booking with calm slot selection, WhatsApp contact, and calendar-ready appointments.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className="focus-ring soft-hover inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[8px] bg-ink px-5 py-3 text-base font-semibold text-white hover:bg-jade-700 sm:text-sm">
              Book Appointment
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/admin" className="focus-ring soft-hover inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[8px] border border-[#d5ba76]/30 bg-white/75 px-5 py-3 text-base font-semibold text-ink hover:border-jade-600 hover:text-jade-700 sm:text-sm">
              Admin Calendar
              <CalendarCheck size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:mt-9">
            {[
              ["Calendar Ready", "Automatic events when configured", ShieldCheck],
              ["Live Slots", "Booked times stay hidden", CalendarCheck],
              ["Premium Feel", "Clean services and gallery", Gem]
            ].map(([title, copy, Icon]) => (
              <div key={title} className="luxury-border soft-hover rounded-[8px] bg-white/58 p-4">
                <Icon className="text-jade-700" size={21} aria-hidden="true" />
                <h3 className="mt-3 text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink/60">{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[390px] overflow-hidden rounded-[8px] shadow-glow sm:min-h-[480px] lg:min-h-[560px]">
          <img
            src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1400&q=82"
            alt="Luxury spa treatment room"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/72 via-ink/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-champagne sm:text-sm">Today at ZenAura</p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">Four calm daily slots.</h2>
          </div>
        </div>
      </section>

      <section className="mobile-section bg-white/40 py-12">
        <div className="section grid gap-7 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-jade-700">Popular services</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Signature rituals.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {services.slice(0, 4).map((service) => (
              <div key={service.name} className="luxury-border soft-hover rounded-[8px] bg-white/72 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold">{service.name}</h3>
                  <span className="rounded-full bg-champagne px-3 py-1 text-xs font-semibold text-rosewood">{service.price}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink/62">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section mobile-section grid gap-7 py-12 lg:grid-cols-[1fr_0.95fr] lg:gap-8">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-jade-700">Fast booking</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">A minimal path to calm.</h2>
          <p className="mt-4 leading-7 text-ink/65">Pick a service, choose a slot, and confirm in seconds.</p>
        </div>
        <BookingWidget />
      </section>
    </SiteShell>
  );
}
