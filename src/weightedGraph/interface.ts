interface WeightedGraph<Weight> {

  V(): number
  E(): number

  addEdge(v: number, w: number, weight: Weight): void

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

export { WeightedGraph, AdjIterable, AdjIterator, IterationResult }