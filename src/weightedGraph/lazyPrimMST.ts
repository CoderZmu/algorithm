import { WeightedGraph } from './interface'
import { MinHeap } from '../heap/minHeap'
import Edge from './edge'

// 最小生成树 利用切分定理 O(ELog(E))
export default class LazyPrimMST<Weight> {
  private pg = new MinHeap<Edge<Weight>>() // 维护着所有的横切边
  private marked: boolean[]
  private mst: Edge<Weight>[] = []
  private mstWeight: number = 0 // 最小权值

  constructor(private G: WeightedGraph<Weight>) {
    this.marked = new Array(this.G.V()).fill(false)
    this.visit(0)

    while (!this.pg.isEmpty()) {
      let edge = this.pg.extratMin() // 最短横切边
      if (this.marked[edge.w()]) continue
      // if (this.marked[edge.v()] == this.marked[edge.w()]) {
      //   continue
      // }

      this.mst.push(edge)
      // if (!this.marked[edge.v()]) {
      //   this.visit(edge.v())
      // } else {
        this.visit(edge.w())
      // }

    }

    for (let index = 0; index < this.mst.length; index++) {
      const element = this.mst[index];
      this.mstWeight += element.valueOf()
    }
  }

  mstEdges () {
    return this.mst
  }

  result() {
    return this.mstWeight
  }

  private visit(v: number) {
    this.marked[v] = true
    let iterator = this.G.makeIterator(v)
    for (let e of iterator) {
      let edge = e as Edge<Weight>
      if (!this.marked[edge.other(v)]) {
        this.pg.insert(edge)
      }
    }
  }
}