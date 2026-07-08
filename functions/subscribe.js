export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();
    const email = formData.get("email");

    if (!email) {
      return Response.json({ ok: false, message: "Missing email." }, { status: 400 });
    }

    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${context.env.MAILERLITE_API_TOKEN}`
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok && response.status !== 409 && response.status !== 422) {
      return Response.json({ ok: false, message: "MailerLite error." }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ ok: false, message: "Server error." }, { status: 500 });
  }
}