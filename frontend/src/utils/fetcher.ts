export const fetcher = async <T>(input: RequestInfo, init?: RequestInit) => {
  const baseUrl = import.meta.env.API_URL || "http://localhost:3000";
  const url = baseUrl + input;
  const res = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  if (res.status === 204 || res.status === 201) {
    return null;
  }

  return res.json() as unknown as T;
};
