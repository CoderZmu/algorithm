import { WeightedGraph } from './interface'
import { IndexMinHeap } from '../heap/indexMinHeap'
import Edge from './edge'
// 有权（非负权） dijkstra单源最短路径  松弛操作
export default class Dijkstra<Weight> {
  private G: WeightedGraph<Weight>
  private s: number // 源
  private distTo: number[] = [] // 从源点s到每个点的距离
  private marked: boolean[] = [] // 标识已经找到最短路径的顶点
  private from: Edge<Weight>[] = []

  constructor(graph: WeightedGraph<Weight>, s: number) {
    this.G = graph
    this.s = s

    for (let index = 0; index < this.G.V(); index++) {
      this.distTo[index] = 0
      this.marked[index] = false
      this.from[index] = null
    }

    let ipq = new IndexMinHeap<number>()
    ipq.insert(s, 0)
    while (!ipq.isEmpty()) {
      let v = ipq.extratMinIndex()
      // distTo[v] 就是s到v的最短距离
      this.marked[v] = true

      // Relaxation 原来用一根橡皮筋连接p和w两点，现在有一点v到w的路径更短，现在把橡皮筋w点的另一端p换成v点，这样缓解橡皮筋紧绷的压力，让其变得松弛。
      for (const e of this.G.makeIterator(v)) {
        let edge = e as Edge<Weight>
        let w = edge.w()
        if (!this.marked[w]) {
          if (!this.from[w] || this.distTo[v] + edge.valueOf() < this.distTo[w]) {
            this.distTo[w] = this.distTo[v] + edge.valueOf()
            this.from[w] = e
            if (ipq.contain(w)) {
              ipq.changeItem(w, this.distTo[w])
            } else {
              ipq.insert(w, this.distTo[w])
            }
          }
        }
      }
    }
  }

  hasPath(w: number): boolean {
    return this.from[w] != null
  }

  path (w: number): Edge<Weight>[] {
    let s: Edge<Weight>[] = []
    let p = this.from[w]
    while(p) {
      s.unshift(p)
      p = this.from[p.v()]
    }

    return s
  }

  showPath (w: number) {
    let path = this.path(w)
    let s = ''
    path.forEach((e, i) => { 
      s += e + ' -> '
      if (i === path.length - 1) {
        s += e.w()
      }
     })
     console.log(s)
  }
}