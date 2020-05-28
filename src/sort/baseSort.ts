function selectionSort(arr: number[], n: number) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]]
  }
}

function insertionSort(arr: number[], n: number) {
  for (let i = 1; i < arr.length; i++) {

    // 寻找元素arr[i]合适的插入位置
    let e = arr[i]
    let j: number // j保存元素e应该插入的位置
    for (j = i; j > 0 && arr[j - 1] > e; j--) {
        arr[j] = arr[j - 1]
    }
    arr[j] = e
  }
}
// 对arr[l...r]范围内的数组进行插入排序
function insertionSortWithRange(arr: number[], l: number, r: number) {
  for (let i = l + 1; i <= r; i++) {

    // 寻找元素arr[i]合适的插入位置
    let e = arr[i]
    let j: number // j保存元素e应该插入的位置
    for (j = i; j > l && arr[j - 1] > e; j--) {
        arr[j] = arr[j - 1]
    }
    arr[j] = e
  }
}

export {
  selectionSort,
  insertionSort,
  insertionSortWithRange
}