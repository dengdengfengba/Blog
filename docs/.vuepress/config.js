const navConf = require('../../config/navConf');
const pluginConf = require('../../config/pluginConf');
const sidebarConf = require('../../config/sidebarConf/index');

module.exports = {
    title: '等等风吧',
    description: '等等风的个人博客',
    locales: {
      '/': {
        lang: 'zh-CN'
      }
    },
    head: [
      ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png'}],
      ['link', { rel: 'icon', href: '/favicon-32x32.png'}],
      ['link', { rel: 'manifest', href: '/manifest.json'}],
      ['meta', { name: 'theme-color', content: '#ffffff'}]
    ],
    plugins: pluginConf,
    base: '/Blog/',
    themeConfig: {
      lastUpdated: '上次更新',
      repo: 'dengdengfengba/Blog',
      editLinks: true,
      editLinkText: '编辑该文档',
      docsDir: 'docs',
      nav: navConf,
      sidebar: sidebarConf,
    }
}