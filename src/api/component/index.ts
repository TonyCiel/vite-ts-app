import request from 'axios';
import '../../mock/data.ts';


export const getTableData = () => {
    return request({
        url: '/mock/getTableData',
        methods: 'get'
    })
}