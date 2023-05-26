export async function getOrders() {
  // https://jsonplaceholder.typicode.com/users
  const res = await fetch("/api/orders");

  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json()
}
