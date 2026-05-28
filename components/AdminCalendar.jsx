"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, RefreshCw } from "lucide-react";
import { availableDates, timeSlots } from "@/lib/data";
import { loadAppointments, resetDemoAppointments } from "@/lib/storage";

export default function AdminCalendar() {
  const dates = useMemo(() => availableDates(10), []);
  const [appointments, setAppointments] = useState(() => loadAppointments());

  useEffect(() => {
    const sync = () => setAppointments(loadAppointments());
    window.addEventListener("zenaura-appointments-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("zenaura-appointments-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const totalRevenue = appointments.reduce((sum, appointment) => {
    const price = appointment.service.includes("Couple") ? 5999 : appointment.service.includes("Bridal") ? 7499 : appointment.service.includes("Balinese") ? 3299 : appointment.service.includes("Facial") ? 1899 : appointment.service.includes("Foot") ? 1299 : 2499;
    return sum + price;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-3">
        <Metric label="Total appointments" value={appointments.length} />
        <Metric label="Booked slots hidden" value={`${appointments.filter((item) => item.status === "Confirmed").length}`} />
        <Metric label="Demo revenue" value={`Rs. ${totalRevenue.toLocaleString("en-IN")}`} />
      </div>

      <div className="glass luxury-border rounded-[8px] p-4 sm:p-5">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-rosewood text-white">
              <CalendarDays size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold">Admin Calendar</h2>
              <p className="text-sm text-ink/62">Bookings sync from the customer flow.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAppointments(resetDemoAppointments())}
            className="focus-ring soft-hover inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-[#d5ba76]/25 bg-white px-4 text-sm font-semibold text-ink hover:border-jade-600 hover:text-jade-700"
          >
            <RefreshCw size={16} aria-hidden="true" />
            Reset Demo Data
          </button>
        </div>

        <div className="overflow-x-auto rounded-[8px] border border-[#d5ba76]/15 bg-white/45">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[110px_repeat(10,minmax(120px,1fr))] border-b border-[#d5ba76]/20 text-xs font-semibold uppercase tracking-[0.12em] text-ink/52">
              <div className="px-3 py-3">Time</div>
              {dates.map((date) => (
                <div key={date} className="px-3 py-3">
                  <span className="block">{new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", { weekday: "short" })}</span>
                  <span className="font-sans normal-case tracking-normal text-ink">{new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                </div>
              ))}
            </div>
            {timeSlots.map((time) => (
              <div key={time} className="grid min-h-24 grid-cols-[110px_repeat(10,minmax(120px,1fr))] border-b border-[#d5ba76]/10">
                <div className="px-3 py-4 text-sm font-semibold text-ink">{time}</div>
                {dates.map((date) => {
                  const booking = appointments.find((appointment) => appointment.date === date && appointment.time === time);
                  return (
                    <div key={`${date}-${time}`} className="p-2">
                      {booking ? (
                        <div className="h-full rounded-[8px] bg-jade-700 p-3 text-xs text-white shadow-sm">
                          <p className="font-semibold">{booking.name}</p>
                          <p className="mt-1 text-white/80">{booking.service}</p>
                          <p className="mt-2 text-white/70">{booking.phone}</p>
                        </div>
                      ) : (
                        <div className="grid h-full place-items-center rounded-[8px] border border-dashed border-[#d5ba76]/25 text-xs text-ink/38">Open</div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="glass luxury-border soft-hover rounded-[8px] p-4">
      <p className="text-sm font-medium text-ink/58">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-ink">{value}</p>
    </div>
  );
}
