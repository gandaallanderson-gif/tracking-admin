export default async function handler(req,res){

  const r = await fetch(
    "https://xaeyujupphagmklxtnsf.supabase.co/rest/v1/clicks?select=created_at",
    {
      headers:{
        "apikey":"ANON_KEY",
        "Authorization":"Bearer ANON_KEY"
      }
    }
  );

  const data = await r.json();

  const map={};

  data.forEach(d=>{
    const date=new Date(d.created_at).toISOString().split("T")[0];
    map[date]=(map[date]||0)+1;
  });

  const result = Object.entries(map)
    .map(d=>({date:d[0],count:d[1]}))
    .sort((a,b)=>new Date(a.date)-new Date(b.date));

  res.status(200).json(result);
}
