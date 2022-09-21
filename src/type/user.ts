type stringNum = string | number;
export interface User {
  userName?: string,
  password?: string,
  account?: string,
  roleids?: string,
  id?: stringNum,
  userAccount?: string,
  roleIds?: string,
}

export interface Role {
  roleName ?: string,
  id ?: stringNum
  roleMenus? : string
}
