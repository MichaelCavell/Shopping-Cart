const API_BASE_URL = 'https://fakestoreapi.com';

const fetchProducts = async (limit = 100) => {
  const url = `${API_BASE_URL}/products?limit=${limit}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export { fetchProducts };
