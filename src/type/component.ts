export interface Component {
    name: string,
    componentName: string,
    value: any,
    isActive: boolean,
    vid: string
}

export interface DraggableGroupOption {
    name: string,
    pull: boolean | string,
    put: boolean,
}
