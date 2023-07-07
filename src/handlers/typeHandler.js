const { allTypes, saveTypeDb } = require ('../controllers/getTypesData');
const { Type } = require('../db');

const allTypesHandler = async (req, res) => {
    try {
        const types = await allTypes();
        await saveTypeDb(types);

        const allType = await Type.findAll();

        if(allType.error) throw new Error(allType.error);

        return res.status(200).json(allType);
    } catch(error){
        return res.status(404).send(error);
    }
};

module.exports = {
    allTypesHandler
}