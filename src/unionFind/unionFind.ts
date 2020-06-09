export default class UnionFind {
  private parent: number[] = []
  private rank: number[] = [] // rank[i]表示i为根的集合的树的层级 层级优化
  private count: number = 0

  constructor(count: number) {
    this.count = count
    for (let index = 0; index < count; index++) {
      this.parent[index] = index
      this.rank[index] = 1
    }
  }

  find(p: number): number {
    if (p < 0 || p >= this.count)
      throw new Error()

    // while (p != this.parent[p]) {
    //   this.parent[p] = this.parent[this.parent[p]] // 路径压缩
    //   p = this.parent[p]
    // }
    // return p

    // 方法2
    if (p != this.parent[p]) {
      this.parent[p] = this.find(this.parent[p])
    }
    return this.parent[p]
  }

  isConnected(p: number, q: number): boolean {
    return this.find(p) === this.find(q)
  }

  union(p: number, q: number) {
    let pRoot = this.find(p)
    let qRoot = this.find(q)

    if (pRoot === qRoot)
      return

      if (this.rank[pRoot] < this.rank[qRoot]) {
        this.parent[pRoot] = qRoot
      } else if (this.rank[pRoot] > this.rank[qRoot]) {
        this.parent[qRoot] = pRoot
      } else {
        this.parent[pRoot] = qRoot
        this.rank[qRoot]++
      }
  }
}