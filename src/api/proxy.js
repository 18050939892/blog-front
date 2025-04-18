// /api/proxy.js
export default async function handler(req, res) {
  const url = `https://blog-api-production-a05d.up.railway.app${req.url.replace('/api/proxy', '')}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // 转发授权头
        ...req.headers.authorization && { 'Authorization': req.headers.authorization }
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined
    });

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
