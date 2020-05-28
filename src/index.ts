
import { generateRandomArray, testSort } from './sortTestHelper'

function quickSort(arr: number[], n: number) {
  __quickSort(arr, 0, n - 1)
}

// 对arr[l...r]部分进行快速排序
function __quickSort(arr: number[], l: number, r: number) {
  if (l >= r) {
    return
  }

  const p = __partition2(arr, l, r)
  __quickSort(arr, l, p - 1)
  __quickSort(arr, p + 1, r)
}

// 对arr[l...r]进行partition操作
// 返回p 使得arr[l...p-1] < arr[p], arr[p+1...r] > p
function __partition(arr: number[], l: number, r: number): number {
  let v = arr[l]
  // arr[l+1...j] < v; arr[j+1...i) > v
  let j = l
  for (let i = l + 1; i <= r; i++) {
    if (arr[i] < v) {
      j ++
      __swap(arr, i, j)
    }
  } 
  __swap(arr, l, j)
  return j
}

// 对arr[l...r]进行partition操作
// 返回p 使得arr[l...p-1] <= arr[p], arr[p+1...r] >= p
function __partition2(arr: number[], l: number, r: number): number {
  let v = arr[l]
  // arr[l+1...i) <= v; arr(j...r] >= v
  let i = l + 1
  let j = r
  while (true) {
    while (i <= r && arr[i] < v) {
      i ++
    }
    while (j >= l + 1 && arr[j] > v) {
      j --
    }

    if( i > j ){
      break
    }

    __swap(arr, i, j)
    i ++
    j --
  }
  __swap(arr, l, j)
  return j
}




function quickSort3Ways(arr: number[], n: number) {
  __quickSort3Ways(arr, 0, n - 1)
}

// 三路快速排序处理 arr[l...r]
// 将arr[l...r]分成三部分 <v ==v > v
// 之后递归对<v >v 两部分继续进行三路快速排序
function __quickSort3Ways(arr: number[], l: number, r: number) {
  if (l >= r) {
    return
  }
  let { lt, gt } = __partition3(arr, l, r)
  __quickSort3Ways(arr, l, lt)
  __quickSort3Ways(arr, gt, r)
}

// 对arr[l...r]进行partition操作
// 返回lt, gt 使得arr[l...lt] < arr[p], arr(lt...gt) == arr[p] arr[gt...r] > p
function __partition3(arr: number[], l: number, r: number): {lt: number, gt: number} {
  let v = arr[l]
  let lt = l // arr[l+1...lt] < v
  let gt = r + 1 // arr[gt...r] > v
  let i = l + 1 // arr[lt+1...i) = v
  while (i < gt) {
    if (arr[i] < v) {
      __swap(arr, i, lt + 1)
      i ++ 
      lt ++
    } else if (arr[i] > v) {
      __swap(arr, i, gt - 1)
      gt --
    } else {
      i ++ 
    }
  }
  __swap(arr, l, lt)
  lt --
  return { lt, gt }
}


function __swap(arr: number[], i: number, j: number) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

console.log('ts')
let n = 1000
let arr = generateRandomArray(n, 0, 10)
testSort('quickSort3Ways', quickSort3Ways, arr, n)
