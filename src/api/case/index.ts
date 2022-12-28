import request from 'axios';
import '../../mock/data.ts';


export const getShoppingCartData = () => {
    return request({
        url: '/mock/getShoppingCartData',
        methods: 'get'
    })
}