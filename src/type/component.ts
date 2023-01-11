export interface Component {
    name: string,
    componentName: string,
    value: any,
    isActive: boolean
}

export interface DraggableGroupOption {
    name: string,
    pull: boolean | string,
    put: boolean,
}
