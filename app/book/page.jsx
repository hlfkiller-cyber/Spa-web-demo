import BookingWidget from "@/components/BookingWidget";
import SiteShell from "@/components/SiteShell";

export default function BookPage() {
  return (
    <SiteShell>
      <section className="section mobile-section grid gap-7 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
        <div className="animate-in">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-jade-700">Book Appointment</p>
          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Reserve your ZenAura slot.</h1>
          <p className="mt-5 leading-8 text-ink/66">
            Appointments run at 11 AM, 12 PM, 1 PM, and 2 PM. Booked slots disappear automatically.
          </p>
          <div className="mt-6 rounded-[8px] border border-[#d5ba76]/25 bg-white/68 p-4 text-sm leading-7 text-ink/62">
            Calendar sync is ready when Google credentials are added.
          </div>
        </div>
        <BookingWidget />
      </section>
    </SiteShell>
  );
}
