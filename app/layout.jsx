import "./globals.css";

export const metadata = {
  title: "ZenAura Spa Rajajinagar",
  description: "Luxury spa appointment SaaS demo for bookings, services, gallery, admin calendar, and Google Calendar sync."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
