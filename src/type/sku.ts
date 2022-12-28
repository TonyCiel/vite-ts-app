export interface SkuGood {
  skuPropertieNames: string;
  cash: string | number;
  stocks: number | null;
  skuId: string;
  disabled: boolean;
}

export interface SkuType {
    name: string,
    isOutOfStock: boolean | number, // 是否缺货
    propertyTypeName: string
}

export interface SkuProp {
  types: Array<SkuType>;
  active: string;
  typeNames : Array<string>;
  propertyTypeName: string,
}
export interface SkuProperties {
  [key: string] : SkuProp;
}

export interface SkuPropertyGood {
  id: string,
  list: Array<string>
}
