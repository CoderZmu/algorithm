import { Graph } from './interface'
// 广度优先遍历
export default class ShortestPath {
  private G: Graph
  private s: number
  private visited: boolean[]
  private from: number[]
  private ord: number[]

  constructor(graph: Graph, s: number) {
    if (s < 0 || s >= graph.V()) throw new Error()

    this.G = graph
    this.visited = new Array(this.G.V()).fill(false)
    this.from = new Array(this.G.V()).fill(-1)
    this.ord = new Array(this.G.V()).fill(-1)


    let q: number[] = []
    q.push(s)
    this.visited[s] = true
    this.ord[s] = 0

    while (q.length) {
      let v = q.shift()
      let iterator = this.G.makeIterator(v)
      for (const i of iterator) {
        if (!this.visited[i]) {
          this.visited[i] = true
          this.from[i] = v
          this.ord[i] = this.ord[v] + 1

          q.push(i)
        }
      }
    }
  }


  hasPath(w: number): boolean {
    return this.from[w] > -1
  }

  path(w: number): number[] {
    let s: number[] = []
    let p = w
    while (p != -1) {
      s.unshift(p)
      p = this.from[p]
    }

    return s
  }

  showPath(w: number) {
    let path = this.path(w)
    let s = ''
    path.forEach((e, i) => {
      s += e
      if (i < path.length - 1) {
        s += ' -> '
      }
    })
    console.log(s)
  }

  length(w: number) {
    return this.ord[w]
  }

}