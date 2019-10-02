const utils = require('../../../utils/index');
const filename = require('../../filename.json');
const wen = filename.wen;

module.exports = [
    utils.genSidebar('好文欣赏', wen, false)
]