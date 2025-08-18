import fetch from "node-fetch";

export const fetchMarketPrices = async () => {
  const API_KEY = process.env.AGMARKNET_API_KEY;
  const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=10`;

  const res = await fetch(url);
  const data = await res.json();

  return data.records.map(item => ({
    commodity: item.commodity,
    market: item.market,
    price: `${item.min_price} - ${item.max_price} ₹/quintal`,
  }));
};
