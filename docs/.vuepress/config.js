module.exports = {
    title: '个人主页',
    description: '等等风的个人博客',
    locales: {
      '/': {
        lang: 'zh-CN'
      }
    },
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    plugins: {
        '@vuepress/pwa': {
          serviceWorker: true,
          updatePopup: {
            message: "发现新内容可用",
            buttonText: "刷新"
          }
        }
      },
    themeConfig: {
      lastUpdated: '上次更新',
      repo: 'dengdengfengba/Blog',
      editLinks: true,
      editLinkText: '编辑文档',
      nav: [
        { text: '主页', link: '/' },
        { 
          text: '前端', 
          items: [
            { text: 'css', link: '/web/css/'},
            { text: 'javascript', link: '/web/javascript/'}
          ]
        },
        { text: '后端', link: '/backend/' },
        { text: '数据库', link: '/sql/'},
        { text: 'Gis', link: '/gis/'},
        { text: '好文欣赏',link: '/wen/'},
        { text: 'Guide', link: '/guide/'},
      ],
      sidebar: {
        '/web/css/': [
          '',
          'css1',
          'css2'
        ],
        '/web/javascript/': [
          '',
          'javascript1',
          'javascript2'
        ],
        '/backend/': [
          ''
        ],
        '/sql/': [
          ''
        ],
        '/gis/': [
          ''
        ],
        '/wen/': [
          ''
        ],
        '/guide/': [
          ''
        ],

        // fallback
        '/': [
          '',
        ]
      },
      sidebarDepth: 2
    }
}