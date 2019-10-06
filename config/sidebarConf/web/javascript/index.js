const utils = require('../../../../utils/index');
const filename = require('../../../filename.json')
const children = filename.web.javascript;

module.exports = [
    utils.genSidebar('javascript', children, false, 1)
]