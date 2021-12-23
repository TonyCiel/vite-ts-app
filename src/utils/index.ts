export const listToTree = (data, pid): any => {
    const arr : Array<any>= []
    data.forEach(val => {
        if(val.parentId == pid) {
            const list = listToTree(data, val.id)
            const obj:any = Object.assign({},val);
            if(list.length !== 0) {
                obj.children = list
            }
            arr.push(obj)
        }
    })
    return arr
}