const getters = {
    menuList: state => state.menu.menuList,
    allMenu: state => state.menu.allMenu,
    collapse: state => state.menu.collapse,
    tagList: state => state.tags.tagList,
    userInfo: state => state.user.userInfo
}

export default getters;