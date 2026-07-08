export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle form submissions
    if (request.method === "POST" && url.pathname === "/subscribe") {
      try {
        const formData = await request.formData();
        const email = formData.get("email");

        if (!email) {
          return Response.json({ ok: false }, { status: 400 });
        }

        const response = await fetch(
          "https://connect.mailerlite.com/api/subscribers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${env.MAILERLITE_API_TOKEN}`
            },
            body: JSON.stringify({ email })
          }
        );

        if (!response.ok && response.status !== 409 && response.status !== 422) {
          return Response.json({ ok: false }, { status: 500 });
        }

        return Response.json({ ok: true });
      } catch (err) {
        return Response.json({ ok: false }, { status: 500 });
      }
    }

    // Everything else serves your website
    return env.ASSETS.fetch(request);
  }
};