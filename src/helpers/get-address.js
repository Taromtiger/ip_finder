export async function getAddress(ip = '8.8.8.8') {
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_PuGHbT170wspYWdXlWEbroeAU3gGt&ipAddress=${ip}`
  );
  return await response.json();
}
