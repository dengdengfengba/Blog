// 前端
const css = require('./web/css/index');
const javascript = require('./web/javascript/index');

// 后端
const backend = require('./backend/index');

// 数据库
const sql = require('./sql/index');

// gis
const openlayer = require('./gis/openlayer');

// 大杂烩
const about = require('./about/index');

// 好文欣赏
const wen = require('./wen/index');

// 关于
const guide = require('./guide/index');

module.exports = {

    // 前端
    '/web/css/': css,
    '/web/javascript/': javascript,
    
    // 后端
    '/backend/': backend,

    // 数据库
    '/sql/': sql,

    // gis
    '/gis/openlayer/': openlayer,

    // 大杂烩
    '/about/': about,

    // 好文欣赏
    '/wen/': wen,

    // 关于
    '/guide/': guide

}