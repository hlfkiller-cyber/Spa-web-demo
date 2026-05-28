"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Flower2, Images, LayoutDashboard, Menu, MessageCircle, Sparkles, X } from "lucide-react";

const nav = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/services", label: "Services", icon: Flower2 },
  { href: "/gallery", label: "Gallery", icon: Images },
  { href: "/book", label: "Book Appointment", icon: CalendarDays },
  { href: "/admin", label: "Admin Calendar", icon: LayoutDashboard }
];

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const whatsappText = "Hi ZenAura Spa Rajajinagar, I want to book an appointment.";
  const whatsappHref = useMemo(() => {
    const encodedText = encodeURIComponent(whatsappText);
    return isMobileDevice
      ? `whatsapp://send?phone=${whatsappNumber}&text=${encodedText}`
      : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedText}`;
  }, [isMobileDevice, whatsappNumber]);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const syncDevice = () => {
      setIsMobileDevice(mobileQuery.matches || /Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent));
    };

    syncDevice();
    mobileQuery.addEventListener("change", syncDevice);
    return () => mobileQuery.removeEventListener("change", syncDevice);
  }, []);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[#d5ba76]/25 bg-[#fffaf1]/88 backdrop-blur-xl">
        <nav className="section flex min-h-[74px] items-center justify-between gap-4 lg:min-h-20">
          <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-jade-700 text-champagne shadow-glow">
              <Sparkles size={20} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-lg font-semibold text-ink sm:text-xl">ZenAura Spa</span>
              <span className="block text-[11px] uppercase tracking-[0.18em] text-jade-700">Rajajinagar</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`focus-ring soft-hover flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                    active ? "bg-jade-700 text-white shadow-glow" : "text-ink/72 hover:bg-jade-50 hover:text-jade-700"
                  }`}
                >
                  <Icon size={16} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="focus-ring soft-hover hidden min-h-11 items-center gap-2 rounded-full bg-jade-700 px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-jade-950 sm:inline-flex"
          >
            <MessageCircle size={18} aria-hidden="true" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className="focus-ring grid h-12 w-12 place-items-center rounded-full border border-[#d5ba76]/30 bg-white/78 text-ink shadow-sm transition hover:border-jade-700 hover:text-jade-700 lg:hidden"
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </nav>
        {menuOpen && (
          <div className="section animate-in pb-4 lg:hidden">
            <div className="luxury-border rounded-[8px] bg-[#fffaf1]/95 p-2 shadow-glow">
              {nav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`focus-ring flex min-h-12 items-center gap-3 rounded-[8px] px-3 text-sm font-semibold transition ${
                      active ? "bg-jade-700 text-white" : "text-ink/72 hover:bg-white hover:text-jade-700"
                    }`}
                  >
                    <Icon size={17} aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              })}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="focus-ring mt-2 flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-jade-700 px-4 text-sm font-semibold text-white"
              >
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="section py-10 text-sm text-ink/60">
        <div className="flex flex-col justify-between gap-2 border-t border-[#d5ba76]/25 pt-6 md:flex-row">
          <p>ZenAura Spa Rajajinagar</p>
          <p>Daily appointments from 11 AM to 2 PM</p>
        </div>
      </footer>
    </div>
  );
}
