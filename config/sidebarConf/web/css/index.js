const utils = require('../../../../utils/index');
const filename = require('../../../filename.json');
const children = filename.web.css;

module.exports = [
    utils.genSidebar('css 边框', children, false)
]