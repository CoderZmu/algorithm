import { BaseGraph } from './interface'
// 深度优先遍历
export default class Component {
  private G: BaseGraph
  private visited: boolean[]
  private id: number[]
  private ccount: number = 0 // 连通分量

  constructor(graph: BaseGraph) {
    this.G = graph
    this.visited = new Array(this.G.V()).fill(false)
    this.id = new Array(this.G.V()).fill(-1)
    for (let index = 0; index < this.G.V(); index++) {
      if (!this.visited[index]) {
        this.dfs(index)

        this.ccount++
      }
    }
  }

  count () {
    return this.ccount
  }

  private dfs (v: number) {
    this.visited[v] = true
    this.id[v] = this.ccount
    let interator = this.G.makeIterator(v)
    for (const i of interator) {
      if (!this.visited[i]) {
        this.dfs(i)
      }
    }
  }

  // 两个节点是否相连
  isConnected (v: number, w: number): boolean {
    return this.id[v] === this.id[w]
  }
}