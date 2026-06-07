const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY nie je nastavený");
    }

    const { booking, service, cancelUrl } = await req.json();

    if (!booking || !service || !cancelUrl) {
      throw new Error("Chýbajú dáta: booking, service alebo cancelUrl");
    }

    const adminEmail = "leo.fudaly@gmail.com";

    const clientHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; padding: 24px;">
        <h1 style="color:#111827;">Rezervácia potvrdená</h1>

        <p>Dobrý deň <strong>${booking.client_name}</strong>,</p>
        <p>Vaša rezervácia bola úspešne vytvorená.</p>

        <div style="background:#f3f4f6; padding:18px; border-radius:14px; margin:22px 0;">
          <p><strong>Služba:</strong> ${service.name}</p>
          <p><strong>Dátum:</strong> ${booking.booking_date}</p>
          <p><strong>Čas:</strong> ${String(booking.booking_time).slice(0, 5)} - ${String(booking.end_time).slice(0, 5)}</p>
          <p><strong>Telefón:</strong> ${booking.client_phone}</p>
        </div>

        <p>Ak potrebuješ rezerváciu zrušiť, klikni na tlačidlo nižšie.</p>

        <a href="${cancelUrl}" style="display:inline-block; background:#ef4444; color:white; padding:13px 20px; border-radius:999px; text-decoration:none; font-weight:bold;">
          Zrušiť rezerváciu
        </a>
      </div>
    `;

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; padding: 24px;">
        <h1 style="color:#111827;">Nová rezervácia</h1>

        <div style="background:#f3f4f6; padding:18px; border-radius:14px; margin:22px 0;">
          <p><strong>Meno:</strong> ${booking.client_name}</p>
          <p><strong>Email:</strong> ${booking.client_email}</p>
          <p><strong>Telefón:</strong> ${booking.client_phone}</p>
          <p><strong>Služba:</strong> ${service.name}</p>
          <p><strong>Dátum:</strong> ${booking.booking_date}</p>
          <p><strong>Čas:</strong> ${String(booking.booking_time).slice(0, 5)} - ${String(booking.end_time).slice(0, 5)}</p>
          <p><strong>Správa:</strong> ${booking.message || "Bez správy"}</p>
        </div>

        <a href="${cancelUrl}" style="display:inline-block; background:#ef4444; color:white; padding:13px 20px; border-radius:999px; text-decoration:none; font-weight:bold;">
          Zrušiť rezerváciu
        </a>
      </div>
    `;

    const clientResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Booking System <onboarding@resend.dev>",
        to: booking.client_email,
        subject: "Potvrdenie rezervácie",
        html: clientHtml,
      }),
    });

    const clientResult = await clientResponse.json();

    const adminResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Booking System <onboarding@resend.dev>",
        to: adminEmail,
        subject: "Nová rezervácia",
        html: adminHtml,
      }),
    });

    const adminResult = await adminResponse.json();

    if (!clientResponse.ok || !adminResponse.ok) {
      return new Response(
        JSON.stringify({
          ok: false,
          clientResult,
          adminResult,
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        clientResult,
        adminResult,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: String(error),
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});