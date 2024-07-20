import "./PokemonItem.css";
import { colours } from "../../data/colours";

function PokemonItem({ pokemon, isOwned, onToggleOwned }) {
    return (
        <div
            className={`pokemon-card ${isOwned ? 'owned' : ''}`}
            style={{
                backgroundColor: `${pokemon.color}`,
            }}
            onClick={() => onToggleOwned(pokemon.id)}
        >
            {isOwned && <div className="owned-label">Dimiliki</div>}
            <img src={pokemon.imageUrl} alt={pokemon.name} width={250} />
            <h1>{pokemon.name}</h1>

            <div className="types-container">
                {pokemon.types.map((item, index) => (
                    <span
                        key={index}
                        className="type-badge"
                        style={{
                            backgroundColor: colours[item.toLowerCase()],
                        }}
                    >
                        {item}
                    </span>
                ))}
            </div>

            <p className="description">{pokemon.description}</p>
        </div>
    );
}

export default PokemonItem;