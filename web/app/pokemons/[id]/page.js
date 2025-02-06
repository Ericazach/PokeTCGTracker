"use client";

import { useState, useEffect } from "react";
import Pokemon from "@/app/components/pokemons/Pokemon";
import Item from "@/app/components/shared/Item";
import { useParams } from "next/navigation";

const Details = () => {
  const [pokemon, setPokemon] = useState(null);
  const params = useParams(); // Obtén los parámetros de la URL de forma correcta
  const { id } = params;

  useEffect(() => {
    // Función para obtener detalles de un Pokémon por ID
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://api.pokemontcg.io/v2/cards/${id}`,
          {
            headers: {
              "X-Api-Key": "YOUR_API_KEY_HERE", // Reemplaza con tu API Key
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los detalles del Pokémon");
        }

        const data = await response.json();
        setPokemon(data.data); // La respuesta está dentro de `data.data`
        console.log(data.data.cardmarket);
      } catch (error) {
        console.error("Error al obtener el Pokémon:", error);
      }
    };

    if (id) {
      fetchPokemon();
    }
  }, [id]);

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-screen flex bg-gradient-to-r from-verdigris-600 to-light_sea_green-500">
      {/* Contenido desplazable */}
      <div className="flex justify-center items-start gap-10">
        <div className="flex">
          <Pokemon {...pokemon} ancho={"w-[550px]"} />
        </div>
        <div className="flex flex-col mt-20 gap-4">
          <h1 className="uppercase text-4xl font-black text-gray-800 font-serif">
            {pokemon.name}?
          </h1>
          <div className="grid grid-cols-2 gap-4 grid-flow-row">
            <Item name="Type" icon={`/assets/images/${pokemon.types?.[0]}.png`} />
            {pokemon.weaknesses?.length > 0 && (
              <Item name="Weakness" icon={`/assets/images/${pokemon.weaknesses[0].type}.png`} />
            )}
            <Item name="HP" info={pokemon.hp} />
            <Item name="Set" info={pokemon.set?.name} />
            <Item name="Rarity" info={pokemon.rarity} />
            <Item name="Stage" info={pokemon.stage} />
            <Item name="Attacks" info={pokemon.attacks?.map(atk => atk.name).join(", ")} styles={"col-span-2"} />
            <p>Check the prices in <b><a href={pokemon.cardmarket.url}>here</a></b></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;