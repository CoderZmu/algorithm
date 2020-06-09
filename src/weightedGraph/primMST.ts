import { WeightedGraph } from './interface'
import { IndexMinHeap } from '../heap/indexMinHeap'
import Edge from './edge'

// 最小生成树 O(ELog(V))
export default class PrimMST<Weight> {
  private ipg = new IndexMinHeap<Edge<Weight>>() // 维护着每个点的最短横切边
  private marked: boolean[]
  private edgeTo: Edge<Weight>[] = []
  private mst: Edge<Weight>[] = []
  private mstWeight: number // 最小权值

  constructor(private G: WeightedGraph<Weight>) {
    this.marked = new Array(this.G.V()).fill(false)
    this.visit(0)

    while (!this.ipg.isEmpty()) {
      let v = this.ipg.extratMinIndex() // 最短横切边
      let edge = this.edgeTo[v]
      this.mst.push(edge)
      this.visit(v)
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
      let w = edge.other(v)
      if (!this.marked[w]) {
        if (!this.edgeTo[w]) {
          this.edgeTo[w] = edge
          this.ipg.insert(w, edge)
        } else if (edge.wt() < this.edgeTo[w].wt()) {
          this.edgeTo[w] = edge
          this.ipg.changeItem(w, edge)
        }
      }
    }
  }
}