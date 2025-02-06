"use client";

// import pokemonService from '../../../services/pokemons/pokemons'
import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";

const PokemonList = () => {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCards, setFilteredCards] = useState([]);

  const API_URL = "https://api.pokemontcg.io/v2/cards";
  const API_KEY = process.env.NEXT_PUBLIC_POKEMON_API_KEY; // Reemplaza con tu API Key

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          `${API_URL}?q=set.id:sv3pt5&orderBy=number`,
          {
            headers: {
              "X-Api-Key": API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }

        const data = await response.json();
        setCards(data.data);
        setFilteredCards(data.data); // Set initial filtered cards
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    const results = cards.filter((card) =>
      card.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCards(results);
  }, [searchQuery, cards]);

  if (!cards) {
    return;
  }
  return (
    <div className="flex justify-center flex-wrap gap-2 bg-gradient-to-r from-verdigris-400 to-light_sea_green-500">
      <div className="m-6 w-1/2">
        <form className="">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="default-search"
              className="block w-full p-4 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for a Pokémon"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
          </div>
        </form>
      </div>
      <div className="flex h-full w-screen flex-wrap gap-2 justify-center items-center bg-gradient-to-r from-verdigris-400 to-light_sea_green-500">
        {filteredCards?.map((card) => {
          return <Pokemon key={card.id} {...card} ancho={"w-[270px]"} />;
        })}
      </div>
    </div>
  );
};

export default PokemonList;
