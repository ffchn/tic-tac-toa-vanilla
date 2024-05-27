//Game constructor

const STATUS = {
  ON_GOING: "On Going",
  PLAYER_0_WON: "Player 1 Won!",
  PLAYER_1_WON: "Player 2 Won!",
  TIED: "Tied!",
}

class TicTacToe {
  constructor(gridSize) {
    this.board = Array.from(Array(gridSize).fill(null), () =>
      new Array(gridSize).fill(null)
    )
    this.gridSize = gridSize
    this.moveCount = 0
    this.currentPlayer = 1
    this.status = STATUS.ON_GOING
  }

  changePlayer() {
    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0
  }

  checkEmptyCell(row, column) {
    return this.board[row][column] === null
  }

  checkGame() {
    const gridSize = this.gridSize
    const maxMouveCount = gridSize * gridSize

    this.checkRows(this.board)
    this.checkColumns(this.board)
    this.checkDiagonals(this.board)
    if (this.moveCount >= maxMouveCount) this.status = STATUS.TIED

    if (this.status !== STATUS.ON_GOING) {
      alert(this.status)
    }
  }

  checkRows(board) {
    for (let row of board) {
      let rowCheck = row.every((val) => val !== null && val === row[0])
      if (rowCheck) {
        this.status = STATUS[`PLAYER_${this.currentPlayer}_WON`]
      }
    }
  }

  checkColumns(board) {
    const transposedMatrix = board.map((_, index) =>
      this.board.map((col) => col[index])
    )

    return this.checkRows(transposedMatrix)
  }

  checkDiagonals(board) {
    //diagonals are
    // 0,0 1,1 2,2
    // 0,2,1,1,2,0
    const leftDiagonalWon = (board[0][0] == board[1][1]) == board[2][2]
    const rightDiagonalWon = (board[0][2] == board[1][1]) == board[2][0]
    if (leftDiagonalWon || rightDiagonalWon) {
      this.status = STATUS[`PLAYER_${this.currentPlayer}_WON`]
    }
  }

  updateButtonContent(row, column) {
    const button = document.querySelector(
      `.board [data-row="${row}"][data-column="${column}"]`
    )

    button.innerHTML = this.currentPlayer === 0 ? "O" : "X"
  }

  move(row, column) {
    console.log(row, column)
    if (this.checkEmptyCell(row, column)) {
      this.board[row][column] = this.currentPlayer
      this.updateButtonContent(row, column)
      this.checkGame()
      this.changePlayer()
      return
    }

    console.error("Move not valid, cell already filled")
  }
}

const game = new TicTacToe(3)
const cells = document.querySelectorAll(".board .cell")
if (cells.length) {
  cells.forEach((cell) =>
    cell.addEventListener("click", () => {
      const row = cell.getAttribute("data-row")
      const col = cell.getAttribute("data-column")
      game.move(row, col)
    })
  )
}
