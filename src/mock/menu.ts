import Mock from 'mockjs';
const menus = [
    {
        name: '系统管理',
        path: '/system/',
        id: '00',
        icon: 'el-icon-setting',
        children: [{
            name: '用户管理',
            path: 'user',
            id: '001',
            icon: 'el-icon-user',
            parentId: "00"
        },
        {
            name: '菜单管理',
            path: 'menu',
            id: '002',
            icon: 'el-icon-tickets',
        }]
    },
    {
        name: '用户模块',
        path: '/user',
        id: '01',
        icon: 'el-icon-star-off',
    },
]
Mock.mock('/mock/getMenus',
    'get',
    {
        data: menus
    }
)