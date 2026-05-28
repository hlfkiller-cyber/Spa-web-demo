import AdminCalendar from "@/components/AdminCalendar";
import SiteShell from "@/components/SiteShell";

export default function AdminPage() {
  return (
    <SiteShell>
      <section className="section mobile-section py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-jade-700">Admin</p>
        <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Appointment calendar</h1>
        <p className="mt-4 max-w-2xl leading-8 text-ink/66">
          Review bookings, open slots, and demo data.
        </p>
        <div className="mt-8">
          <AdminCalendar />
        </div>
      </section>
    </SiteShell>
  );
}
