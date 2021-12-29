import request from 'axios';
import '../../mock/menu.ts';
import '../../mock/data.ts';

export const reqMenuRoute = () => {
    return request({
        url: '/mock/getMenus',
        methods: 'get'
    })
}

export const reqIndexData = () => {
    return request({
        url: '/mock/getIndexData',
        methods: 'get'
    })
}