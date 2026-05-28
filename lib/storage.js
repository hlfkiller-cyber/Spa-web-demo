import { demoAppointments } from "@/lib/data";

const STORAGE_KEY = "zenaura-appointments-v1";

export function loadAppointments() {
  if (typeof window === "undefined") return demoAppointments;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoAppointments));
    return demoAppointments;
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : demoAppointments;
  } catch {
    return demoAppointments;
  }
}

export function saveAppointment(appointment) {
  const appointments = loadAppointments();
  const next = [appointment, ...appointments];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("zenaura-appointments-updated"));
  return next;
}

export function resetDemoAppointments() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoAppointments));
  window.dispatchEvent(new Event("zenaura-appointments-updated"));
  return demoAppointments;
}
