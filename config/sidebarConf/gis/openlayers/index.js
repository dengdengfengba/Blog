const utils = require('../../../../utils/index');
const filename = require('../../../filename.json');
const openlayers = filename.gis.openlayers;

module.exports = [
    utils.genSidebar('openlayers', openlayers, false)
]