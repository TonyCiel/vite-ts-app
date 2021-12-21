import request from '../../utils/axios';

export const login = (data) => request({
    url: `/api/loginUser`,
    method: 'post',
    data: {
      ...data
    }
  });