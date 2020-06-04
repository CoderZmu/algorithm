import { BaseGraph } from './interface'
export default class Path {
  private G: BaseGraph
  private s: number
  private visited: boolean[]
  private from: number[]


  constructor(graph: BaseGraph, s: number) {
    if (s < 0 || s >= graph.V()) throw new Error()

    this.G = graph
    this.visited = new Array(this.G.V()).fill(false)
    this.from = new Array(this.G.V()).fill(-1)
    this.dfs(s)
  }


  hasPath(w: number): boolean {
    return this.from[w] > -1
  }

  path (w: number): number[] {
    let s: number[] = []
    let p = w
    while(p != -1) {
      s.unshift(p)
      p = this.from[p]
    }

    return s
  }

  showPath (w: number) {
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

  private dfs(v: number) {
    this.visited[v] = true
    let interator = this.G.makeIterator(v)
    for (const i of interator) {
      if (!this.visited[i]) {
        this.from[i] = v
        this.dfs(i)
      }
    }
  }

}