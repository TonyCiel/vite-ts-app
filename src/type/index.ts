export interface MenuItem {
    name: string,
    path: string,
    parentName?: string,
    fullPath?:string, 
    id?: string | number,
    children?: Array<MenuItem>,
    redirect?: MenuItem,
    icon?: string,
    parentId?: string
    component? : any,
    meta?: {
        title?: string
    },

}

// 菜单
export interface menuState {
    menuList?: Array<MenuItem> | Array<any> | String,
    allMenu?: Array<MenuItem>,
    collapse? :Boolean,
}

// 用户信息
export interface UserInfo {
    id: string,
    roleIds: string,
    userAccount: string,
    userName: string
}
export interface UserState {
    userInfo?: UserInfo | Object
}
