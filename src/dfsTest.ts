
/*
给定一个二维的矩阵，包含 'X' 和 'O'（字母 O）。
找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充
*/
function solve(board: string[][]): void {

  let d = [[0, -1], [1, 0], [0, 1], [-1, 0]]
  let m = board.length, n = board[0].length
  function inArea(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < m && y < n
  }
  function inEdge(x: number, y: number) {
    return x == 0 || x == m - 1 || y == 0 || y == n - 1
  }


  function enumBoard(callback: ((x: number, y: number) => void)) {
    for (let x = 0; x < m; x++) {
      for (let y = 0; y < n; y++) {
        callback(x, y)
      }
    }
  }

  function dfs(x: number, y: number) {
    board[x][y] = '#'
    for (const [a, b] of d) {
      let nextX = a + x
      let nextY = b + y
      if (inArea(nextX, nextY) && board[nextX][nextY] == 'O') {
        dfs(nextX, nextY)
      }
    }
  }

  enumBoard((x, y) => {
    if (inEdge(x, y) && board[x][y] == 'O') {
      dfs(x, y)
    }
  })

  enumBoard((x, y) => {
    if (board[x][y] == 'O') {
      board[x][y] = 'X'
    }
  })


  enumBoard((x, y) => {
    if (board[x][y] == '#') {
      board[x][y] = 'O'
    }
  })

};



(function() {
  class Employee {
    id: number
    importance: number
    subordinates: number[]
    constructor(id: number, importance: number, subordinates: number[]) {
      this.id = (id === undefined) ? 0 : id;
      this.importance = (importance === undefined) ? 0 : importance;
      this.subordinates = (subordinates === undefined) ? [] : subordinates;
    }
  }
  // [[1, 5, [2, 3]], [2, 3, []], [3, 3, []]]
  function getImportance(employees: Employee[], id: number): number {

    let map = new Map<number, Employee>()
    employees.forEach(e => {
      map.set(e.id, e)
    });

    function dfs(id: number): number {
      let e = map.get(id)
      return e.subordinates.map(dfs).reduce((pre, cur) => pre + cur, e.importance)
    }

    return dfs(id)
  };
})()

