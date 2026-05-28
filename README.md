# ZenAura Spa Rajajinagar

Luxury spa appointment SaaS demo built with Next.js, Tailwind CSS, localStorage booking state, and optional Google Calendar event creation.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Google Calendar setup

Create a Google Cloud service account with Calendar API access, share the target calendar with the service account email, then copy `.env.example` to `.env.local` and fill:

- `GOOGLE_CALENDAR_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

When credentials are missing, bookings still save locally and the API returns `calendarStatus: "not_configured"` for demo readiness.

## Deploy

This app is ready for Vercel or any Next.js host. Add the same environment variables in the hosting dashboard to enable calendar event creation in production.
