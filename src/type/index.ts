export interface MenuItem {
    name: string,
    path: string,
    parentName?: string,
    fullPath?:string, 
    id: string | number,
    children?: Array<MenuItem>,
    redirect?: MenuItem,
    icon?: string,
    parentId?: string
    component? : any,
    meta: {
        title?: string
    },

}