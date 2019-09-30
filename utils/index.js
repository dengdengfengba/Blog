const utils = {          //自动配置侧边栏]
    genSidebar: function(title, children = [''],collapsable = true,sidebarDepth = 1){
        return {
            title: title,
            collapsable,
            sidebarDepth,
            children
        }
    }
}

module.exports = utils;