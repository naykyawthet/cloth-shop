const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export const getProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/api/products`);

  if (!response.ok) {
    throw new Error("Unable to load products.");
  }

  const payload = await response.json();
  return payload.data || [];
};

export const subscribe = async (email) => {
  const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Subscription failed.");
  }

  return payload;
};
