export async function getOrder(orderId) {
  // https://jsonplaceholder.typicode.com/users/${orderId}
  const res = await fetch(`/api/orders/${orderId}`);

  try {
    console.log(res);
    return res.json();
  } catch (e) {
    console.log(e);
  }
  // if (!res.ok) throw new Error("Failed to fetch data");
}
