
import { generateRandomArray, testSort } from './config/sortTestHelper'
import { insertionSort } from './sort/baseSort'
import { mergeSort } from './sort/mergeSort'
import { quickSort, quickSort3Ways, findElement } from './sort/quickSort'
import { heapSort, heapSort2 } from './sort/heapSort'
import { BST } from './binarySearchTree/bst'
import { UnionFind } from './unionFind/unionFind'
import SparseGraph from './baseGraph/sparseGraph'
import DenseGraph from './baseGraph/denseGraph'
import Component from './baseGraph/component'
import Path from './baseGraph/path'
import ShortestPath from './baseGraph/shortestPath'

let n = 100000
let arr = generateRandomArray(n, 0, n)
let arr2 = [...arr]
let arr3 = [...arr]
let arr4 = [...arr]
let arr5 = [...arr]
let arr6 = [...arr]
// testSort('insertionSort', insertionSort, arr, n)
// testSort('mergeSort', mergeSort, arr2, n)
// testSort('quickSort', quickSort, arr3, n)
// testSort('quickSort3Ways', quickSort3Ways, arr4, n)
// testSort('heapSort', heapSort, arr5, n)
// testSort('heapSort2', heapSort2, arr6, n)

// let n2 = 100000
// let uf = new UnionFind(n2)

// let startTime = Date.now()

// for (let index = 0; index < n2; index++) {
//   let a = Math.floor(Math.random() * n)
//   let b = Math.floor(Math.random() * n)
//   uf.union(a, b)
// }

// for (let index = 0; index < n2; index++) {
//   let a = Math.floor(Math.random() * n)
//   let b = Math.floor(Math.random() * n)
//   uf.isConnected(a, b)
// }

// let endTime = Date.now()

// console.log(endTime - startTime)


let N = 7
let M = [
  '0,1',
  '0,2',
  '0,5',
  '0,6',
  '3,4',
  '3,5',
  '4,5',
  '4,6']

let g1 = new SparseGraph(N, false)
let g2 = new DenseGraph(N, false)
for (const e of M) {
  let a = parseInt(e.split(',')[0])
  let b = parseInt(e.split(',')[1])
  g1.addEdge(a, b)
  g2.addEdge(a, b)
}

let path1 = new Path(g1, 0)
path1.showPath(6)

let path2 = new ShortestPath(g1, 0)
path2.showPath(6)