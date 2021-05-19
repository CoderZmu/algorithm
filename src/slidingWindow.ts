
function minWindow(s: string, t: string): string {
  let need = new Map<string, number>(), window = new Map<string, number>()
  let sArr = [...s], tArr = [...t]
  tArr.forEach(c => {
    need.set(c, (need.get(c) || 0) + 1)
  })
  // 记录最小覆盖子串的起始索引及长度
  let start = 0, len = sArr.length + 1, valid = 0
  let left = 0, right = 0 // [left, right)为滑动窗口
  while (right < sArr.length) {
    // c 是将移入窗口的字符  右移窗口
    let c = sArr[right++]
    // 进行窗口内数据的一系列更新
    if (need.has(c)) {
      let num = (window.get(c) || 0) + 1
      window.set(c, num)
      if (num == need.get(c)) {
        valid++
      }
    }

    // 判断左侧窗口是否要收缩
    while (valid == need.size) {
      // 在这里更新最小覆盖子串
      if (right - left < len) {
        start = left
        len = right - left
      }

      // d 是将移出窗口的字符  左移窗口
      let d = sArr[left++]

      // 进行窗口内数据的一系列更新
      let num = window.get(d) || 0
      if (num > 0) {
        if (num == need.get(d)) {
          valid--
        }
        window.set(d, num - 1)
      }
    }
  }

  if (len == sArr.length + 1) {
    return ''
  }
  return s.substr(start, len)
};

// s1 = "ab" s2 = "eidbaooo"
function checkInclusion(s1: string, s2: string): boolean {
  let need = new Map<string, number>(), window = new Map<string, number>()
  let s1Arr = [...s1], s2Arr = [...s2]
  s1Arr.forEach(c => {
    need.set(c, (need.get(c) || 0) + 1)
  })
  let valid = 0
  let left = 0, right = 0 // [left, right)为滑动窗口
  while (right < s2Arr.length) {
    // c 是将移入窗口的字符  右移窗口
    let c = s2Arr[right++]
    // 进行窗口内数据的一系列更新
    if (need.has(c)) {
      let num = (window.get(c) || 0) + 1
      window.set(c, num)
      if (num == need.get(c)) {
        valid++
      }
    }

    // 判断左侧窗口是否要收缩
    if (right - left >= s1.length) {
      if (valid == need.size) {
        return true
      }

      // d 是将移出窗口的字符  左移窗口
      let d = s2Arr[left++]

      // 进行窗口内数据的一系列更新
      let num = window.get(d) || 0
      if (num > 0) {
        if (num == need.get(d)) {
          valid--
        }
        window.set(d, num - 1)
      }
    }
  }

  return false
};