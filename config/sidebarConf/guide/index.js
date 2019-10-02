const utils = require('../../../utils/index');
const filename = require('../../filename.json');
const guide = filename.guide;

module.exports = [
    utils.genSidebar('关于', guide, false)
]