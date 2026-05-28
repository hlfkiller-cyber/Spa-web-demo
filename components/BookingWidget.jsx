"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { availableDates, services, timeSlots } from "@/lib/data";
import { loadAppointments, saveAppointment } from "@/lib/storage";

const blankForm = {
  name: "",
  phone: "",
  service: services[0].name
};

export default function BookingWidget() {
  const dates = useMemo(() => availableDates(), []);
  const [appointments, setAppointments] = useState(() => loadAppointments());
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState("");
  const [form, setForm] = useState(blankForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const bookedTimes = appointments
    .filter((appointment) => appointment.date === selectedDate)
    .map((appointment) => appointment.time);

  const availableTimes = timeSlots.filter((slot) => !bookedTimes.includes(slot));

  async function submitBooking(event) {
    event.preventDefault();
    if (!selectedDate || !selectedTime) {
      setMessage("Choose an available date and time.");
      return;
    }

    const appointment = {
      id: crypto.randomUUID(),
      ...form,
      date: selectedDate,
      time: selectedTime,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
      calendarStatus: "pending"
    };

    setSubmitting(true);
    setMessage("");

    let calendarStatus = "not_configured";
    try {
      const response = await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment)
      });
      const result = await response.json();
      calendarStatus = result.calendarStatus || (response.ok ? "created" : "failed");
    } catch {
      calendarStatus = "failed";
    }

    const saved = { ...appointment, calendarStatus };
    setAppointments(saveAppointment(saved));
    setSelectedTime("");
    setForm(blankForm);
    setSubmitting(false);
    setMessage(
      calendarStatus === "created"
        ? "Booked and added to Google Calendar."
        : "Booked locally. Add Google credentials to enable automatic Calendar sync."
    );
  }

  return (
    <form onSubmit={submitBooking} className="glass luxury-border animate-in rounded-[8px] p-4 shadow-glow sm:p-5 md:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-jade-700 text-white">
          <CalendarCheck size={20} aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Reserve a Slot</h2>
          <p className="text-sm text-ink/58">Choose a date, time, and service.</p>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <label className="mb-2 block text-sm font-semibold text-ink">Available dates</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {dates.map((date) => (
              <button
                type="button"
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime("");
                }}
                className={`focus-ring soft-hover min-h-[58px] rounded-[8px] border px-3 py-3 text-left text-sm ${
                  selectedDate === date
                    ? "border-jade-700 bg-jade-700 text-white shadow-sm"
                    : "border-[#d5ba76]/25 bg-white/78 text-ink hover:border-jade-500"
                }`}
              >
                <span className="block font-semibold">{new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", { weekday: "short" })}</span>
                <span>{new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <label className="mb-2 block text-sm font-semibold text-ink">Available times</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {timeSlots.map((time) => {
              const booked = bookedTimes.includes(time);
              return (
                <button
                  type="button"
                  key={time}
                  disabled={booked}
                  onClick={() => setSelectedTime(time)}
                  className={`focus-ring soft-hover flex min-h-[54px] items-center justify-center gap-2 rounded-[8px] border px-3 text-sm font-semibold disabled:cursor-not-allowed disabled:border-stone-200 disabled:bg-stone-100 disabled:text-stone-400 ${
                    selectedTime === time
                      ? "border-rosewood bg-rosewood text-white shadow-sm"
                      : "border-[#d5ba76]/25 bg-white/78 text-ink hover:border-rosewood"
                  }`}
                >
                  <Clock size={16} aria-hidden="true" />
                  {booked ? "Booked" : time}
                </button>
              );
            })}
          </div>
          {availableTimes.length === 0 && <p className="mt-2 text-sm text-rosewood">All slots are booked for this date.</p>}
        </section>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-ink">Name</span>
            <input
              required
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="focus-ring min-h-[52px] w-full rounded-[8px] border border-[#d5ba76]/25 bg-white px-3 py-3 text-base text-ink shadow-sm sm:text-sm"
              placeholder="Customer name"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-ink">Phone</span>
            <input
              required
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              className="focus-ring min-h-[52px] w-full rounded-[8px] border border-[#d5ba76]/25 bg-white px-3 py-3 text-base text-ink shadow-sm sm:text-sm"
              placeholder="10-digit mobile"
            />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-1 block text-sm font-semibold text-ink">Service</span>
            <select
              value={form.service}
              onChange={(event) => setForm({ ...form, service: event.target.value })}
              className="focus-ring min-h-[52px] w-full rounded-[8px] border border-[#d5ba76]/25 bg-white px-3 py-3 text-base text-ink shadow-sm sm:text-sm"
            >
              {services.map((service) => (
                <option key={service.name}>{service.name}</option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting || !selectedTime}
          className="focus-ring soft-hover inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-[8px] bg-ink px-5 text-base font-semibold text-white hover:bg-jade-700 disabled:cursor-not-allowed disabled:bg-stone-300 sm:text-sm"
        >
          {submitting ? <Loader2 className="animate-spin" size={18} aria-hidden="true" /> : <CheckCircle2 size={18} aria-hidden="true" />}
          Confirm Booking
        </button>

        {message && <p className="rounded-[8px] bg-jade-50 px-4 py-3 text-sm font-medium text-jade-700">{message}</p>}
      </div>
    </form>
  );
}
