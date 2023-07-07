const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { URL_API_POKEMON } = require('../utils/endpoints');

let apiPokemon = [];

const getAllApi = async () => {
    if(apiPokemon.length > 0) return apiPokemon
    try {
        let i = 0;
        let URL = URL_API_POKEMON;
        while (i < 30) {
            const { data } = await axios.get(URL);
            let promises = data.results.map(async pokemon => {
                const { data } = await axios.get(pokemon.url);
                return data;
            });
            let resultPromises = (await Promise.all(
                promises
            ));

            for (let i = 0; i < resultPromises.length; i++) {
                const pokemon = resultPromises[i]
                const info = {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other["official-artwork"].front_default,
                    hp: pokemon.stats[0].base_stat,
                    attack: pokemon.stats[1].base_stat,
                    defense: pokemon.stats[2].base_stat,
                    speed: pokemon.stats[5].base_stat,
                    height: pokemon.height,
                    weight: pokemon.weight,
                    types: pokemon.types.map((element) => element.type.name)
                };
                apiPokemon.push(info);
            };
            URL = data.next;
            i++;
        };
        return apiPokemon

    } catch (error) {
        return error.message;
    }
};

const getAllDb = async () => {
    try {
        let dbPokemon = [];
        dbPokemon = await Pokemon.findAll({
            include: [
                {
                    model: Type,
                    attributes: ["name"],
                    through: { attributes: [] },
                    as: "types",
                },
            ],
        });
        if (!dbPokemon.length) {
            return [];
        }

        const foundPokemonkDb = dbPokemon.map((pokemon) => ({
            ...pokemon.toJSON(),
            types: pokemon.types.map((type) => type.name),
        }));
        return foundPokemonkDb;
    } catch (error) {
        return error.message;
    }
};

const getAll = async () => {
    try {
        let pokemonFromDb = await getAllDb();

        if (!pokemonFromDb.length) {
            pokemonFromDb = [];
        }

        const pkFromApi = await getAllApi();

        const allPokemon = pokemonFromDb.concat(pkFromApi);

        if (!allPokemon.length) {
            throw new Error("No se encontraron Pokemons");
        }

        return allPokemon;
    } catch (error) {
        return error.message;
    }
};

module.exports = getAll;