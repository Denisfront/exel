import {ExelComponent} from '@core/ExelComponent';
import {createTable} from '@/components/table/table.template'
import {resizingHandler} from '@/components/table/resizing'
import {shouldResize, isCell, matrix, nextSelector} from '@/components/table/tabel.helperFunctions'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'

export class Table extends ExelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      listeners: ['mousedown', 'click', 'keydown', 'input'],
      name: 'Table',
      ...options
    })
  }

  toHTML() {
    return createTable(100)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })

    this.$on('formula:focus', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:input', $cell.text())
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizingHandler(event, this.$root)
    }
  }

  onClick(event) {
    if (isCell(event)) {
      const $cell = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($cell, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($cell)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Enter',
      'Tab'
    ]

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target).text())
  }
}
