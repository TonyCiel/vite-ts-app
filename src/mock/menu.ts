import Mock from 'mockjs';
const menus = [
    {
        name: '系统管理',
        path: '/system',
        id: '00',
        icon: 'el-icon-setting',
        children: [{
            name: '用户管理',
            path: '/system/user',
            id: '001',
            icon: 'el-icon-user',
            parentId: "00",
        },
        {
            name: '菜单管理',
            path: '/system/menu',
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
    {
        name: '测试菜单',
        path: '/menu',
        id: '02',
        icon: 'el-icon-c-scale-to-original',
        children: [{
            name: '测试菜单1',
            path: '/menu/menu1',
            id: '021',
            icon: 'el-icon-monitor',
            parentId: "02",
            children: [{
                name: '三级菜单1',
                path: '/menu/menu1/index',
                id: '0211',
                icon: 'el-icon-monitor',
                parentId: "021",
            },
            {
                name: '三级菜单2',
                path: '/menu/menu1/menu1Child',
                id: '0211',
                icon: 'el-icon-monitor',
                parentId: "021",
            }]
        },
        {
            name: '测试菜单2',
            path: '/menu/menu2',
            id: '022',
            icon: 'el-icon-tickets',
            parentId: "02",
        }]

    },
]
Mock.mock('/mock/getMenus',
    'get',
    {
        data: menus
    }
)