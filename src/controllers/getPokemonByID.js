const { Pokemon, Type } = require('../db');
const { URL_API_POKEMON_ID_OR_NAME } = require('../utils/endpoints');
const axios = require('axios');

const getById = async (id) => {
    try {
        if (id <= 1008) {
            const response = await axios(URL_API_POKEMON_ID_OR_NAME + id);
            const data = response.data;
            const pokemonFound = {
                id: data.id,
                    name: data.name,
                    image: data.sprites.other["official-artwork"].front_default,
                    hp: data.stats[0].base_stat,
                    attack: data.stats[1].base_stat,
                    defense: data.stats[2].base_stat,
                    speed: data.stats[5].base_stat,
                    height: data.height,
                    weight: data.weight,
                    types: data.types.map((element) => element.type.name)
            };
            return pokemonFound;
        } else {
            const pokemon = await Pokemon.findByPk(id, {
                include: [
                    {
                        model: Type,
                        attributes: ["name"],
                        through: { attributes: [] },
                    },
                ],
            });
            if (!pokemon) throw new Error("No existe ningún Pokémon con este ID");
            const foundPokemon = {
                ...pokemon.toJSON(),
                types: pokemon.types.map((type) => type.name),
            };
            return foundPokemon;
        }
    } catch (error) {
        return error.message;
    }
};

module.exports = getById;