import { insertionSortWithRange } from './baseSort'

function mergeSort(arr: number[], n: number) {
  __mergeSort(arr, 0, n)
}

// 自底向上归并
function mergeSortBU(arr: number[], n: number) {
  for (let sz = 1; sz < n; sz += sz){
    for (let i = 0; sz + i  < n; i += sz + sz) {
      __merge(arr, i, sz + i - 1, Math.min(2 * sz + i - 1, n - 1))
    }
  }
}

// 递归使用归并排序，对arr[l...r]的范围进行排序
function __mergeSort(arr: number[], l: number, r: number) {
  if (l >= r) {
    return
  }
  if (r - l < 15) { // 小规模数组使用插入效率高
    insertionSortWithRange(arr, l, r)
    return
  }

  const mid = l +  Math.floor((r - l) / 2)
  __mergeSort(arr, l, mid)
  __mergeSort(arr, mid + 1, r)
  if (arr[mid] > arr[mid + 1]) {
    __merge(arr, l, mid, r)
  } 
  
}

// 将arr[l...mid]和arr[mid+1...r]两部分进行归并
function __merge(arr: number[], l: number, mid: number, r: number) {
  let aux: number[] = []
  for (let i = l; i <= r; i++) {
    aux.push(arr[i])
  }

  let i = l, j = mid + 1
  for (let k = l; k <= r; k++) {
    if (i > mid) {
      arr[k] = aux[j-l]
      j ++
    } 
    else if (j > r) {
      arr[k] = aux[i-l]
      i ++
    }
    else if (aux[i-l] < aux[j-l]) {
      arr[k] = aux[i-l]
      i ++
    } 
    else {
      arr[k] = aux[j-l]
      j ++
    }
    
  }
}

export {
  mergeSort,
  mergeSortBU
}