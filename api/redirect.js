export default async function handler(req, res) {
  const targetLinks = [
    "https://socialmediabusinessfb.vercel.app"
  ];

  const randomLink = targetLinks[Math.floor(Math.random() * targetLinks.length)];
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
        link: randomLink, // Lưu vào cột link bạn đã có
        country: country, // Lưu vào cột country bạn đã có
        created_at: new Date().toISOString()
      })
    });
  } catch (err) {
    console.error(err);
  }

  res.redirect(302, randomLink);
}
