const { Pokemon, Type } = require('../db');

const newPokemon = async ({
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    types
}) => {
    try {
        if (!name || !hp || !attack || !defense || !image || !types)
            throw new Error("Falta informacion");
        const pokemon = await Pokemon.create({
            name,
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
        });
        console.log(types);
        const type = await Type.findAll({
            where: { name: types },
        });
        console.log(type);
        await pokemon.addTypes(type);
        return pokemon;
    } catch (error) {
        return error.message;
    }
};

module.exports = newPokemon;