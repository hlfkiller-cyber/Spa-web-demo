import { google } from "googleapis";

export async function POST(request) {
  const appointment = await request.json();
  const missingConfig =
    !process.env.GOOGLE_CALENDAR_ID ||
    !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY;

  if (missingConfig) {
    return Response.json({
      calendarStatus: "not_configured",
      message: "Booking saved locally. Add Google Calendar credentials to create events automatically."
    });
  }

  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/calendar.events"]
    });

    const calendar = google.calendar({ version: "v3", auth });
    const { start, end } = toCalendarRange(appointment.date, appointment.time);

    const event = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: {
        summary: `ZenAura Spa - ${appointment.service}`,
        description: `Customer: ${appointment.name}\nPhone: ${appointment.phone}\nService: ${appointment.service}`,
        start: {
          dateTime: start,
          timeZone: "Asia/Kolkata"
        },
        end: {
          dateTime: end,
          timeZone: "Asia/Kolkata"
        }
      }
    });

    return Response.json({
      calendarStatus: "created",
      eventId: event.data.id,
      htmlLink: event.data.htmlLink
    });
  } catch (error) {
    return Response.json(
      {
        calendarStatus: "failed",
        message: error.message
      },
      { status: 500 }
    );
  }
}

function toCalendarRange(date, time) {
  const hour = Number.parseInt(time, 10);
  const normalizedHour = time.includes("PM") && hour !== 12 ? hour + 12 : hour;
  const startDate = new Date(`${date}T${String(normalizedHour).padStart(2, "0")}:00:00+05:30`);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

  return {
    start: startDate.toISOString(),
    end: endDate.toISOString()
  };
}
