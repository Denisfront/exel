const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `
    <div class='cell' contenditable></div>
  `
}

function toColumn(col) {
  return `
    <div class='column'>${col}</div>
  `
}

function createRow(index, content) {
  return `
    <div class=row>
      <div class="row-info">${index ? index : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

const toChart = (_, index) => String.fromCharCode(CODES.A + index)

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChart)
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
