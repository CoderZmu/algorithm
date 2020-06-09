export default class Edge<Weight> {
  constructor (private a: number, private b: number, private weight: Weight) {
  }
  v () {
    return this.a
  }
  w () {
    return this.b
  }
  wt() {
    return this.weight
  }
  other (x: number) {
    if (x !== this.a && x != this.b) throw new Error()
    return x === this.a ? this.b : this.a
  }
  valueOf () {
    return parseFloat(this.weight + '')
  }
}