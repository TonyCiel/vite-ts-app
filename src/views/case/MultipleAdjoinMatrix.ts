import { SkuPropertyGood, SkuProp } from "@/type/sku";
export type AdjoinType = Array<string>;
// 邻接矩阵
class AdjoinMatrix {
  vertex: AdjoinType; // 顶点数据
  quantity: number;
  adjoinArray: Array<number>; // 邻接矩阵数组
  constructor(types: AdjoinType) {
    this.vertex = types;
    this.quantity = types.length;
    this.adjoinArray = [];
    this.initAdjoinMatrix();
  }
  // 初始化生成一个内容都为空的邻接矩阵
  initAdjoinMatrix() {
    this.adjoinArray = Array(this.quantity * this.quantity).fill(0);
  }
  /**
   * 
   * @param id 
   * @param sides 
   * 传入一个顶点，和当前顶点可达的顶点数组，将对应位置置为1
   */
  setAdjoinVertexs(id: string, sides: AdjoinType) {
    const pIndex = this.vertex.indexOf(id);
    sides.forEach((item) => {
      const index = this.vertex.indexOf(item);
      this.adjoinArray[pIndex * this.quantity + index] = 1;
    });
  }
  /**
   * 
   * @param id 
   * @returns 
   * 传入顶点的值，获取该顶点的列
   */
  getVertexCol(id: string) {
    const index = this.vertex.indexOf(id);
    const col: Array<number> = [];
    this.vertex.forEach((item, pIndex) => {
      col.push(this.adjoinArray[index + this.quantity * pIndex]);
    });
    return col;
  }
  /**
   * 
   * @param params 
   * @returns 
   * 传入一个顶点数组，求出该数组所有顶点的列的合
   */
  getColSum(params: AdjoinType) {
    const paramsVertex = params.map((id) => this.getVertexCol(id));
    const paramsVertexSum: Array<number> = [];
    this.vertex.forEach((item, index) => {
      const rowtotal = paramsVertex
        .map((value) => value[index])
        .reduce((total, current) => {
          total += current || 0;
          return total;
        }, 0);
      paramsVertexSum.push(rowtotal);
    });
    return paramsVertexSum;
  }
  /**
   * 
   * @param params 
   * @returns 
   * 传入一个顶点数组，求出并集
   */
  getCollection(params: AdjoinType) {
    const paramsColSum = this.getColSum(params);
    let collections: AdjoinType = [];
    paramsColSum.forEach((item, index) => {
      if (item && this.vertex[index]) collections.push(this.vertex[index]);
    });
    return collections;
  }
  /**
   * 
   * @param params 
   * @returns 
   * 传入一个顶点数组，求出交集
   */
  getUnions(params: AdjoinType) {
    const paramsColSum = this.getColSum(params);
    let unions: AdjoinType = [];
    paramsColSum.forEach((item, index) => {
      if (item >= params.length && this.vertex[index])
        unions.push(this.vertex[index]);
    });
    return unions;
  }
}
/**
 * 多规格邻接矩阵
 */
export default class MultipleAdjoinMatrix extends AdjoinMatrix {
  specList: SkuProp[]; // 规格列表
  specCombinationList: SkuPropertyGood[];
  constructor(
    specList: Array<SkuProp>,
    specCombinationList: Array<SkuPropertyGood>
  ) {
    super(
      specList.reduce(
        (total: AdjoinType, current) => [...total, ...current.typeNames],
        []
      )
    );
    this.specList = specList;
    this.specCombinationList = specCombinationList;
    this.initSpec();
    this.initSameLevel();
  }
  /**
   * 根据可选规格组合填写邻接矩阵的值
   */
  initSpec() {
    this.specCombinationList.forEach((item) => {
      this.fillInSpec(item.list);
    });
  }
  // 填写同级点
  initSameLevel() {
    const specsOption = this.getCollection(this.vertex);
    this.specList.forEach((item) => {
      const params: AdjoinType = [];
      item.typeNames.forEach((value) => {
        if (specsOption.includes(value)) params.push(value);
      });

      this.fillInSpec(params);
    });
  }
  /**
   * 
   * @param params 
   * @returns 
   * 传入顶点数组，查询出可选规格
   */
  getSpecscOptions(params: AdjoinType) {
    let specOptionCanchoose: AdjoinType = [];
    console.log('params.some(Boolean)',params.some(Boolean))
    if (params.some(Boolean)) {
      specOptionCanchoose = this.getUnions(params.filter(Boolean));
    } else {
      specOptionCanchoose = this.getCollection(this.vertex);
    }
    return specOptionCanchoose;
  }
  fillInSpec(params: AdjoinType) {
    params.forEach((param) => {
      this.setAdjoinVertexs(param, params);
    });
  }
}
