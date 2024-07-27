type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type FetchOptions = {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: any;
};

const customFetch = async (url: string, options: FetchOptions = {}) => {
  const { method = "GET", headers = {}, body } = options;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export default customFetch;
