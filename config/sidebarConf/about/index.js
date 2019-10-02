const utils = require('../../../utils/index');
const filename = require('../../filename.json');
const about = filename.about;

module.exports = [
    utils.genSidebar('大杂烩', about, false)
]