export interface MenuItem {
    name: string,
    path: string,
    id: string | number,
    children?: Array<MenuItem>,
    redirect?: string,
    icon?: string,
    parentId?: string
    meta: {
        title?: string
    },

}