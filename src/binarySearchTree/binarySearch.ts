// 二分查找法 在有序的数组arr中，查找target
// 如果找到target，返回对应的索引index
// 如果没有找到，返回-1
function binarySearch<T>(arr: T[], n: number, target: T): number {
  // 在arr[l...r]中查找target
  let l = 0, r = n - 1
  while (l <= r) {
    let mid = Math.floor(l + (r - l) / 2)
    if (arr[mid] === target) {
      return mid
    }

    if (target < arr[mid]) {
      r = mid - 1
    } else {
      l = mid + 1
    }
  }

  return -1
}


function floor<T>(arr: T[], n: number, target: T): number {
  // 查找比target小的最大索引
  let l = -1, r = n - 1
  while (l < r) {
    let mid = Math.floor(l + (r - l + 1) / 2) // 向上取整
    if (arr[mid] >= target) {
      r = mid - 1
    } else {
      l = mid
    }
  }

  if (l + 1 < n && arr[l + 1] === target) {
    return l + 1
  }
  return l
}