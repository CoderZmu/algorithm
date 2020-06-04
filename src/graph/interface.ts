interface Graph {

  V(): number
  E(): number

  addEdge(v: number, w: number): void

  hasEdge(v: number, w: number): boolean

  makeIterator(v: number): AdjIterable
}

interface AdjIterable {
  [Symbol.iterator](): AdjIterator
}

interface AdjIterator {
  next(value?: any): IterationResult,
}

interface IterationResult {
  value: any,
  done: boolean,
}

export { Graph, AdjIterable, AdjIterator, IterationResult }