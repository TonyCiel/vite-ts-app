import request from '../../utils/axios';

export const login = (data) => request({
  url: `/api/loginUser`,
  method: 'post',
  data: {
    ...data
  }
});

// 获取用户所有列表
export const getUserList = () => request({
  url: `/api/userList`,
  method: 'get',
});

// 保存用户
export const saveUser = (params)  => request({
  url: `/api/createUser`,
  method: 'post',
  data: {
    ...params
  }
});

// 保存角色
export const saveRole = (params)  => request({
  url: `/api/updateRole`,
  method: 'post',
  data: {
    ...params
  }
});

// 获取角色列表
export const getRoleList = (params)  => request({
  url: `/api/roleList`,
  method: 'post',
  data: {
    ...params
  }
});

// 删除角色
export const deleteRole = (params)  => request({
  url: `/api/deleteRole`,
  method: 'post',
  data: {
    ...params
  }
});

// 删除用户
export const deleteUser = (params)  => request({
  url: `/api/deleteUser`,
  method: 'post',
  data: {
    ...params
  }
});