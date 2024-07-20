import React, { useState, useEffect } from "react";
import pokemonJSON from "../../data/pokemon.json";
import PokemonItem from "../PokemonItem/PokemonItem";
import "./PokemonList.css";

function PokemonList() {
    const [pokemons] = useState(pokemonJSON);
    const [filterPokemons, setFilterPokemons] = useState(pokemonJSON);
    const [ownedPokemons, setOwnedPokemons] = useState(() => {
        const savedOwnedPokemons = localStorage.getItem('ownedPokemons');
        return savedOwnedPokemons ? JSON.parse(savedOwnedPokemons) : [];
    });

    useEffect(() => {
        localStorage.setItem('ownedPokemons', JSON.stringify(ownedPokemons));
    }, [ownedPokemons]);

    const handleSearch = (e) => {
        let search = pokemons.filter((item) => {
            return item.name.toLowerCase().includes(e.target.value.toLowerCase());
        });

        setFilterPokemons(search);
    };

    const handleToggleOwned = (id) => {
        setOwnedPokemons((prevOwnedPokemons) =>
            prevOwnedPokemons.includes(id)
                ? prevOwnedPokemons.filter((ownedId) => ownedId !== id)
                : [...prevOwnedPokemons, id]
        );
    };

    return (
        <div>
            <input
                type="text"
                placeholder="cari pokemon..."
                className="search"
                onChange={handleSearch}
            />

            <div className="info">
                <p>
                    {`Jumlah Pokémon dimiliki: ${ownedPokemons.length} / ${pokemons.length}`}
                </p>
            </div>

            <div className="list-pokemon">
                {filterPokemons.length === 0 ? (
                    <div>data tidak ditemukan</div>
                ) : (
                    filterPokemons.map((item) => (
                        <PokemonItem
                            key={item.id}
                            pokemon={item}
                            isOwned={ownedPokemons.includes(item.id)}
                            onToggleOwned={handleToggleOwned}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default PokemonList;
