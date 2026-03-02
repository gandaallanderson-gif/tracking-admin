export default async function handler(req, res) {
  const response = await fetch(
    "https://xaeyujupphagmklxtnsf.supabase.co/rest/v1/clicks?select=device",
    {
      headers: {
        "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZXl1anVwcGhhZ21rbHh0bnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NTI1MjMsImV4cCI6MjA4ODAyODUyM30.LwXh6RJx2x0i_rAfUnzO-ZTn2VLoVPKunku5A24SYHE",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZXl1anVwcGhhZ21rbHh0bnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0NTI1MjMsImV4cCI6MjA4ODAyODUyM30.LwXh6RJx2x0i_rAfUnzO-ZTn2VLoVPKunku5A24SYHE"
      }
    }
  );

  const data = await response.json();
  const map = {};
  data.forEach(d => {
    const dev = d.device || "Unknown";
    map[dev] = (map[dev] || 0) + 1;
  });

  res.status(200).json(Object.entries(map).map(([device, count]) => ({ device, count })));
}
