
// 搜索表单输入类型
export enum TableInputTypeEnum {
    SELECT = 'select',
    TEXT = 'text',
    DATETIME = 'datetime',
    DATETIMERANGE = 'datetimerange'
}
export interface ColmnSelectOptions {
    label?: string,
    value?: string | number
}
export interface BasicTableColmn {
    label: string,
    prop : string,
    value?: any,
    slot?: boolean,
    search?: boolean,
    type? : TableInputTypeEnum,
    width? : string | number,
    placeholder?: string,
    dicData?: ColmnSelectOptions[],
    disabled?: boolean,
    valueFormat?: string,
    format?: string
}
export enum TableAlignEnum {
    CENTER = 'center',
    RIGHT = 'right',
    LEFT = 'left'
}
// size
export enum SearchFormSizeEnum {
    LARGE = 'large',
    DEFAULT = 'default',
    SMALL = 'small'
}
export interface BasicTableOption {
    align? : TableAlignEnum,
    border?: boolean,
    selection?: boolean,
    rowKey?: string,
    operationHide?: boolean,
    searchMenuSlot?: boolean,
    searchFormSize?: SearchFormSizeEnum,
    column : Array<BasicTableColmn>
}

export interface BasicTablePageSize {
    pageSize: number,
    total: number,
    currentPage: number,
    pageSizes?: number[],
    layout?: string
    pagerCount?: number
}