import {range} from '@core/utils'

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const target = $current.id(true)
  const current = $target.id(true)
  const cols = range(target.col, current.col)
  const rows = range(target.row, current.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(key, {col, row}) {
  switch (key) {
    case 'Tab':
    case 'ArrowRight':
      if (!isKeyDown({col, row}, 25, 'col')) col += 1
      break
    case 'ArrowLeft':
      if (!isKeyDown({col, row}, 0, 'col')) {
        col -= 1
      }
      break
    case 'ArrowUp':
      if (!isKeyDown({col, row}, 0, 'row')) row -= 1
      break
    case 'Enter':
    case 'ArrowDown':
      if (!isKeyDown({col, row}, 99, 'row')) row += 1
      break
  }

  return `[data-id="${row}:${col}"]`
}

function isKeyDown(id, number, prop) {
  return id[prop] === number
}
