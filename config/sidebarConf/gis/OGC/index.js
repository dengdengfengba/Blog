const utils = require('../../../../utils/index');
const filename = require('../../../filename.json');
const OGC = filename.gis.OGC;

module.exports = [
    utils.genSidebar('OGC', OGC, false)
]