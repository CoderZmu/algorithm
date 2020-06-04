import { BaseGraph, AdjIterable, AdjIterator, IterationResult } from './interface'

// 稠密图 邻接矩阵
export default class DenseGraph implements BaseGraph {
  private n: number // 点数
  private m: number = 0 // 边数
  private directed: boolean // 有向图 
  private g: boolean[][] = []

  constructor(n: number, directed: boolean) {
    this.n = n
    this.directed = directed
    for (let index = 0; index < n; index++) {
      this.g[index] = Array.from({ length: n }, () => false)
    }
  }

  V(): number {
    return this.n
  }

  E(): number {
    return this.m
  }

  addEdge(v: number, w: number) {
    if (v < 0 || v >= this.n) throw new Error()
    if (w < 0 || w >= this.n) throw new Error()
    
    // 去掉平行边
    if (this.hasEdge(v, w)) return

    this.g[v][w] = true
    if (!this.directed)
      this.g[w][v] = true

    this.m++
  }

  // O(1) 时间复杂度
  hasEdge(v: number, w: number): boolean {
    if (v < 0 || v >= this.n) throw new Error()
    if (w < 0 || w >= this.n) throw new Error()

    return this.g[v][w]
  }


  // O(V^2)
  makeIterator(v: number): AdjIterable {
    const self = this;
    return {
      [Symbol.iterator]() {
        let index = 0;
        return {
          next() {
            for (index; index < self.V(); index++) {
              if (self.g[v][index]) {
                return {
                  value: index++,
                  done: false
                };
              }
            }
            return { value: undefined, done: true };
          }
        }
      }
    }
  }
}