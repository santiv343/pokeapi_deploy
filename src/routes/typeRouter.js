const { Router } = require('express');
const { allTypesHandler } = require('../handlers/typeHandler');
const typeRouter = Router();

typeRouter.get('/', allTypesHandler);

module.exports = typeRouter