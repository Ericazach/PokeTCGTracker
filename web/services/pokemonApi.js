import axios from "axios";

const BASE_URL = "https://api.pokemontcg.io/v2";
const API_KEY = process.env.NEXT_PUBLIC_POKEMON_API_KEY;

// Configuración de Axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-Api-Key": API_KEY,
  },
});

// Obtener todas las cartas
export const fetchCards = async () => {
  try {
    const response = await api.get("/cards");
    return response.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};

// Buscar cartas por nombre
export const searchCards = async (name) => {
  try {
    const response = await api.get("/cards", {
      params: {
        q: `name:${name}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching for cards with name "${name}":`, error);
    throw error;
  }
};