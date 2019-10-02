const utils = require('../../../utils/index');
const filename = require('../../filename.json');
const sql = filename.sql;

module.exports = [
    utils.genSidebar('数据库', sql, false)
]