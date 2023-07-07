const { Router } = require('express');
const pokemonRouter = Router();
const { allPokemonsHandler, pokemonHandler, createNewPokemon} = require('../handlers/pokemonHandler');

pokemonRouter.get('/', allPokemonsHandler);
pokemonRouter.get('/:id', pokemonHandler);
pokemonRouter.post('/', createNewPokemon);

module.exports = pokemonRouter;