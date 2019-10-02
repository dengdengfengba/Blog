const utils = require('../../../../utils/index');
const filename = require('../../../filename.json');
const openlayer = filename.gis.openlayer;

module.exports = [
    utils.genSidebar('openlayer', openlayer, false)
]