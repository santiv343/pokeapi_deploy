const getAll = require('../controllers/getPokemonsData');
const getById = require('../controllers/getPokemonByID');
const newPokemon = require('../controllers/createNewPokemon');
const getByName = require('../controllers/getPokemonByName');

const allPokemonsHandler = async (req, res) => {
    try {
        const { name } = req.query;
        let pokemonsTotal;

        if (name) pokemonsTotal = await getByName(name);
        else pokemonsTotal = await getAll();

        return res.status(200).json(pokemonsTotal);
    } catch (error) {
        return res.status(404).send(error.message);
    }
};

const pokemonHandler = async (req, res) => {
    try {
        const pokemon = await getById(req.params.id);
        return res.status(200).json(pokemon);
    } catch (error) {
        return res.status(404).send(error.message);
    }
};

const createNewPokemon = async (req, res) => {
    try {
        const result = await newPokemon(req.body);

        if (result.error) {
            return res.status(400).send(result.error);
        }

        const allPokemons = await getAll();

        return res.status(200).json(allPokemons);
    } catch (error) {
        return res.status(404).send(error.message);
    }
};

module.exports = {
    allPokemonsHandler,
    pokemonHandler,
    createNewPokemon
};