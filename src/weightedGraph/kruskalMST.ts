import { WeightedGraph } from './interface'
import { MinHeap } from '../heap/minHeap'
import UnionFind from '../unionFind/unionFind'
import Edge from './edge'

// O(ELog(E))
export default class KruskalMST<Weight> {
  private mst: Edge<Weight>[] = []
  private mstWeight: number // 最小权值

  constructor(graph: WeightedGraph<Weight>) {
    
    let pq = new MinHeap<Edge<Weight>>()
    for (let i = 0; i < graph.V(); i++) {
      for (const e of graph.makeIterator(i)) {
        let edge = e as Edge<Weight>
        if (edge.v() < edge.w()) {
          pq.insert(edge)
        }
      }
    }

    let uf = new UnionFind(graph.V())
    while (!pq.isEmpty() && this.mst.length < graph.V() - 1) {
      let e = pq.extratMin()
      if (uf.isConnected(e.v(), e.w())) {
        continue
      }
      this.mst.push(e)
      uf.union(e.v(), e.w())
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
}