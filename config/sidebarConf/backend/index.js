const utils = require('../../../utils/index');
const filename = require('../../filename.json');
const backend = filename.backend;

module.exports = [
    utils.genSidebar('后端', backend, false)
]