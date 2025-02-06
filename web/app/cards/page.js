"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

const Set151Page = () => {
    const [cards, setCards] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCards, setFilteredCards] = useState([]);

    const API_URL = "https://api.pokemontcg.io/v2/cards";
    const API_KEY = "YOUR_API_KEY_HERE"; // Reemplaza con tu API Key

    // Fetch cards from the set 151
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(`${API_URL}?q=set.id:sv3pt5`, {
                    headers: {
                        "X-Api-Key": API_KEY,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch cards");
                }

                const data = await response.json();
                setCards(data.data);
                setFilteredCards(data.data); // Set initial filtered cards
                console.log(data.data);
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };

        fetchCards();
    }, []);

    // Filter cards by name
    useEffect(() => {
        const results = cards.filter((card) =>
            card.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCards(results);
    }, [searchQuery, cards]);

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center mb-6">Set 151 Cards</h1>

                {/* Search Input */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by name"
                        className="w-full p-3 border rounded-lg shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredCards.map((card) => (
                        <div
                            key={card.id}
                            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                        >
                            <Image
                                src={card.images?.small || "/placeholder.png"}
                                alt={card.name}
                                width={200}
                                height={300}
                                className="mb-4"
                            />
                            <h2 className="text-lg font-semibold text-center">{card.name}</h2>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredCards.length === 0 && (
                    <p className="text-center text-gray-500 mt-6">
                        No cards match your search.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Set151Page;