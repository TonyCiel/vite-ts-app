import request from 'axios';
import '../../mock/menu.ts';

export const reqMenuRoute = () => {
    return request({
        url: '/mock/getMenus',
        methods: 'get'
    })
}