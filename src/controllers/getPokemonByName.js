const { Pokemon, Type } = require('../db');
const { URL_API_POKEMON_ID_OR_NAME } = require('../utils/endpoints');
const axios = require('axios');

const fromApi = async (name) => {
    try {
        const responseApi = await axios(URL_API_POKEMON_ID_OR_NAME + name);
        const pokemonFound = {
            id: responseApi.data.id,
            name: responseApi.data.name,
            image: responseApi.data.image?.url,
            hp: responseApi.data.stats[0].base_stat,
            attack: responseApi.data.stats[1].base_stat,
            defense: responseApi.data.stats[2].base_stat,
            speed: responseApi.data.stats[5].base_stat,
            height: responseApi.data.height,
            weight: responseApi.data.weight,
            types: responseApi.data.types.map((type) => type.type.name),
        };
        return pokemonFound;
    } catch (error) {
        return `No se encontró ningún Pokemon con el nombre ${name} en la API`;
    }
};

const fromDb = async (name) => {
    try {
        const responseDb = await Pokemon.FindOne({
            where: { name: name },
            include: [Type],
        });
        if (!responseDb)
            throw new Error(`No se encontró ningún Pokemon con el nombre ${name} en la DB`);
        return responseDb;
    } catch (error) {
        return error.message;
    }
};

const getByName = async (name) => {
    try {
        const pkFromApi = await fromApi(name);
        const pkFromDb = await fromDb(name);
        const allPokemon = [pkFromApi, pkFromDb];

        return allPokemon;
    } catch (error) {
        return error.message;
    }
};

module.exports = getByName;