export async function onRequestPost(context) {
  const formData = await context.request.formData();
  const email = formData.get("email");

  if (!email) {
    return Response.redirect("/?signup=missing-email#signup", 302);
  }

  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${context.env.MAILERLITE_API_TOKEN}`
    },
    body: JSON.stringify({
      email: email
    })
  });

  if (!response.ok) {
    return Response.redirect("/?signup=error#signup", 302);
  }

  return Response.redirect("/?signup=success#signup", 302);
}